<template>
  <div class="login">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="card">
            <h5 class="header">Log in</h5>
            <div class="card-content">
              <div class="content">
                <div class="field">
                  <div class="control">
                    <input class="input" type="email" placeholder="Email" />
                  </div>
                  <p class="help">This is a help text</p>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" type="password" placeholder="Password" />
                  </div>
                  <p class="help">This is a help text</p>
                </div>
                <div>
                  <a class="button is-success is-fullwidth">Login</a>
                </div>
              </div>
            </div>
          </div>
          <p>Don't have an account? <a href="http://">Create an Account</a></p>
          <p><a href="http://">Forgot Password?</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login {
    text-align: left;
    /* background-color: #737575; */
  }
  .header {
    text-align: center;
  }
  .card {
    padding: 10px;
  }
</style>


<script>
</script>
