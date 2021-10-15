<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-card class="rounded-lg" flat>
            <v-card-title>Order Details</v-card-title>
          <v-card-text>
            <v-card flat>
              <v-app-bar flat height="60" color="grey lighten-4">
                    <div class="subtitle-2"><span class="grey--text text--darken-2 font-weight-bold text-h6">Overview</span><br><span class="orange--text text--darken-3 font-weight-bold ml-2">Order #001</span> </div>
                    <v-spacer></v-spacer>
                      <span class="font-weight-bold subtitle-2">Okt 7, 2021</span>
                  </v-app-bar>
              <v-divider></v-divider>
                <v-container>
                    <v-subheader class="text-h6">Product List</v-subheader>
                  <v-list-item>
                    <v-list-item-avatar color="grey" size="90" tile>
                      <v-img contain height="auto" width="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. A natus expedita, aliquid eius, accusamus amet aspernatur doloribus soluta, velit perferendis sint officiis commodi totam impedit? Ut dignissimos minima aut? Modi.
                      </v-list-item-title>

                      <v-list-item-subtitle class="my-1">
                          Category -
                          <span class="orange--text text--darken-3">oooo</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Quantity 
                          <span class="orange--text text--darken-3">
                            99
                          </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Price 
                          <span class="orange--text text--darken-3">
                            $909
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                </v-container>
                <v-row class="my-4">
                    <v-col md="4" lg="4" xl="4" cols="12"  :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Payment With
                        <p class="subtitle-1 grey--text text--darken-1"><b>Midtrans</b></p>
                      </div>
                    </v-col>
                    <v-divider :hidden="$vuetify.breakpoint.smAndDown" vertical></v-divider>
                    <v-col md="4" lg="4" xl="4" cols="12" :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Total Quantity
                        <p class="subtitle-1 grey--text text--darken-1"><b>100</b></p>
                      </div>
                    </v-col>
                    <v-divider :hidden="$vuetify.breakpoint.smAndDown" vertical></v-divider>
                    <v-col md="4" lg="4" xl="4" cols="12" :class="$vuetify.breakpoint.smAndDown  ? '' : 'text-center'">
                      <div class="text-h6 mx-3">Total Amount
                        <p class="subtitle-1 grey--text text--darken-1"><b>$400</b></p>
                      </div>
                    </v-col>
                  </v-row>

                  <v-list>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-mail</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Address
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Cisange, Jawa Selatan
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-mail</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Post Code
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        69420
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-mail</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Phone Number
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        08696969
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <template v-if="order.order_status == 'Pending' && order.payment == 'Midtrans'">
                           <v-btn class="font-weight-bold" @click="payment(order.id)" small dark color="blue darken-3" style="position: absolute; text-transform: none;">Pay</v-btn>
                        </template> -->
            <v-btn depressed outlined>Back</v-btn>
            <v-btn depressed class="font-weight-bold" dark color="blue darken-3" style="text-transform: none;">Pay</v-btn>
            <template>
              <v-btn depressed dark color="red accent-2" style="text-transform: none;" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
            </template>
            <template>
              <v-btn depressed dark color="red accent-2" style="text-transform: none;" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
            </template>
          </v-card-actions>
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
}
</script>