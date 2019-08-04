<template>
  <div class="home">
    <div class="columns">
      <div class="column is-2">
        <Sidebar />
      </div>
      <div class="column content">
        <Supplier />
      </div>
    </div>
  </div>
</template>

<script>
import Supplier from '@/components/Supplier.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: {
    Sidebar,
    Supplier
  },
};
</script>
<style scoped>
  .content {
    padding-left: 0.5rem;
  }
</style>
