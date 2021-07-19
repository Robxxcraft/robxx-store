<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section>
          <v-card class="mx-4 my-5 rounded-lg" flat>
            <v-container>
              <v-card-title>
                <h4>Checkout</h4>
              </v-card-title>
              <v-card-text>
                <div class="text-center"><h4>${{cartTotalPrice}}</h4></div>
                <v-row wrap>
                  <v-col md="6" sm="12">
                    <v-text-field
                    label="First Name"
                    filled
                    rounded
                    color="orange"
                    v-model="form.first_name"
                  ></v-text-field>
                  </v-col>
                  <v-col md="6" sm="12"><v-text-field
                    label="Last Name"
                    filled
                    rounded
                    color="orange"
                    v-model="form.last_name"
                  ></v-text-field></v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea filled rounded label="Address" color="orange" v-model="form.address">
                    </v-textarea>
                    <v-text-field
                    label="City"
                    filled
                    rounded
                    color="orange"
                    v-model="form.city"
                  ></v-text-field>
                  <v-text-field
                    label="Province"
                    filled
                    rounded
                    color="orange"
                    v-model="form.province"
                  ></v-text-field>
                  <v-text-field
                    label="Zipcode"
                    filled
                    rounded
                    color="orange"
                    v-model="form.zipcode"
                  ></v-text-field>
                  <v-text-field
                    label="Phone Number"
                    filled
                    rounded
                    color="orange"
                    v-model="form.phone_number"
                  ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-row class="text-right">
                  <v-spacer></v-spacer>
                  <v-col md="2" sm="9"> 
                  <v-btn right router :to="{name: 'Checkout'}" class="mr-2" color="orange lighten-3" outlined>
                    <v-icon class="orange--text">mdi-cart</v-icon>
                    <div class="orange--text" @click.prevent="order">Order</div>
                  </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-container>
          </v-card>
      </section>
      
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./include/Navigation.vue";
import Footer from "./include/Footer.vue";
export default {
  components: {
    Navigation,
    Footer,
  },
  data(){
    return {
      form: {
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        province: '',
        zipcode: '',
        phone_number: '',
      }
    }
  },
  mounted() {
    this.$store.dispatch("cart/getCartItems");
  },
  computed: {
    getCart() {
      return this.$store.state.cart.cart;
    },
    getCartPage() {
      return this.$store.state.cart.cart_page;
    },
    cartTotalPrice() {
      return this.$store.getters['cart/cartTotalPrice']
    },
  },
  methods: {
    order(){

    }
  }
};
</script>