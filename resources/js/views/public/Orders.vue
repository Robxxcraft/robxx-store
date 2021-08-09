<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
          <v-card class="rounded-lg" flat>
            <v-container>
              <v-card-title>
                <h3 class="title">Order List</h3>
              </v-card-title>
              <v-card-text>
                <v-row wrap>
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
                            <b>{{order.created_at}}</b>
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
                </v-row>
              </v-card-text>
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
      pending: 'Pending',
      shipped: 'shipped',
      accepted: 'accepted'
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
    border-left: 5px solid #4CAF50;
  }

  .Pending {
    border-left: 5px solid #FF9800;
  }

  .Cancelled {
    border-left: 5px solid #e21818e8;
  }
  
</style>