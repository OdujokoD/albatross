<template>
  <div class="transaction">
    <div class="column is-12">
      <data-tables-server ref="multipleTable" :data="transactions" :total="total" @query-change="fetchTransaction" :pagination-props="pagination"
        :table-props="tableProps"  :layout="layout">
        <el-table-column label="Supplier" sortable prop="name">
          <template slot-scope="scope">
            <span v-for="recipient in moreInfoListner(scope.row)" :key= "recipient.name" type="text" class="td_text"
              @click="recipient.handler">
              {{ scope.row.recipient.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Supplier Code" sortable prop="recipient_code">
          <template slot-scope="scope">
            <span>{{ scope.row.recipient.recipient_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Amount" >
          <template slot-scope="scope">
            <span>{{ formatNumber(scope.row.amount)  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </div>
  </div>
</template>
<script>
import { toast } from "bulma-toast";

export default {
  data() {
    return {
      layout: 'pagination, table',
      pagination: { pageSizes: [20, 50, 100] },
      tableProps: {
        border: false,
        stripe: true,
        defaultSort: {
          prop: 'flow_no',
          order: 'descending'
        }
      },
      total: 0,
      transaction: {},
      transactions: [],
    }
  },
  methods: {
    displayToast(msg, type) {
      toast({
        message: msg,
        type: type,
        dismissible: true,
        duration: 3000,
        pauseOnHover: true
      });
    },
    fetchTransaction(query) {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http.get('/transfer', config, {
        params: {page: query.page, perPage: query.pageSize}
      })
      .then((response) => {
        this.transactions = response.data.data
        this.total = response.data.meta.total
      })
      .catch((error) => {
        this.displayToast(error.response.data.message, "is-danger")
      });
    },
    formatNumber(amount = 0, currency="NGN") {
      amount /= 100;
      let result = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      }).format(amount);

      return result
    },
    moreInfoListner(row) {
      if (row.name !== null) {
        return [{
          handler: _ => {
            // this.showDetails = true;
            this.transaction = row;
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

  // .sc-table .pagination-wrap {
  //   text-align: left !impor;
  // }

  .transaction {
    
    .sc-table {
      margin-top: 2rem;
      .pagination-wrap {
        text-align: left !important;
      }
      .el-pagination {
        float: left;
        padding: 15px 0 !important;
      }
      .pagination-wrap {
        text-align: left !important;
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
