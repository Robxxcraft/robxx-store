<template>
  <!-- <div>
    Selamat Datang di robxx store
    <router-link :to="{name: 'Admin'}">Admin</router-link>
  </div> -->
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
        <v-row wrap class="mx-1 my-4">
          <v-col cols="12" sm="3">
            <v-card class="rounded-xl" flat>
              <v-list three-line>
                <template>
                  <v-subheader>qqqqqqqq</v-subheader>
                  <v-list-item>
                    <v-list-item-avatar color="#EFF4F1" size="70" rounded>
                      <img />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>ssssssssssss</v-list-item-title>
                      <v-list-item-subtitle>sssss</v-list-item-subtitle>
                      <v-list-item-title>sssssss</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="rounded-xl" flat>
              <v-row>
                <v-col cols="12" sm="4" align="center">
                  <v-avatar size="300" tile>
                    <v-img src="5.png"></v-img>
                  </v-avatar>
                  <v-btn fab icon class="ml-14"
                    ><v-icon>fas fa-minus</v-icon></v-btn
                  >
                  1
                  <v-btn fab icon><v-icon>fas fa-plus</v-icon></v-btn>
                </v-col>
                <v-col cols="12" sm="8" class="px-10">
                  <v-app-bar flat color="rgba(0,0,0,0)">
                    <v-spacer></v-spacer>
                    <v-icon color="grey lighten-1">fas fa-heart</v-icon>
                  </v-app-bar>
                  <h3 class="grey--text">Lidah Buaya</h3>
                  <p class="grey--text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis consequuntur dolorum, quibusdam eum pariatur,
                    laboriosam quia provident placeat corrupti repellat odio at.
                    Hic commodi .
                  </p>
                  <h5 class="grey--text">Overview</h5>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >far fa-calendar-alt</v-icon
                          >
                        </v-avatar>
                        30 Days
                      </v-app-bar>
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-compress-alt</v-icon
                          >
                        </v-avatar>
                        4.7 Diameter
                      </v-app-bar>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-temperature-low</v-icon
                          >
                        </v-avatar>
                        70% Humidity
                      </v-app-bar>
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-tint</v-icon
                          >
                        </v-avatar>
                        4.2° Height
                      </v-app-bar>
                    </v-col>
                  </v-row>
                  <v-btn rounded color="warning"
                    ><v-icon left>fas fa-plus</v-icon>Add to cart</v-btn
                  >
                  <strong class="ml-2">$234</strong>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="rounded-xl" flat>
              <v-card-title>
                <v-text-field
                    label="Search"
                    prepend-inner-icon="fas fa-search"
                    filled
                    rounded
                    color="#4FC694"
                  ></v-text-field>
              </v-card-title>
              <v-list three-line class="mt-n4">
                
                <v-list-item-group> </v-list-item-group>
              </v-list>
              <v-toolbar flat class="mt-n5">
                <v-toolbar-title>Recomdation Friend</v-toolbar-title>
              </v-toolbar>
              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-avatar rounded size="40" class="mr-2">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                  ></v-img>
                </v-avatar>
                <strong>Kel Varnesan</strong>
                <v-spacer></v-spacer>
                <v-btn text color="orange">Add</v-btn>
              </v-app-bar>
              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-avatar rounded size="40" class="mr-2">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                  ></v-img>
                </v-avatar>
                <strong>Russel D</strong>
                <v-spacer></v-spacer>
                <v-btn text color="orange">Add</v-btn>
              </v-app-bar>
            </v-card>
          </v-col>
        </v-row>
        <h3>Latest Product</h3>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="(homeProduct, index) in getProductsHomes"
            :key="index"
          >
            <v-card flat class="text-xs-center ma-3">
              <v-card-title
                ><router-link
                  class="orange--text lighten-5"
                  style="text-decoration: none"
                  :to="{
                    name: 'ProductDetails',
                    params: { id: homeProduct.id },
                  }"
                  >{{ homeProduct.title }}</router-link
                ></v-card-title
              >
              <v-card-text>
                <v-divider></v-divider>
                <div v-if="homeProduct.stok == 0">
                  <h5 class="red--text font-weight-bold">HABIS</h5>
                </div>
                <div class="amber--text">${{ homeProduct.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-icon left class="red--text">mdi-heart-outline</v-icon>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  class="white--text"
                  color="amber lighten-3"
                  @click="addToCart(homeProduct)"
                  >Add To Cart</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      <div class="my-16">
        <section class="my-16">
          <v-parallax src="/assets/images/bg1.jpg">
            <v-row class="my-auto" align="end">
              <v-col class="text-center" cols="12">
                <h1 class="text-h4">RobxxStore</h1>
                <h4 class="subheading">Welcome To Homepage</h4>
              </v-col>
            </v-row>
          </v-parallax>
        </section>
      </div>

      <section class="pb-8">
        <v-container class="rounded-a-lg">
          <v-card class="rounded-a-lg" flat>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-row justify="center">
                  <v-col cols="12" sm="5">
                    <h1 class="font-weight-light display-1">Contact</h1>
                    <h3 class="grey--text font-weight-light mt-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis, ducimus nam. Illo laudantium dolores sunt
                      architecto dolorem ipsam sed repudiandae sit aliquid iusto
                      ad commodi, natus cumque impedit dolore libero.
                    </h3>
                    <h3 class="font-weight-light mt-3">
                      Telephone: +62 xxx xxx xxx
                    </h3>
                    <h3 class="font-weight-light">Email: email@gmail.com</h3>
                  </v-col>
                  <v-col cols="12" sm="7">
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="textArea"
                        :rules="textAreaRules"
                        label="Message"
                        required
                      ></v-textarea>
                      <v-btn
                        class="mt-3"
                        depressed
                        :disabled="!valid"
                        tile
                        color="amber lighten-3 white--text"
                        block
                        @click="submit"
                        >Send</v-btn
                      >
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </section>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./public/include/Navigation.vue";
import Footer from "./public/include/Footer.vue";
export default {
  components: {
    Navigation,
    Footer,
  },
  name: "Home",
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name required",
        (v) => (v && v.length >= 6) || "Name min 6",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Email required",
        (v) => /.+@.+\..+/.test(v) || "Email not valid",
      ],
      textArea: "",
      textAreaRules: [
        (v) => !!v || "Text required",
        (v) => (v && v.length >= 10) || "Text min 10",
      ],
      lazy: false,
    };
  },
  mounted() {
    this.$store.dispatch("product/getProductsHome");
  },
  computed: {
    getProductsHomes() {
      return this.$store.getters["product/get_products_home"];
    },
  },
  methods: {
    submit() {},
    addToCart(product) {
      if (this.$store.getters["auth/authenticated"] == false) {
        this.$router.replace({ name: "Login" });
      } else {
        this.$store.dispatch("cart/addProductToCart", {
          product: product,
          quantity: 1,
        });
      }
    },
  },
};
</script>