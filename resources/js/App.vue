<template>
  <div>
    <!-- <div id="nav">
      <router-link to="/admin">Home</router-link> |
      <template v-if="!authenticated">
        <router-link to="/login">Sign in</router-link> |
        <router-link to="/register">Create an account</router-link> |
      </template>
      <template v-else>
        <router-link to="/account">user</router-link> |
        <a href="#" @click.prevent="logout">Sign out</a>
      </template>
    </div> -->
      <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation
  },
  // computed: {
  //   ...mapGetters({
  //     authenticated: "auth/authenticated",
  //     // user: 'auth/user',
  //   }),
  // },
  // methods: {
  //   ...mapActions({
  //     signOut: "auth/logout",
  //   }),
  //   async logout() {
  //     await axios.post("/logout").then(({ data }) => {
  //       this.signOut();
  //       this.$router.push({ name: "Login" });
  //     });
  //   },
  // },
};
</script>

<style>
</style>
