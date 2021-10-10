<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section>
          <v-card class="mx-4 my-5 rounded-lg" flat>
            <v-container>
              <v-card-title>
                <h3 class="title">Checkout</h3>
              </v-card-title>
              <v-card-text>
                <div class="text-center"><h5 class="font-weight-bold grey--text text-accent-4 mb-4">${{cartTotalPrice}}</h5><h4>Shipping Information</h4><v-divider></v-divider></div>
                <v-row>
                  <v-col>
                    <v-textarea filled rounded label="Address" color="orange" v-model="form.address">
                    </v-textarea>
                    <v-text-field
                    label="City"
                    filled
                    rounded
                    color="orange"
                    v-model="form.city"
                  ></v-text-field>
                  <v-text-field
                    label="Province"
                    filled
                    rounded
                    color="orange"
                    v-model="form.province"
                  ></v-text-field>
                  <v-text-field
                    label="Zipcode"
                    filled
                    rounded
                    color="orange"
                    v-model="form.zipcode"
                  ></v-text-field>
                  <v-text-field
                    label="Phone Number"
                    filled
                    rounded
                    color="orange"
                    v-model="form.phone_number"
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
                  <v-btn right router :to="{name: 'Checkout'}" class="mr-2" color="orange lighten-3" outlined>
                    <v-icon class="orange--text">mdi-cart</v-icon>
                    <div class="orange--text" @click.prevent="order">Order</div>
                  </v-btn>
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
      form: {
        address: this.$store.state.auth.user.details.address,

        city: this.$store.state.auth.user.details.city,

        province: this.$store.state.auth.user.details.province,

        zipcode: this.$store.state.auth.user.details.zipcode,
        
        phone_number: this.$store.state.auth.user.details.phone_number,

        payment: 'COD',
      }
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

            axios.post('/api/orders/add', formData).then(() =>{
              this.$router.replace({name: 'Orders'})
            })
    },
  }
};
</script>