<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section>
          <template v-if="getCart.length > 0">
            <v-card class="mx-4 my-5 rounded-lg" flat>
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
                    <div class="title">Payment With</div>
                  </template>
                  <v-row>
                    <v-col cols="6">
                      <v-sheet outlined class="mx-auto rounded-lg">
                        <v-container>
                          <v-radio value="COD" color="orange" v-slot:label>
                          <div><v-icon>mdi-cart</v-icon> COD</div>
                        </v-radio>
                        </v-container>
                      </v-sheet>
                    </v-col>
                    <v-col cols="6">
                      <v-sheet outlined class="mx-auto rounded-lg">
                        <v-container>
                          <v-radio value="Midtrans" color="orange" v-slot:label>
                          <div><v-icon>mdi-cart</v-icon> Midtrans</div>
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
                  <v-btn right router :to="{name: 'Checkout'}" class="mr-2 white--text" color="orange" @click.prevent="order" style="text-transform: none; text-decoration: none;" >
                    <v-icon class="white--text">mdi-cart</v-icon>
                    <div class="white--text">Order</div>
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
        address: this.$store.state.auth.user.details.address ? this.$store.state.auth.user.details.address : '',

        city: this.$store.state.auth.user.details.city ? this.$store.state.auth.user.details.city : '',

        province: this.$store.state.auth.user.details.province ? this.$store.state.auth.user.details.province : '',

        zipcode: this.$store.state.auth.user.details.zipcode ? this.$store.state.auth.user.details.zipcode : '',
        
        phone_number: this.$store.state.auth.user.details.phone_number ? this.$store.state.auth.user.details.phone_number : '',

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
              this.$router.replace({name: 'Orders'})
              this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
            }).catch(errors => {
                this.errors = errors.response.data.errors;
                this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
            })
    },
  }
};
</script>