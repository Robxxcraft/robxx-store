<template>
  <nav>
    <v-card flat :style="{ background: $vuetify.theme.themes.light.background }">
      <v-app-bar flat color="rgba(0,0,0,0)">
        <v-avatar height="35" width="35">
          <v-img contain max-width="auto" :src="logo"></v-img>
        </v-avatar>
        <span class="font-weight-light">Robxx</span>
        <span class="orange--text">Store</span>
        <v-spacer></v-spacer>
        <v-btn fab depressed color="grey lighten-3" class="mr-1" :to="{name: 'Favourited'}" style="text-decoration: none;">
           <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn depressed color="grey lighten-3" class="mr-1 hidden-sm-and-down" :to="{name: 'Cart'}" style="text-decoration: none;">
          <template v-if="authenticated">
            <v-badge :content="cartItemCount != 0 ? cartItemCount : '0'" color="orange darken-2">
            <v-icon>mdi-cart</v-icon>
            </v-badge>
          </template>
          <template v-else>
            <v-icon>mdi-cart</v-icon>
          </template>
        </v-btn>
          <v-menu rounded="lg" offset-y>
            <template v-slot:activator="{attrs, on}">
              <v-btn depressed slot="activator" color="grey lighten-3" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>
            <v-list flat>
              <template v-if="!authenticated">
                <v-list-item router :to="{name: 'Login'}" style="text-decoration: none;">
                  <v-chip class="rounded-0 white" style="cursor: pointer;"><v-list-item-title class="grey--text">Login</v-list-item-title></v-chip>
                </v-list-item>
                <v-list-item router :to="{name: 'Register'}" style="text-decoration: none;">
                  <v-chip class="rounded-0 white" style="cursor: pointer;"><v-list-item-title class="grey--text">Sign Up</v-list-item-title></v-chip>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item router :to="{name: 'DashboardAdmin'}" style="text-decoration: none;">
                  <v-chip class="rounded-0 white" style="cursor: pointer;"><v-list-item-title class="grey--text" >Admin</v-list-item-title></v-chip>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{on, attrs}">
                       <v-chip class="rounded-0 white"><v-list-item-title class="red--text" v-bind="attrs" v-on="on" depressed>Logout</v-list-item-title></v-chip>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold grey red--text lighten-3">Sign Out</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure logout this account?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="black--text" outlined @click.native="dialog = false" style="text-transform:none;" depressed>Cancel</v-btn>
                        <v-btn class="white--text" color="red lighten-1" @click="logout" style="text-transform:none;" depressed>Logout</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-list-item>
              </template>
            </v-list>
          </v-menu>
      </v-app-bar>
      <v-card-text>
        <v-tabs color="orange" class="rounded-lg hidden-sm-and-down" light>
        <v-tab to="/" style="text-decoration: none; text-transform: none;"><v-icon>mdi-home</v-icon></v-tab>
        <v-tab router :to="{name: 'AllCategories'}" style="text-decoration: none; text-transform: none;">
          Categories
        </v-tab>
        <v-tab router :to="{name: 'AllProducts'}" style="text-decoration: none; text-transform: none;">
          Products
        </v-tab>
        <v-tab router :to="{name: 'Orders'}" style="text-decoration: none; text-transform: none;">
          Orders
        </v-tab>
        <v-tab router :to="{name: 'Profile'}" style="text-decoration: none; text-transform: none;">
          Profile
        </v-tab>
        <v-tab router :to="{name: 'About'}" style="text-decoration: none; text-transform: none;">
          About
        </v-tab>
      </v-tabs>
      </v-card-text>
    </v-card>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      dialog: false,
      log: null
    }
  },
  mounted() {
    if (this.$store.getters['auth/authenticated']) {
      this.$store.dispatch("cart/getCartItems");
    }
    axios.get('/api/logo').then(res => {
      this.log = res.data.image
    })
  },
  computed: {
    logo(){
      if (!this.log) {
        return '/assets/images/logo2.png';
      }
      return `/assets/images/${this.log}`
    },
    cartItemCount() {
      return this.$store.getters["cart/cartItemCount"];
    },
    authenticated(){
      return this.$store.getters["auth/authenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
          location.reload().then(()=>{
            this.$router.replace({name: 'Login'})
          })
      });
    },
  }
};
</script>