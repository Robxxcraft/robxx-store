<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section :class="$vuetify.breakpoint.smAndDown ? 'my-5' : 'mx-4 my-5'">
        <v-container fluid>
          <v-row>
        <v-col cols="12" md="9" lg="9" xl="9">
            <v-card height="100%" class="rounded-lg" flat>
              <v-btn @click="$router.go(-1)" class="rounded-br-xl" depressed><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
              <v-row>
                <v-col cols="12" md="4" lg="4" xl="4">
                    <v-container fluid>
                      <v-img :src="getProduct.photo ? getProduct.photo : '/assets/images/blank.png'" class="rounded-lg mx-auto my-5" :height="$vuetify.breakpoint.smAndDown ? '150' : '300'" contain></v-img>
                    </v-container>
                </v-col>
                <v-col cols="12" md="8" lg="8" xl="8" class="px-5">
                  <v-card-text>
                    <v-app-bar class="justify-end" flat color="white">
                      <v-spacer></v-spacer>
                          <template v-if="getProduct.favourited_count == true">
                          <v-icon color="red" @click="unFavourite(getProduct.id)" :disabled="disable">mdi-heart</v-icon>
                          
                        </template>
                        <template v-else>
                          <v-icon color="red" @click="addFavourite(getProduct.id)" :disabled="disable">mdi-heart-outline</v-icon>
                        </template>
                        <div class="ml-2 font-weight-bold grey--text">
                            {{getProduct.favourite_count}}
                        </div>
                    </v-app-bar>
                    <h3>{{ getProduct.title }}</h3>
                    <h5 class="subtitle-1 grey--text text--darken-3" v-if="getProduct.category">{{getProduct.category.name}}</h5>
                    <v-card shaped class="orange lighten-5 my-6 grey--text text--darken-3" elevation="5">
                      <v-card-title class="font-weight-bold">Description</v-card-title>
                      <v-card-text>
                        <template v-if="getProduct.description">
                        <span class="caption" v-html="getProduct.description"></span>
                      </template>
                      <template v-else>
                        <span class="caption font-italic">No Description</span>
                      </template>
                      </v-card-text>
                    </v-card>
                  <v-row>
                    <v-col cols="6" md="4" lg="4" xl="4">
                      <div class="title">Price
                      <p class="orange--text text--darken-3"><b>${{getProduct.price}}</b></p></div>
                    </v-col>
                    <v-col cols="6" md="4" lg="4" xl="4">
                      <div class="title">Stock
                      <template v-if="getProduct.stok >= 0"><p class="orange--text text--darken-3"><b>{{getProduct.stok}}</b></p></template>
                      <template v-else><p class="caption"><v-chip class="rounded-0 red--text" outlined>Out Of Stock</v-chip></p></template></div>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4">
                      <div class="title">Date
                      <p class="orange--text text--darken-3"><b>{{getProduct.created_at|timeformat}}</b></p></div>
                    </v-col>
                  </v-row>
                  <v-chip-group class="my-2">
                    <v-chip outlined color="orange" v-for="(tag, index) in getProduct.tag" :key="index" @click="tagProducts(tag.slug)">{{tag.name}}</v-chip>
                  </v-chip-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-row>
                      <v-col cols="12" md="4" lg="4" xl="4">
                        <v-text-field label="Quantity" :class="$vuetify.breakpoint.smAndDown" flat color="orange" filled rounded v-model="quantity"></v-text-field>
                      </v-col>
                      <v-spacer class="hidden-sm-and-down"></v-spacer>
                      <v-col cols="12" md="3" lg="3" xl="3" class="text-right ma-3">
                        <v-btn depressed class="mx-2 white--text orange darken-2" :disabled="getProduct.stok <= 0" right @click="addToCart(getProduct)" style="text-transform: none;">
                       <b>Add to cart</b>
                    </v-btn>
                      </v-col>
                    </v-row>
                  
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
        </v-col>
        <v-col cols="12" md="3" lg="3" xl="3">
           <v-card class="rounded-lg" flat>
              <v-list>
                <template>
                  
                  <v-card-title class="text-h6 grey--text text--darken-2">Recent Products</v-card-title>
                  <div>

                  <v-list-item v-for="(recent, index) in getRecentProducts" :key="index" style="text-decoration: none;"  :to="{
                          name: 'ProductDetails',
                          params: { slug: recent.slug }
                        }" @click.prevent="dispat" three-line>
                    <v-list-item-avatar color="#EFF4F1" size="70" rounded>
                      <v-img :src="recent.photo ? recent.photo : '/assets/images/blank.png'" contain></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                          <h6 class="black--text">{{recent.title}}</h6>
                      </v-list-item-title>
                      <v-list-item-subtitle class="pb-2">{{recent.category.name}}</v-list-item-subtitle>
                      <div class="font-weight-bold">${{recent.price}}</div>
                    </v-list-item-content>
                  </v-list-item>
                  </div>
                </template>
              </v-list>
            </v-card>
        </v-col>
        </v-row>
        </v-container>
      
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
      quantity: 1,
      disable: false,
      model: null
    }
  },
  mounted() {
    this.$store.dispatch("product/getProduct", this.$route.params.slug);
    this.$store.dispatch("product/getRecentProducts");
  },
  computed: {
    getProduct() {
      return this.$store.getters["product/get_product"];
    },
    getRecentProducts() {
      return this.$store.getters["product/get_recent_products"];
    },
  },
  methods: {
    dispat(){
      this.$store.dispatch("product/getProduct", this.$route.params.slug);
    },
    favs(){
      this.fav = this.$store.getters["product/isFavourite"];
    },
    async addFavourite(id){
      this.disable = true
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      await axios.post(`/api/favourite/${id}`).then(()=> {
        this.$store.commit('product/FAVOURITE', id)
      }).finally(() => {
      this.disable = false
      })
    },
    async unFavourite(id){
      this.disable = true
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }
      
      await axios.delete(`/api/favourite/${id}`).then(() => {
        this.$store.commit('product/UNFAVOURITE', id)
        }).finally(()=> { 
          this.disable = false 
        })
    },
    addToCart(product) {
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }
        this.$store.dispatch("cart/addProductToCart", {
          product: product,
          quantity: this.quantity,
        });

    },
    tagProducts(slug){
      this.$router.push({name: 'TagProducts', params: {slug : slug}})
    },
  }
};
</script>