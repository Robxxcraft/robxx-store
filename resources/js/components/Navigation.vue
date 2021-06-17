<template>
  <div>
    <template v-if="authenticated">
      <a href="#" @click.prevent="logout">Sign out</a>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Register</router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      // user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      signOut: "auth/logout",
    }),
    async logout() {
      await axios.post("/logout").then(({ data }) => {
        this.signOut();
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>