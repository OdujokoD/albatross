<template>
  <div class="new-supplier">
    <div class="modal" v-bind:class="{ 'is-active': showNewForm }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h5 class="modal-card-title">New Supplier</h5>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" v-model="supplier.name" />
            </div>
          </div>
          <div class="field">
            <label class="label">Account Number</label>
            <div class="control">
              <input class="input" type="text" v-model="supplier.account_number" />
            </div>
          </div>
          <div class="field">
            <label class="label">Bank</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="supplier.bank_code">
                  <option value>Select Bank</option>
                  <option v-for="bank in banks" :key="bank.code" :value="bank.code">{{bank.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea class="textarea" v-model="supplier.description"></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="createSupplier">Create</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from "bulma-toast";

export default {
  props: ["showNewForm"],
  data() {
    return {
      banks: [],
      supplier: {
        name: "",
        type: "nuban",
        account_number: "",
        bank_code: "",
        currency: "NGN",
        description: ""
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    createSupplier() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
        headers: { Authorization: "bearer " + token }
      };
      this.$http
        .post("/transferrecipient", this.supplier, config)
        .then(response => {
          this.resetSupplier();
          this.closeModal();
          this.displayToast(response.data.message, "is-success");
        })
        .catch(error => {
          this.displayToast(error.response.data.message, "is-danger")
        });
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
    fetchBanks() {
      let token = process.env.VUE_APP_AUTH_KEY;
      let config = {
        headers: { Authorization: "bearer " + token }
      };
      this.$http
        .get("/bank", config)
        .then(response => {
          this.banks = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetSupplier() {
      this.supplier = {
        name: "",
        type: "nuban",
        account_number: "",
        bank_code: "",
        currency: "NGN",
        description: ""
      }
    }
  },
  mounted() {
    this.fetchBanks();
  }
};
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
