<template>
  <div class="profile">
    <div class="columns">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <div>
              <span>First Name</span>
              <span class="is-pulled-right">{{customer.first_name}}</span>
            </div>
            <div>
              <span>Last Name</span>
              <span class="is-pulled-right">{{customer.last_name}}</span>
            </div>
            <div>
              <span>Customer Code</span>
              <span class="is-pulled-right">{{customer.customer_code}}</span>
            </div>
            <div>
              <span>Email</span>
              <span class="is-pulled-right">{{customer.email}}</span>
            </div>
            <div>
              <span>Phone</span>
              <span class="is-pulled-right">{{customer.phone}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Topup Account
            </p>
          </header>
          <div class="card-content">
            <div v-if="displayAmount">
              <div class="field">
                <label class="label">Amount</label>
                <div class="control">
                  <input class="input" type="number" v-model="chargeData.amount" />
                </div>
              </div>
              <div class="field">
                <button class="button is-info" @click="initiateCharge">Top up</button>
              </div>
            </div>
            <div v-if="displayOtp">
              <p>Enter OTP sent to your phone. (Use 123456)</p>
              <div class="field">
                <label class="label">OTP</label>
                <div class="control">
                  <input class="input" type="number" v-model="otpData.otp" />
                </div>
              </div>
              <div class="field">
                <button class="button is-info" @click="submitOtp">Submit</button>
              </div>
            </div>
            <div v-if="displayToken">
              <p>Enter token sent to your phone. (Use 123456)</p>
              <div class="field">
                <label class="label">Token</label>
                <div class="control">
                  <input class="input" type="number" v-model="otpData.otp" />
                </div>
              </div>
              <div class="field">
                <button class="button is-info" @click="submitToken">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { toast } from "bulma-toast";

export default {
  data() {
    return {
      customer: [],
      chargeData: {
        amount: 0,
        email: 'cocoa@radiant.com',
        bank: {
          code: "057",
          account_number: "0000000000"
        },
        birthday: "1995-12-23"
      },
      displayAmount: true,
      displayOtp: false,
      displayToken: false,
      otpData: {
        otp: "123456",
	      reference: ""
      }
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
    fetchCustomer() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      let email = 'cocoa@radiant.com';
      this.$http.get('/customer/' + email , config)
      .then((response) => {
        this.customer = response.data.data;
      })
      .catch((error) => {
        console.log(error)
      });
    },
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
          this.$store.commit('setBalance', this.balance) 
          break;
        }
      }
    },
    initiateCharge() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.chargeData.amount *= 100;
      this.$http
        .post("/charge", this.chargeData, config)
        .then((response) => {
          this.displayAmount = false;
          this.displayOtp = true
          this.otpData.reference = response.data.data.reference;
        })
        .catch((error) => {
          this.displayToast(error.response.data.message, "is-danger")
        });
    },
    resetChargeDate() {
      this.chargeData = {
        amount: 0,
        email: 'cocoa@radiant.com',
        bank: {
          code: "057",
          account_number: "0000000000"
        },
        birthday: "1995-12-23"
      }
    },
    submitOtp() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http
        .post("/charge/submit_otp", this.otpData, config)
        .then((response) => {
          this.displayAmount = false;
          this.displayOtp = false
          this.displayToken = true;
            
        })
        .catch((error) => {
          this.displayToast(error.response.data.message, "is-danger")
        });
    },
    submitToken() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
          headers: {'Authorization': "bearer " + token}
      };
      this.$http
        .post("/charge/submit_otp", this.otpData, config)
        .then((response) => {
            this.displayToast(response.data.message, "is-success");
            this.displayAmount = true;
            this.displayOtp = false
            this.displayToken = false; 
            this.resetChargeDate();
            this.fetchCustomerBalance();
        })
        .catch((error) => {
          this.displayToast(error.response.data.message, "is-danger")
        });
    }
  },
  mounted() {
    this.fetchCustomer();
  }
};
</script>
<style lang="scss" scoped>
.columns {
  padding: 0.75rem;
}
</style>
