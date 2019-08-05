<template>
  <div class="payment-form">
    <div class="modal" v-bind:class="{ 'is-active': showPaymentForm }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h5 class="modal-card-title">New Payment</h5>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <span>{{supplier.name}}</span>
            </div>
          </div>
          <div class="field">
            <label class="label">Account Number</label>
            <div class="control">
              <span>{{supplier.account_number}}</span>
            </div>
          </div>
          <div class="field">
            <label class="label">Bank</label>
            <div class="control">
              <span>{{supplier.bank_name}}</span>
            </div>
          </div>
          <div class="field">
            <label class="label">Amount (&#8358;)</label>
            <div class="control">
              <input class="input" type="number" v-model="transferData.amount" />
            </div>
          </div>
          <div class="field">
            <label class="label">Reason</label>
            <div class="control">
              <textarea class="textarea" v-model="transferData.reason"></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="makePayment">Pay</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from "bulma-toast";

export default {
  props:['showPaymentForm', 'supplier'],
  data() {
    return {
      transferData: {
        source: 'balance',
        reason: '',
        amount: '',
        recipient: this.supplier.recipient_code
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
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
    makePayment() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
        headers: { Authorization: "bearer " + token }
      };
      this.transferData.amount *= 100
      this.$http
        .post("/transfer", this.transferData, config)
        .then(response => {
          console.log("Success: ", response.data)
          this.resetTransferData();
          this.closeModal();
          this.displayToast(response.data.message, "is-success");
        })
        .catch( (error) => {
          console.log("Error: ", error.response)
          this.displayToast(error.response.data.message, "is-danger")
        });
    },
    resetTransferData() {
      transferData = {
        source: 'balance',
        reason: '',
        amount: '',
        recipient: this.supplier.recipient_code
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// variables
$light-grey: rgba(156, 156, 156, 0.86);

.modal {
  .modal-background {
    background-color: $light-grey;
  }
}
.modal-card {
  position: fixed;
  right: 0px;
  height: 100vh !important;
  max-height: 100vh;
  width: 30vw;
  max-width: none;
  z-index: auto !important;

  .modal-card-head,
  .modal-card-foot {
    border-radius: 0;
    background-color: white;
    border: none;

    h5 {
      margin-bottom: 0;
    }
  }
}
</style>
