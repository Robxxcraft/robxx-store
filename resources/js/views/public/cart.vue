<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
          <v-card class="rounded-lg" flat>
            <v-container>
              <v-card-title>
                <v-icon large color="orange">mdi-cart-check</v-icon>
                <h3 class="title">Cart List</h3>
                <v-spacer></v-spacer>
                <v-icon large title="Remove All Cart">mdi-dots-horizontal</v-icon>
              </v-card-title>
              <v-card-text>
                <template v-if="getCartPage.length > 0">
                  <v-simple-table height="300">
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
                      <tr v-for="(cart, index) in getCartPage" :key="index" class="text-center font-weight-light">
                        <td>{{index+indexCart}}</td>
                        <td>{{cart.product.title}}</td>
                        <td>${{cart.product.price}}</td>
                        <td><v-icon small @click="decrementQty(cart.id)">mdi-minus</v-icon> {{cart.quantity}} <v-icon small @click="incrementQty(cart.id)">mdi-plus</v-icon></td>
                        <td><v-btn outlined depressed small color="red" title="Remove Cart" @click="removeCart(cart)"><v-icon>mdi-cart-remove</v-icon></v-btn></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                </template>
                <template v-else>
                  <h3 class="grey--text text-center">No Cart Items</h3>
                </template>
                <template v-if="getCartTotal > 5">
                   <v-pagination class="my-5" color="orange" v-model="currentPage" :length="getCartLastPage" total-visible="3" @input="chengePage"></v-pagination>
                </template>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-row class="text-right">
                  <v-spacer></v-spacer>
                  <v-col md="2" sm="9"> 
                    
                  <h6 >Total Quantity :  <b>{{cartTotalQuantity}}</b></h6>
                  <h6 >Total Price :  <b>${{cartTotalPrice}}</b></h6>
                  <div class="mt-5">
                  <v-btn right router :to="{name: 'Checkout'}" color="orange" outlined>
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
  computed: {
    cartTotalQuantity(){
      return this.$store.getters['cart/cartTotalQuantity']
    },
    getCartPage() {
      return this.$store.state.cart.cart_page;
    },
    getCartLastPage() {
      return this.$store.state.cart.last_page;
    },
    getCartTotal() {
      return this.$store.state.cart.total_cart;
    },
    indexCart() {
      return this.$store.state.cart.index;
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
    removeCart(cart){
      this.$store.dispatch("cart/removeCart", cart);
    }
  }
};
</script>