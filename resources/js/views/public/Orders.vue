<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
          <v-card class="rounded-lg" flat>
              <v-card-title>
                <span class="grey--text text--darken-1">
                Order List</span>
              </v-card-title>
              <v-row wrap class="mx-4">
              <v-col cols="12" md="4" lg="3" xl="3" v-for="(order, index) in getOrders" :key="index" class="my-4">
               <v-card  class="rounded-xl mx-2" color="grey lighten-5" max-width="500" height="250" elevation="5">
                  <v-app-bar flat height="60" color="grey lighten-5">
                    <div class="subtitle-2"><span class="grey--text text--darken-3 font-weight-bold">#{{order.id}}</span><br><span class="grey--text">{{order.created_at | timeformat}}</span> </div>
                    <v-spacer></v-spacer>
                      <span :class="`${order.order_status} font-weight-bold`">{{order.order_status}}</span>
                  </v-app-bar>
                   <v-row class="my-1 mx-4">
                      <v-col>
                           <v-icon class="mr-1 my-1">mdi-cash-usd</v-icon>${{order.total_amount}} <br>
                           <v-icon class="mr-1 my-1">mdi-credit-card</v-icon>{{order.payment}} <br>
                           <v-icon class="mr-1 my-1">mdi-cart</v-icon>{{order.total_quantity}} 
                      </v-col>
                      <v-col class="text-right">
                        <template v-if="order.order_status == 'Pending' && order.payment == 'Midtrans'">
                           <v-btn class="font-weight-bold" @click="payment(order.id)" small dark color="blue darken-3" style="position: absolute; text-transform: none;">Pay</v-btn>
                        </template>
                        <v-avatar height="40" width="40" tile style="top: 50%;">
                          <v-img :src="`/assets/images/${order.order_status}.png`" max-height="auto" contain max-width="auto"></v-img>
                        </v-avatar>
                      </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-row>
                        <v-col>
                          <v-btn :to="{name: 'OrderDetails', params: {id: 1}}" class="subtitle-2" style="text-transform: none; text-decoration: none;" text><span class="font-weight-bold" color="grey darken-3">Details</span></v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="text-right">
                          <v-btn depressed dark color="red accent-2" style="text-transform: none;" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
              </v-card>
              </v-col>
              </v-row>
                
                <!-- <v-row wrap>
                  <v-flex class="mx-2 my-5" md12 v-for="(order, index) in getOrders" :key="index">
                  <v-card flat>
                    <v-layout :style="{ background: $vuetify.theme.themes.light.background2 }" row wrap :class="`pa-3 ${order.order_status}`">
                      <v-row class="text-center">
                        <v-col md="1">
                          <div>
                            Order ID
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>{{order.id}}</b>
                          </div>
                        </v-col>
                        <v-col md="2">
                          <div>
                            Total Amount
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>${{order.total_amount}}</b>
                          </div>
                        </v-col>
                        <v-col md="2">
                          <div>
                            Total Quantity
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>{{order.total_quantity}}</b>
                          </div>
                        </v-col>
                        <v-col md="1">
                          <div>
                            Date
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>{{order.created_at | timeformat}}</b>
                          </div>
                        </v-col>
                         <v-col md="1">
                          <div>
                            Payment
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>{{order.payment}}</b>
                          </div>
                        </v-col>
                        <v-col md="1">
                          <div>
                            Status
                          </div>
                          <div class="mt-2 grey--text caption">
                            <b>{{order.order_status}}</b>
                          </div>
                        </v-col>
                        <v-col md="4">
                          <div class="orange--text">
                            Actions
                          </div>
                          <div>
                            <v-btn depressed class="mx-1 my-1" @click="payment(order.id)" :hidden="order.payment == 'COD'">Pay</v-btn>
                            <v-btn depressed class="mx-1 my-1" router :to="{name: 'OrderDetails', params: {id: order.id}}">Details</v-btn>
                            <v-btn depressed class="mx-1 my-1" :hidden="order.order_status == 'Shipped'">Delete</v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-layout>
                  </v-card>
                </v-flex>
                </v-row> -->
              
           
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
      pending: 'Pending',
      shipped: 'Shipped',
      accepted: 'Accepted'
    }
  },
  mounted() {
    this.$store.dispatch("order/getOrders");
    const midtransScript = document.createElement('script');
    midtransScript.setAttribute(
      'src',
      'https://app.sandbox.midtrans.com/snap/snap.js',
      'data-client-key',
      'SB-Mid-client-Gu1iSRWbVS2RnYui'
    );
    document.head.appendChild(midtransScript);

  },
  computed: {
    getOrders(){
      return this.$store.state.order.orders
    },
  },
  methods: {
    payment(id){
      axios.post(`/api/orders/payment/${id}`).then(res => {
        window.snap.pay(res.data)
      })
    }
  }
}
</script>

<style>
  .Accepted {
    color: #4CAF50;
  }

  .Pending {
    color: #FF9800;
  }

  .Cancelled {
    color: #e21818e8;
  }
  
</style>