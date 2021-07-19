<template>
  <nav>
    <!-- <v-toolbar flat class="rounded-b-lg" color="orange lighten-2">
      <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Robxx</span>
        <span class="orange--text">Store</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn depressed color="amber lighten-3">
          <v-icon class="white--text">mdi-cart</v-icon>
          <div class="white--text">{{cartItemCount}}</div>
        </v-btn>
        <v-btn
          depressed
          color="amber lighten-5"
          router
          :to="{ name: 'Admin' }"
          style="text-decoration: none"
          ><p class="my-auto amber--text">Admin</p></v-btn
        >
      </v-toolbar-items>
    </v-toolbar> -->
    <v-card flat :style="{ background: $vuetify.theme.themes.light.background }">
      <v-card-title>
        <span class="font-weight-light ml-2">Robxx</span>
        <span class="orange--text">Store</span>
        <v-spacer></v-spacer>
        <v-btn depressed router :to="{name: 'Cart'}">
          <template v-if="authenticated">
            <v-badge :content="cartItemCount != 0 ? cartItemCount : '0'" color="orange lighten-2">
            <v-icon>mdi-cart</v-icon>
            </v-badge>
          </template>
          <template v-else>
            <v-icon>mdi-cart</v-icon>
          </template>
        </v-btn>
          <v-menu rounded="lg" offset-y>
            <template v-slot:activator="{attrs, on}">
              <v-btn depressed slot="activator" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>
            <v-list flat>
              <template v-if="!authenticated">
                <v-list-item router :to="{name: 'Login'}">
                  <v-list-item-title class="grey--text">Login</v-list-item-title>
                </v-list-item>
                <v-list-item router :to="{name: 'Register'}">
                  <v-list-item-title class="grey--text">Sign Up</v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-list-item-title class="grey--text">Profile</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{on, attrs}">
                       <v-list-item-title class="red--text" v-bind="attrs" v-on="on" depressed>Logout</v-list-item-title>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold grey red--text lighten-3">Sign Out</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure logout this account?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey--text" outlined @click.native="dialog = false" depressed>Cancel</v-btn>
                        <v-btn class="white--text" color="red lighten-1" @click="logout" depressed>Logout</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-list-item>
              </template>
            </v-list>
          </v-menu>
      </v-card-title>
      <v-card-text>
        <v-tabs color="amber" class="rounded-lg">
        <v-tab to="/" style="text-decoration: none"><v-icon>mdi-home</v-icon></v-tab>
        <v-tab router to="/categories" style="text-decoration: none">
          Categories
        </v-tab>
        <v-tab router to="/products" style="text-decoration: none">
          Product
        </v-tab>
        <v-tab router to="/profile" style="text-decoration: none">
          Profile
        </v-tab>
        <v-tab router to="/about" style="text-decoration: none">
          About
        </v-tab>
      </v-tabs>
      </v-card-text>
    </v-card>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      dialog: false
    }
  },
  mounted() {
    if (this.$store.getters['auth/authenticated']) {
      this.$store.dispatch("cart/getCartItems");
    }
  },
  computed: {
    cartItemCount() {
      return this.$store.getters["cart/cartItemCount"];
    },
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      signOut: "auth/logout",
    }),
    logout() {
      axios.post("/logout").then(() => {
        this.signOut();
      });
    },
  }
};
</script>