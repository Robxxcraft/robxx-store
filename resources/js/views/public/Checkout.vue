<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section>
          <template v-if="getCart.length > 0">
            <v-card :class="$vuetify.breakpoint.smAndDown ? 'mx-1 my-5 rounded-lg' : 'rounded-lg mx-4 my-5'" flat>
            <v-container>
              <v-card-title>
                <h3 class="title">Checkout</h3>
              </v-card-title>
              <v-card-text>
                
                <div class="text-center"><h5 class="font-weight-bold orange--text mb-4">${{cartTotalPrice}}</h5><h4>Shipping Information</h4><v-divider></v-divider></div>
                <v-row>
                  <v-col>
                    <v-textarea filled rounded label="Address" color="orange" v-model="form.address" :error-messages="errors.address">
                    </v-textarea>
                    <v-text-field
                    label="City"
                    filled
                    rounded
                    color="orange"
                    v-model="form.city"
                    :error-messages="errors.city"
                  ></v-text-field>
                  <v-text-field
                    label="Province"
                    filled
                    rounded
                    color="orange"
                    v-model="form.province"
                    :error-messages="errors.province"
                  ></v-text-field>
                  <v-text-field
                    label="Zipcode"
                    filled
                    rounded
                    color="orange"
                    v-model="form.zipcode"
                    :error-messages="errors.zipcode"
                  ></v-text-field>
                  <v-text-field
                    label="Phone Number"
                    filled
                    rounded
                    color="orange"
                    v-model="form.phone_number"
                    :error-messages="errors.phone_number"
                  ></v-text-field>
                  </v-col>
                </v-row>
                <v-radio-group v-model="form.payment" column>
                  <template v-slot:label>
                    <div class="title font-weight-bold">Payment With</div>
                  </template>
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6">
                      <v-sheet outlined class="mx-auto rounded-lg">
                        <v-container>
                          <v-radio value="COD" color="orange" v-slot:label class="font-weight-bold">
                          <div><v-icon color="green darken-2" large>mdi-cash-usd</v-icon> 
                          <span>COD</span></div>
                        </v-radio>
                        </v-container>
                      </v-sheet>
                    </v-col>
                    <v-col cols="12" md="6" lg="6" xl="6">
                      <v-sheet outlined class="mx-auto rounded-lg">
                        <v-container>
                          <v-radio value="Midtrans" color="orange" v-slot:label class="font-weight-bold">
                          <div><v-icon color="blue darken-2" large>mdi-credit-card</v-icon> 
                          <span>Midtrans</span></div>
                        </v-radio>
                        </v-container>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                
                <v-row class="text-right">
                  <v-spacer></v-spacer>
                  <v-col md="2" sm="9"> 
                  <v-btn right router :to="{name: 'Checkout'}" class="mr-2 white--text" :disabled="loading" color="orange" @click.prevent="order" style="text-transform: none; text-decoration: none;" >
                    <v-icon class="white--text">mdi-cart</v-icon>
                    <div class="font-weight-bold white--text">Order</div>
                    <template v-if="loading">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <rect x="19" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
                                        </rect>
                                    </svg>
                        </template>
                  </v-btn>
                  
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-container>
          </v-card>
          </template>
          <template v-else>
            <v-card class="rounded-lg my-5 mx-4" flat>
              <v-card-title><v-btn @click="$router.go(-1)" class="rounded-lg" depressed><v-icon>mdi-arrow-left-thick</v-icon></v-btn></v-card-title>
              <v-container>
                <v-row>
                  <v-col class="text-center my-5">
                <span class="text-h3  grey--text">No Cart Items</span></v-col>
                </v-row>
              </v-container>
            </v-card>
          </template>
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
      loading: false,
      form: {
        address: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.address : null,

        city: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.city : null,

        province: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.province : null,

        zipcode: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.zipcode : null,
        
        phone_number: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.phone_number : null,

        payment: 'COD',
      },
      errors: {}
    }
  },
  computed: {
    getUser() {
      return this.$store.getters['auth/user']
    },
    getCart() {
      return this.$store.state.cart.cart;
    },
    cartTotalQuantity(){
      return this.$store.getters['cart/cartTotalQuantity']
    },
    cartTotalPrice() {
      return this.$store.getters['cart/cartTotalPrice']
    },
  },
  methods: {
    
    order(){
      this.loading = true;
      let formData = new FormData();
            formData.append('address', this.form.address)
            formData.append('city', this.form.city)
            formData.append('province', this.form.province)
            formData.append('zipcode', this.form.zipcode)
            formData.append('phone_number', this.form.phone_number)
            formData.append('total_quantity', this.cartTotalQuantity)
            formData.append('total_amount', this.cartTotalPrice)
            formData.append('payment', this.form.payment)

            axios.post('/api/orders/add', formData).then(res =>{
            this.loading = false;
                    this.$router.replace({name: 'Orders'})
                    this.$toasted.show(res.data, {
                          type: 'success',
                          duration: '2000'
                      });
            }).catch(errors => {
                this.loading = false;
                this.errors = errors.response.data.errors;
                window.scrollTo(0,0);
                this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
            })
    },
  }
};
</script>