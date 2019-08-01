<template>
  <div class="home">
    <div class="columns">
      <div class="column is-2">
        <Sidebar />
      </div>
      <div class="column content">
        <Main msg="Welcome to Your Vue.js App"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: {
    Main,
    Sidebar
  },
};
</script>
<style scoped>
  .content {
    padding-left: 0.5rem;
  }
</style>
