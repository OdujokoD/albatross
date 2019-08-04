<template>
  <div class="supplier-detail">
    <div class="modal" v-bind:class="{ 'is-active': showDetails }" >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti omnis, quisquam officiis beatae eveniet praesentium laborum, nisi eos similique at officia minus itaque cumque maiores blanditiis. Cumque omnis quo dignissimos.
          Facilis eaque maiores officia dicta excepturi tenetur iste officiis doloremque ad, aspernatur amet. Facilis, deleniti atque. Iusto saepe provident delectus libero maiores beatae mollitia incidunt, aliquam tenetur reiciendis! Est, vitae?
          Excepturi, laboriosam saepe. Facilis rem voluptatem voluptate. Dicta dolores ullam dolor. Veritatis repellat optio accusantium inventore hic, sapiente eius odit odio corrupti. Neque est officiis veniam praesentium sapiente, eaque assumenda?
          Deserunt optio numquam omnis culpa ea earum minima. Aspernatur earum, porro molestiae eveniet tenetur, optio nulla, a tempora voluptatibus laboriosam modi sit numquam illo architecto ab placeat molestias corrupti mollitia.
          Tempora eos officia illo et, magni incidunt! Veritatis commodi in molestias! Animi nisi magnam ratione eaque quasi natus voluptatibus quia consequuntur, dolores voluptates dicta laudantium expedita delectus. Tempore, ea ex!
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
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
      supplier: this.supplier
    }
  },
  methods: {
    closeModal(event) {
      // event.preventDefault()
      this.showDetails=false
      this.$emit("close");
    },


  }
};
</script>

<style lang="scss" scoped>
</style>
