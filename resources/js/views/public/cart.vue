<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section>
          <v-card class="mx-4 my-5 rounded-lg" flat>
            <v-container>
              <v-card-title>
                <v-icon large>mdi-cart-check</v-icon>
                <h4>Cart List</h4>
                <v-spacer></v-spacer>
                <v-icon large title="Remove All Cart">mdi-dots-horizontal</v-icon>
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                      <th class="grey--text text-center">No</th>
                      <th class="grey--text text-center">Product Name</th>
                      <th class="grey--text text-center">Price</th>
                      <th class="grey--text text-center">Quantity</th>
                      <th class="orange--text text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cart, index) in getCartPage.data" :key="index" class="text-center font-weight-light">
                        <td>{{cart.id}}</td>
                        <td>{{cart.product.title}}</td>
                        <td>${{cart.product.price}}</td>
                        <td><v-icon small @click="decrementQty(cart.id)">mdi-minus</v-icon> {{cart.quantity}} <v-icon small @click="incrementQty(cart.id)">mdi-plus</v-icon></td>
                        <td><v-btn outlined depressed small color="red" title="Remove Cart"><v-icon>mdi-cart-remove</v-icon></v-btn></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <template v-if="getCartPage.total > 5">
                   <v-pagination class="my-5" color="orange" v-model="currentPage" :length="getCartPage.last_page" total-visible="3" @input="chengePage"></v-pagination>
                </template>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-row class="text-right">
                  <v-spacer></v-spacer>
                  <v-col md="2" sm="9"> 
                  <h6 >Total Price :  <b>${{cartTotalPrice}}</b></h6>
                  <div class="mt-5">
                  <v-btn right router :to="{name: 'Checkout'}" color="orange lighten-3" outlined>
                  <v-icon class="orange--text">mdi-cart</v-icon>
                  <div class="orange--text">Checkout</div>
                </v-btn>
                </div>
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
      currentPage: 1
    }
  },
  mounted() {
    this.$store.dispatch("cart/getCartItems");
    this.$store.dispatch("cart/getCartPageItems", 1);
  },
  watch: {
    
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
    chengePage(page){
      this.$store.dispatch("cart/getCartPageItems", page);
    },
    incrementQty(id){
      console.log(id)
    },
    decrementQty(id){
      console.log(id)
    },
  }
};
</script>