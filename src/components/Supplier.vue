<template>
  <div class="supplier">
    <Navbar />
    <div class="is-main-content">
      <div class="column is-12">
        <data-tables-server ref="multipleTable" :data="suppliers" :total="total" @query-change="fetchData" :pagination-props="pagination"
          :table-props="tableProps"  :layout="layout" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="Name" sortable prop="name">
            <template slot-scope="scope">
              <span v-for="button in tableListner(scope.row)" :key= "scope.row.name" type="text" class="td_text"
                @click="button.handler">
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
          <el-table-column label="Status">
            <template slot-scope="scope">
              <span>{{ scope.row.active }}</span>
            </template>
          </el-table-column>
        </data-tables-server>
      </div>
      <SupplierDetail @close="closeSupplierDetails" v-if="showDetails" :supplier=supplier :showDetails=showDetails />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SupplierDetail from '@/components/SupplierDetail.vue';

export default {
  components: {
    Navbar,
    SupplierDetail
  },
  data() {
    return {
      layout: 'pagination, table',
      pagination: { pageSizes: [20, 50, 100] },
      selectedRow: [],
      selectionMessage: "",
      showDetails: false,
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
    closeSupplierDetails() {
      this.showDetails = false
    },
    fetchData(query) {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http.get('/transferrecipient', config, {
        params: {page: query.page, pageSize: query.pageSize}
      })
      .then((response) => {
        this.parseSupplierResponse(response.data.data)
        this.total = response.data.meta.total
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
    parseSupplierResponse(suppliers) {
      for(let index in suppliers) {
        this.suppliers.push(this.flattenObject(suppliers[index]))
        // console.log("Res: ", res)
      }
    },
    tableListner(row) {
      if (row.name !== null) {
        return [{
          name: row.name,
          handler: _ => {
            this.showDetails = true;
            this.supplier = row;
            // this.row_index= this.employee_data.indexOf(row)
            // this.$store.commit('change_index', this.row_index)
            // this.row_data= this.clicked_employee;
            // this.display_show_modal = true
          },
        }]
      }
    },

  }
}
</script>

<style lang="scss" scoped>
  // variables
  $light-grey: #f2f2f3;

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
