<template>
  <div id="app">
    <div class="columns">
      <div class="column is-2">
        <div class="sidebar">
          <aside class="menu">
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <li>
                <router-link to="/">Suppliers</router-link>
              </li>
              <li>
                <router-link to="/transaction">Transactions</router-link>
              </li>
              <li>
                <router-link to="/profile">Profile</router-link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div class="column content">
        <Navbar />
        <div class="is-main-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar
  }
}
</script>
<style lang="scss" scope>
// variabls
$dark-blue: #021f35;
$light-grey: #f2f2f3;

.sidebar {
  background-color: $dark-blue;
  height: 100vh;
  width: 16.667%;
  color: white;
  position: fixed;
  // top: 0;
  // left: 0;

  .menu {
    margin-top: 55px;
  }

  .menu-list a {
    border-radius: 0 !important;
  }
}

.content {
  padding-left: 0.5rem !important;

  .is-main-content {
      height: 100vh;
      position: relative;
      top: 4rem;
      background-color: $light-grey;
    }
}
</style>
