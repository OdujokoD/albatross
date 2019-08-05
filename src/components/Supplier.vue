<template>
  <div class="supplier">
    <Navbar />
    <div class="is-main-content">
      <div class="column top-actions">
        <div class="is-pulled-right">
          <a class="button is-info is-outlined" @click="displayNewSupplier">Add Supplier</a>
          <!-- <a class="button is-info is-outlined">Bulk Upload Supplier</a> -->
        </div>
      </div>
      <div class="column is-12">
        <data-tables-server ref="multipleTable" :data="suppliers" :total="total" @query-change="fetchSuppliers" :pagination-props="pagination"
          :table-props="tableProps"  :layout="layout" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="Name" sortable prop="name">
            <template slot-scope="scope">
              <span v-for="supplier in moreInfoListner(scope.row)" :key= "supplier.name" type="text" class="td_text"
                @click="supplier.handler">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Bank" sortable prop="bank_name">
            <template slot-scope="scope">
              <span>{{ scope.row.bank_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Account Number" >
            <template slot-scope="scope">
              <span>{{ scope.row.account_number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Active">
            <template slot-scope="scope">
              <span>{{ scope.row.active }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <button class="button is-info" v-for="supplier in paymentListener(scope.row)" :key= "supplier.recipient_code" @click="supplier.handler">Pay</button>
            </template>
          </el-table-column>
        </data-tables-server>
      </div>
      <NewSupplier @close="closeNewSupplier" v-if="showNewForm" :showNewForm=showNewForm />
      <PaymentForm @close="closePaymentForm" v-if="showPaymentForm" :supplier=supplier :showPaymentForm=showPaymentForm />
      <SupplierDetail @close="closeSupplierDetails" v-if="showDetails" :supplier=supplier :showDetails=showDetails />
    </div>
  </div>
</template>

<script>

import { toast } from "bulma-toast";

import Navbar from '@/components/Navbar.vue';
import NewSupplier from '@/components/NewSupplier.vue';
import PaymentForm from '@/components/PaymentForm.vue';
import SupplierDetail from '@/components/SupplierDetail.vue';

export default {
  components: {
    Navbar,
    NewSupplier,
    PaymentForm,
    SupplierDetail
  },
  data() {
    return {
      layout: 'pagination, table',
      pagination: { pageSizes: [20, 50, 100] },
      selectedRow: [],
      selectionMessage: "",
      showDetails: false,
      showNewForm: false,
      showPaymentForm: false,
      supplier: {},
      suppliers: [],
      tableProps: {
        border: false,
        stripe: true,
        defaultSort: {
          prop: 'flow_no',
          order: 'descending'
        }
      },
      total: 0,
    }
  },
  methods: {
    closeNewSupplier() {
      this.showNewForm = false
      this.fetchSuppliers();
    },
    closePaymentForm() {
      this.showPaymentForm = false
    },
    closeSupplierDetails() {
      this.showDetails = false
    },
    displayNewSupplier() {
      this.showNewForm = true
    },
    displayToast(msg, type) {
      toast({
        message: msg,
        type: type,
        dismissible: true,
        duration: 3000,
        pauseOnHover: true
      });
    },
    fetchSuppliers(query) {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http.get('/transferrecipient', config, {
        params: {page: query.page, perPage: query.pageSize}
      })
      .then((response) => {
        this.parseSupplierResponse(response.data.data)
        this.total = response.data.meta.total
      })
      .catch((error) => {
        this.displayToast(error.response.data.message, "is-danger")
      });
    },
    flattenObject(obj) {
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, this.flattenObject(obj[key]))
        } else {
          flattened[key] = obj[key]
        }
      })

      return flattened
    },
    handleSelectionChange(val) {
      this.selectionMessage = (val.length == 1) ? "1 Selected" : val.length + " Selected"
      this.selectedRow = val
    },
    moreInfoListner(row) {
      if (row.name !== null) {
        return [{
          handler: _ => {
            this.showDetails = true;
            this.supplier = row;
          },
        }]
      }
    },
    parseSupplierResponse(suppliers) {
      this.suppliers = []
      for(let index in suppliers) {
        this.suppliers.push(this.flattenObject(suppliers[index]))
      }
    },
    paymentListener(row) {
      if (row.name !== null) {
        return [{
          handler: _ => {
            this.showPaymentForm = true;
            this.supplier = row;
          },
        }]
      }
    }
  },
  mounted() {
    // this.fetchCustomerBalance();
  }
}
</script>

<style lang="scss">
  // variables
  $light-grey: #f2f2f3;

  .sc-table .pagination-wrap {
    text-align: left;
  }

  .supplier {
    
    .is-main-content {
      height: 100vh;
      position: relative;
      top: 4rem;
      background-color: $light-grey;
    }
    // table {
    //   border-radius: 4px; 
    //   border: solid 1px #00ff00; 
    //   background-color: #ffffff;
    // }
    // thead {
    //   background-color: #f4f7fb;
    // }
    .sc-table {
      margin-top: 2rem;
      .pagination-wrap {
        text-align: left !important;
      }
      .el-pagination {
        float: left;
        padding: 15px 0;
      }
    }
    .hover_over:hover {
      border: 1px solid #5596e6 
    }
    .td_text {
      color: #5596e6;
    }
    .td_text:hover {
      color: #021f35; 
      cursor: pointer;
    }
  }
</style>
