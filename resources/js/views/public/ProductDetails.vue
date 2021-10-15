<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4">
        <v-row>
        <v-col md="9">
            <v-card height="100%" class="rounded-lg" flat>
              <v-btn @click="$router.go(-1)" class="rounded-br-xl" depressed><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
              <v-row>
                <v-col cols="12" sm="4">
                    <v-container>
                      <v-img :src="'/images/' + getProduct.photo" class="rounded-lg mx-auto my-auto fill-height" width="100px"></v-img>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="8" class="px-10">
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
                    <h5 class="subtitle-1 grey--text grey--darken-4" v-if="getProduct.category">{{getProduct.category.name}}</h5>
                    <p class="grey--text my-5">
                      {{ getProduct.description }}
                    </p>
                  <v-row>
                    <v-col md="4">
                      <div class="title">Price
                      <p class="caption grey--text text--accent-4"><b>${{getProduct.price}}</b></p></div>
                    </v-col>
                    <v-col md="4">
                      <div class="title">Stock
                      <template v-if="getProduct.stok >= 0"><p class="caption grey--text text--accent-4"><b>{{getProduct.stok}}</b></p></template>
                      <template v-else><p class="caption "><v-chip class="rounded-0 red--text" outlined>Out Of Stock</v-chip></p></template></div>
                    </v-col>
                    <v-col md="4">
                      <div class="title">Date
                      <p class="caption grey--text text--accent-4"><b>{{getProduct.created_at|timeformat}}</b></p></div>
                    </v-col>
                  </v-row>
                  <v-chip-group class="my-2">
                    <v-chip outlined color="orange" v-for="(tag, index) in getProduct.tag" :key="index" @click="tagProducts(tag.slug)">{{tag.name}}</v-chip>
                  </v-chip-group>
                  </v-card-text>
                  <v-card-actions>
                     <v-text-field label="Quantity" flat color="orange accent-2" :counter="getProduct.stok >= 0" filled rounded v-model="quantity"></v-text-field>
                    <v-spacer></v-spacer>
                   <v-btn depressed class="mx-2 white--text orange darken-2" :disabled="getProduct.stok <= 0" right @click="addToCart(getProduct)" style="text-transform: none;">
                       <b>Add to cart</b>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
        </v-col>
        <v-col md="3">
           <v-card class="rounded-lg" flat>
                  <v-card-subtitle>
                    <v-subheader>Recent Product</v-subheader>
                    <v-divider></v-divider>
                  </v-card-subtitle>
                  <v-card-text>
                    <div  v-for="(recent, index) in getRecentProducts" :key="index" class="my-n4 my-auto">
                      <v-list-item >
                      <v-list-item-avatar>
                        <v-img :src="'/images/'+recent.photo"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        
                        <v-list-item-title>{{recent.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{recent.description}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
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
      quantity: 1,
      disable: false
    }
  },
  components: {
    Navigation,
    Footer,
  },
  mounted() {
    this.$store.dispatch("product/getProduct", this.$route.params.slug);
    this.$store.dispatch("product/getRecentProducts");
  },
  created(){
    this.$store.dispatch("product/getRelatedProducts", this.$store.state.product.product.category_id);
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
      this.$router.replace({name: 'TagProducts', params: slug})
    }
  }
};
</script>