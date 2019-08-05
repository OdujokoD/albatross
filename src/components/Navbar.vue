<template>
  <div class="nav-bar">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" >
          Albatross
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="overflow">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="overflow" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <span>Current Balance: </span>
            <span>{{balance}}</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: 0,
    }
  },
  methods: {
    fetchCustomerBalance() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http.get('/balance' , config)
      .then((response) => {
        this.parseBalanceResponse(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    formatNumber(amount, currency="NGN") {
      amount /= 100;
      let result = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      }).format(amount);

      return result
    },
    parseBalanceResponse(data) {
      for(let d in data) {
        if(data[d].currency === 'NGN') {
          this.balance = this.formatNumber(data[d].balance, data[d].currency) 
          break;
        }
      }
    }
  },
  mounted() {
    this.fetchCustomerBalance();
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar {
    margin-bottom: 30px;
    width: 83.333%;
    position: fixed;
    z-index: 20;
  }
</style>
