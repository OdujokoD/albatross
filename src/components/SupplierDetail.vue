<template>
  <div class="supplier-detail">
    <div class="modal" v-bind:class="{ 'is-active': showDetails }" >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h5 class="modal-card-title">{{ supplier.name }}</h5>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <span>Bank</span>
            <span class="is-pulled-right">{{supplier.bank_name}}</span>
          </div>
          <div>
            <span>Account Number</span>
            <span class="is-pulled-right">{{supplier.account_number}}</span>
          </div>
          <div>
            <span>Recipient Code</span>
            <span class="is-pulled-right">{{supplier.recipient_code}}</span>
          </div>
          <div>
            <span>Active</span>
            <span class="is-pulled-right">{{supplier.active}}</span>
          </div>
          <div>
            <span>Date added</span>
            <span class="is-pulled-right">{{supplier.createdAt}}</span>
          </div>
          <div>
            <span>Description</span>
            <span class="is-pulled-right">{{supplier.description}}</span>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Edit Supplier</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['showDetails', 'supplier'],
  data() {
    return {
      // isActive: this.showDetails,
      // supplier: this.supplier
    }
  },
  methods: {
    closeModal(event) {
      // event.preventDefault()
      // this.showDetails=false
      this.$emit("close");
    },


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

    .modal-card-head, .modal-card-foot { 
      border-radius: 0;
      background-color: white;
      border: none;

      h5 {
        margin-bottom: 0;
      }
    }
  }
</style>
