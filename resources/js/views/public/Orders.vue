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
                          <v-btn :to="{name: 'OrderDetails', params: {id: order.id}}" class="subtitle-2" style="text-transform: none; text-decoration: none;" text><span class="font-weight-bold" color="grey darken-3">Details</span></v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="text-right">
                          <template v-if="order.order_status == 'Cancelled'">
                            <v-btn depressed dark color="red accent-2" style="text-transform: none;" @click="deletes(order.id)" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
                          </template>
                          <template v-else>
                            <v-btn depressed dark color="red accent-2" style="text-transform: none;" @click="cancels(order.id)" plain>
                            <v-icon class="mr-1">mdi-close-circle-outline</v-icon>
                            <span class="caption hidden-sm-and-down">Cancel Order</span>
                          </v-btn>
                          </template>
                        </v-col>
                      </v-row>
                    </v-card-actions>
              </v-card>
              </v-col>
              </v-row>
              <template v-if="getOrders <= 0">
                 <v-card-text>
                   <v-card height="320" class="mb-5" flat>
                   <v-row align="center" justify="center">
                   <span class="text-h5 grey--text pa-5 mt-8">No Order Items</span>
                 </v-row>
                 </v-card>
                 </v-card-text>
               </template>
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
      pending: 'Pending',
      shipped: 'Shipped',
      accepted: 'Accepted',
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
      }).catch(errors => {
        console.log(errors)

      })
    },
    cancels(id){
      this.$store.commit('order/CANCEL_ORDER', id)
    axios.post(`/api/orders/${id}/cancel`).then(res => {
      
            this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
          }).catch(() => {
          this.$toasted.show("Some Error Occured", {
                              type: 'error',
                              duration: '2000'
                          });
                    })
    
              },
    deletes(id){
      this.$store.commit('order/DELETE_ORDER', id)
      axios.get(`/api/orders/${id}/delete`).then(res => {
        this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
      }).catch(() => {
        this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
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