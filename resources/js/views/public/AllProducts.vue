<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-card class="rounded-lg mb-10" flat>
            <v-card-title>
              <p class="title ml-1">Most Popular</p>
            </v-card-title>
            <v-card-text class="justify-center">
              <v-layout class="justify-center" row wrap>
                <v-flex class="mx-4 my-2 justify-center" xs12 sm6 md3 lg2 v-for="(product, index) in getProducts" :key="index">
                  <v-card :style="{ background: $vuetify.theme.themes.light.background2 }" max-width="400" elevation="10">
                    <v-img height="150" class="white--text align-end" :src="'/images/'+product.photo">
                    </v-img>

                    <v-card-title class="my-2">
                      <router-link style="text-decoration: none;" :to="{
                        name: 'ProductDetails',
                        params: { slug: product.slug }
                      }">
                        <h6 class="black--text">{{product.title}}</h6>
                      </router-link>
                      </v-card-title>

                    <v-card-subtitle class="pb-1 grey--text">{{product.category.name}}</v-card-subtitle>

                    <v-card-text>
                      <div><b>${{product.price}}</b></div>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-icon class="red--text">mdi-heart-outline</v-icon>
                      <v-spacer></v-spacer>
                      <v-btn color="orange" outlined class="caption white--text" depressed @click="addToCart(product)">Add To Cart</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
        </v-card>
        <v-card class="rounded-lg mt-10" flat>
            <v-card-title>
              <p class="title">All Products</p>
            </v-card-title>
            <v-card-text class="justify-center">
              <v-layout row wrap>
                <v-flex class="mx-4 my-2" xs12 sm6 md3 lg2 v-for="(product, index) in getProducts" :key="index">
                  <v-card :style="{ background: $vuetify.theme.themes.light.background2 }" max-width="400" elevation="10">
                    <v-img height="150" class="white--text align-end" :src="'/images/'+product.photo">
                    </v-img>

                    <v-card-title class="caption my-2">{{product.title}}</v-card-title>

                    <v-card-subtitle class="pb-0 grey--text">{{product.category.name}}</v-card-subtitle>

                    <v-card-text>
                      <div><b>${{product.price}}</b></div>

                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-icon small>mdi-heart</v-icon>
                      <v-spacer></v-spacer>
                      <v-btn color="orange" outlined class="caption white--text" depressed @click="addToCart(product)">Add To Cart</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
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