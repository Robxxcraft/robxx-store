<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-row>
            <v-col md="9">
                <v-card class="rounded-lg" flat>
            <v-card-title class="pt-8">
              <p class="title ml-1">Tagged</p>
            </v-card-title>
            <v-card-subtitle class="mb-5 ml-4">
                <div class="subtitle">{{tagged}}</div>
            </v-card-subtitle>
            <v-card-text class="justify-center">
              <v-layout class="justify-center" row wrap>
                <v-flex class="mx-4 my-2 justify-center" xs12 sm6 md3 lg2 v-for="(product, index) in getTagProducts" :key="index">
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
            </v-col>
            <v-col md="3">
                <v-card class="rounded-lg" flat>
                    <v-card-title>
                        <v-text-field v-model="searchtext" label="Search" append-icon="mdi-shopping-outline" filled rounded color="orange" @click:append="search"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <div class="title"> 
                            Tags
                        </div>
                        <v-divider></v-divider>
                        <div class="caption">
                            <v-chip class="mx-1 my-1" outlined color="orange accent-2" v-for="(tag, index) in getTags" :key="index" @click="tagProducts(tag.slug)">{{tag.name}}</v-chip>
                        </div>
                    </v-card-text>
                </v-card>
        </v-col>
        </v-row>
      </section>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./include/Navigation.vue";
import Footer from "./include/Footer.vue";
export default {
  data(){
    return {
        searchtext: null
    }
  },
  watch: {
    tagged(newval, oldval){
      return n
    }
  },
  components: {
    Navigation,
    Footer,
  },
  mounted() {
    this.$store.dispatch("tag/getTags");
    this.tagProducts(this.$route.params.slug);
  },
  computed: {
    tagged(){
        let s = this.$route.params.slug.replace(/[-]/gi, ' ')
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    getTagProducts() {
      return this.$store.state.tag.tag_products;
    },
    getTags(){
      return this.$store.state.tag.tags;
    },
  },
  methods: {
    search(searchvalue){
        this.$store.dispatch('search/getSearches', searchvalue)
    },
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
    tagProducts(slug){
      this.$store.dispatch("tag/getTagProducts", slug)
    }
  }
};
</script>