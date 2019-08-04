<template>
  <div class="sidebar">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <a>Dashboard</a>
        </li>
        <li>
          <a>Customers</a>
        </li>
      </ul>
      <p class="menu-label">Administration</p>
      <ul class="menu-list">
        <li>
          <a>Team Settings</a>
        </li>
        <li>
          <a class="is-active">Manage Your Team</a>
          <ul>
            <li>
              <a>Members</a>
            </li>
            <li>
              <a>Plugins</a>
            </li>
            <li>
              <a>Add a member</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Invitations</a>
        </li>
        <li>
          <a>Cloud Storage Environment Settings</a>
        </li>
        <li>
          <a>Authentication</a>
        </li>
      </ul>
      <p class="menu-label">Transactions</p>
      <ul class="menu-list">
        <li>
          <a>Payments</a>
        </li>
        <li>
          <a>Transfers</a>
        </li>
        <li>
          <a>Balance</a>
        </li>
      </ul>
    </aside>
  </div>
</template>
<style lang="scss" scoped>
// variables
$dark-blue: #021f35;

.sidebar {
  background-color: $dark-blue;
  height: 100vh;
  width: 16.667%;
  color: white;
  position: fixed;
  // top: 0;
  // left: 0;
}
</style>
<script>
export default {};
</script>
