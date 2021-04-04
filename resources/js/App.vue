<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="!authenticated">
        <router-link to="/login">Sign in</router-link> |
      </template>
      <template v-else>
        <router-link to="/account">{{ user.name }}</router-link> |
        <a href="#" @click.prevent="logout">Sign out</a>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
      })
    },
    methods: {
      ...mapActions({
        logoutAction: 'auth/logout'
      }),
      async logout(){
        await this.logoutAction()

        // this.$router.replace({name: 'Home'})
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
