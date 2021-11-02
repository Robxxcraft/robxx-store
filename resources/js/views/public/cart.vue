<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section :class="$vuetify.breakpoint.smAndDown ? 'mx-1 my-5' : 'mx-4 my-5'">
          <v-card class="rounded-lg" flat>
              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-card-title>
                <v-icon large color="orange" class="pa-3 mt-2">mdi-cart-check</v-icon>
                <div class="font-weight-medium">Cart List</div>
            </v-card-title>
                <v-spacer></v-spacer>
                <v-menu rounded="lg" offset-y>
            <template v-slot:activator="{attrs, on}">
              <v-btn depressed slot="activator" color="grey lighten-3" v-bind="attrs" v-on="on">
                <v-icon large>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list flat>
              <template>
                <v-list-item>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{on, attrs}">
                       <v-btn depressed class="red--text" text v-bind="attrs" v-on="on" style="text-transform: none;">Clear Cart</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold red--text">Clear Cart</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure clear all products in cart?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey--text" outlined @click.native="dialog = false" depressed>Cancel</v-btn>
                        <v-btn class="white--text" color="red accent-2" @click="clearCart" depressed>Clear</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-list-item>
              </template>
            </v-list>
                </v-menu>
                
              </v-app-bar>
              <v-card-text>
                    <template v-if="getCartPage.length > 0">
                  <v-sheet elevation="4"  class="rounded-lg my-5" v-for="(cart, index) in getCartPage" :key="index">
                  <v-list three-line :style="{ background: $vuetify.theme.themes.light.background2 }">
                  <v-list-item>
                    <v-list-item-avatar color="grey" size="80" tile>
                      <v-img contain height="auto" :src="'/images/'+cart.product.photo" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          {{cart.product.title}}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                          Category - <span class="orange--text text--darken-3">{{cart.product.category.name}}</span>
                      </v-list-item-subtitle>

                      <v-list-item-subtitle>
                          Quantity 
                          <span class="orange--text text--darken-3">
                            <v-icon class="mx-2 orange--text text--darken-2" @click="decrementQty(cart.product.id)">mdi-minus-box</v-icon>{{cart.quantity}}<v-icon class="mx-2 orange--text text--darken-2" @click="incrementQty(cart.product.id)">mdi-plus-box</v-icon>
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                  <v-container fluid style="padding:0;">
                    <v-divider></v-divider>
                  </v-container>
                  <v-list-item class="my-n3" style="margin:0; padding:0;">
                    <v-list-item-subtitle style="margin:0; padding:0;" class="mx-4 col-md-4">
                      <div class="subtitle-1" style="margin-bottom: 0;">Total Amount</div>
                      <span class="orange--text text--darken-3 mt-1 mx-6">${{cart.product.price * cart.quantity}}</span>
                  </v-list-item-subtitle>
                  <v-spacer></v-spacer>
                  <v-btn depressed class="red--text text--accent-2 mx-2" title="Remove Cart" @click="removeCart(cart)"><v-icon>mdi-delete</v-icon></v-btn>
                  </v-list-item>
                </v-list>
                </v-sheet>
                  </template>
                  <template v-else>
                    <h3 class="grey--text text-center">No Cart Items</h3>
                  </template>
                  <template v-if="getCartTotal > 5">
                    <v-pagination class="my-5" color="orange darken-2" v-model="currentPage" :length="getCartLastPage" total-visible="3" @input="chengePage"></v-pagination>
                  </template>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-row class="text-right">
                  <v-spacer></v-spacer>
                  <v-col lg="3" xl="3" md="3" cols="9">
                    <v-row>
                      <v-col>Total Quantity</v-col>
                      <v-col><span class="font-weight-bold text-h6">{{cartTotalQuantity}}</span></v-col>
                    </v-row>
                    <v-row>
                      <v-col>Total Price</v-col>
                      <v-col><span class="font-weight-bold text-h6">${{cartTotalPrice}}</span></v-col>
                    </v-row>
                  <div class="mt-5">
                  <v-btn right router :to="{name: 'Checkout'}" style="text-decoration:none; text-transform: none;" color="orange darken-1">
                  <span class="font-weight-bold white--text ">Checkout</span>
                  
                </v-btn>
                </div>
                  </v-col>
                </v-row>
              </v-card-actions>
          </v-card>
      </section>
      
      <Footer />
    </v-main>
    <BottomNavigation :hidden="!$vuetify.breakpoint.smAndDown"/>
  </v-app>
</template>
<script>
import Navigation from "./include/Navigation.vue";
import BottomNavigation from "./include/BottomNavigation.vue";
import Footer from "./include/Footer.vue";
export default {
  components: {
    Navigation,
    BottomNavigation,
    Footer,
  },
  data(){
    return {
      currentPage: 1,
      dialog: false
    }
  },
  mounted() {
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
    cartTotalPrice() {
      return this.$store.getters['cart/cartTotalPrice']
    },
  },
  methods: {
    chengePage(page){
      this.$store.dispatch("cart/getCartPageItems", page);
    },
    incrementQty(id){
      axios.post(`/api/cart/incr/${id}`)
      this.$store.commit("cart/INCREMENT_QTY", id);
    },
    decrementQty(id){
      axios.post(`/api/cart/dcr/${id}`)
      this.$store.commit("cart/DECREMENT_QTY", id);
    },
    async removeCart(cart){
      await this.$store.dispatch("cart/removeCart", cart);
      await this.$store.dispatch("cart/getCartPageItems", this.currentPage);
    },
    async clearCart(){
      await this.$store.dispatch("cart/clearCart");
      await this.$store.dispatch("cart/getCartPageItems", this.currentPage);
      this.dialog = false
    }
  }
};
</script>