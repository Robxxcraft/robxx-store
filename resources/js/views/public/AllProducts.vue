<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <v-row class="mx-auto">
        <v-col cols="10">
          <v-card flat>
            <v-card-title>
              <p class="subheading">All Products</p>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm6 md3 lg2 v-for="(product, index) in getProducts" :key="index">
                  <v-card>
                    <v-img height="200" class="white--text align-end" :src="'/images/'+product.photo">
                      <v-card-title>Tt</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">{{product.title}}</v-card-subtitle>

                    <v-card-text class="text--primary">
                      <div class="amber--text">${{product.price}}</div>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-btn color="red" @click="addToCart(product)">Add To Cart</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
  mounted() {
    this.$store.dispatch("product/getProducts");
  },
  computed: {
    getProducts() {
      return this.$store.state.product.products;
    },
  },
  methods: {
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
  }
};
</script>