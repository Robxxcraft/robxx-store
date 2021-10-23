<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-card class="rounded-lg" flat>
            <v-card-title>
              <span>Order Details</span>
            <v-spacer></v-spacer>
            <v-chip dark color="orange"><span>{{getOrder.order_status}}</span></v-chip>
          </v-card-title>
          <v-card-text>
            <v-card flat>
              <v-app-bar flat height="60" color="grey lighten-4">
                    <div class="subtitle-2"><span class="grey--text text--darken-2 font-weight-bold text-h6">Overview</span><br><span class="orange--text text--darken-3 font-weight-bold ml-2">Order #{{getOrder.id}}</span> </div>
                    <v-spacer></v-spacer>
                      <span class="font-weight-bold subtitle-2">{{getOrder.created_at | timeformat}}</span>
                  </v-app-bar>
              <v-divider></v-divider>
                <v-container>
                    <v-subheader class="text-h6">Product List</v-subheader>
                  <v-list-item v-for="(orderdetail, index) in getOrder.orderdetails" :key="index">
                    <v-list-item-avatar color="grey" size="90" tile>
                      <v-img :src="`/assets/images/${orderdetail.product.photo}`" contain height="auto" width="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          {{orderdetail.product.title}}
                      </v-list-item-title>

                      <v-list-item-subtitle class="my-1">
                          Category -
                          <span class="orange--text text--darken-3">{{orderdetail.product.category.name}}</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Quantity 
                          <span class="orange--text text--darken-3">
                            {{orderdetail.quantity}}
                          </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Price 
                          <span class="orange--text text--darken-3">
                            ${{orderdetail.product.price}}
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                </v-container>
                <v-row class="my-4">
                    <v-col md="4" lg="4" xl="4" cols="12"  :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Payment With
                        <p class="subtitle-1 orange--text text--darken-1"><b>{{getOrder.payment}}</b></p>
                      </div>
                    </v-col>
                    <v-divider :hidden="$vuetify.breakpoint.smAndDown" vertical></v-divider>
                    <v-col md="4" lg="4" xl="4" cols="12" :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Total Quantity
                        <p class="subtitle-1 orange--text text--darken-1"><b>{{getOrder.total_quantity}}</b></p>
                      </div>
                    </v-col>
                    <v-divider :hidden="$vuetify.breakpoint.smAndDown" vertical></v-divider>
                    <v-col md="4" lg="4" xl="4" cols="12" :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Total Amount
                        <p class="subtitle-1 orange--text text--darken-1"><b>${{getOrder.total_amount}}</b></p>
                      </div>
                    </v-col>
                  </v-row>

                  <v-list>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-map-marker</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Address
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getOrder.address}}, {{getOrder.city}}, {{getOrder.province}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-post</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Post Code
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getOrder.zipcode}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-phone</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Phone Number
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        +{{getOrder.phone_number}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
      </v-list>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed outlined large @click="$router.go(-1)" class="mx-2" style="text-transform: none;" large>Back</v-btn>
            <template v-if="getOrder.order_status == 'Pending' && getOrder.payment == 'Midtrans'">
                           <v-btn class="font-weight-bold" @click="payment(getOrder.id)" small dark color="blue darken-3" style="position: absolute; text-transform: none;">Pay</v-btn>
                        </template>
            <template v-if="getOrder.order_status == 'Cancelled'">
                            <v-btn depressed dark color="red accent-2" style="text-transform: none;" @click="deletes(getOrder.id)" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
                          </template>
                          <template v-else>
                            <v-btn depressed dark color="red accent-2" style="text-transform: none;" @click="cancels(getOrder.id)" plain>
                            <v-icon class="mr-1">mdi-close-circle-outline</v-icon>
                            <span class="caption hidden-sm-and-down">Cancel Order</span>
                          </v-btn>
                          </template>
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
  mounted(){
    this.$store.dispatch("order/getOrder", this.$route.params.id);
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
    getOrder(){
      return this.$store.state.order.order
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
      this.$store.commit('order/CANCEL_ORDER_DETAIL', id)
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
      axios.get(`/api/orders/${id}/delete`).then(res => {
        this.$router.replace({name: 'Orders'});
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