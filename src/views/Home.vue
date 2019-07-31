<template>
  <div class="home">
    <div class="columns">
      <div class="column is-2">
        <Sidebar />
      </div>
      <div class="column is-10">
        <img alt="Vue logo" src="../assets/logo.png">
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
