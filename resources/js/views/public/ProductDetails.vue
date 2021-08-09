<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <v-row>
        <v-col md="9">
          <v-container>
            <v-card height="100%" class="rounded-lg mt-3" flat>
              <v-btn @click="$router.go(-1)" class="rounded-br-xl" depressed><v-icon>mdi-arrow-left-thick</v-icon> Back</v-btn>
              <v-row>
                <v-col cols="12" sm="4">
                    <v-container>
                      <v-img width="100%" height="350" :src="'/images/' + getProduct.photo" class="rounded-lg mx-auto my-auto"></v-img>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="8" class="px-10">
                  <v-card-text>
                    <v-app-bar class="justify-end"  flat color="rgba(0,0,0,0)">
                      <v-spacer></v-spacer>
                          <template v-if="getProduct.favourited_count == true">
                          <v-icon color="red" @click="unFavourite(getProduct.id)">mdi-heart</v-icon>
                        </template>
                        <template v-else>
                          <v-icon color="red" @click="addFavourite(getProduct.id)">mdi-heart-outline</v-icon>
                        </template>
                    </v-app-bar>
                    <h3>{{ getProduct.title }}</h3>
                    <h5 class="subheading" v-if="getProduct.category">{{getProduct.category.name}}</h5>
                    <p class="grey--text my-2">
                      {{ getProduct.description }}
                    </p>
                  <v-row>
                    <v-col md="3">
                      <div class="title">Price</div>
                      <div class="caption"><b>${{getProduct.price}}</b></div>
                    </v-col>
                    <v-col md="3">
                      <div class="title">Stock</div>
                      <div class="caption"><b>{{getProduct.stok}}</b></div>
                    </v-col>
                  </v-row>
                  <v-chip-group class="my-2">
                    <v-chip v-for="(tag, index) in getProduct.tag" :key="index">{{tag.name}}</v-chip>
                  </v-chip-group>
                  </v-card-text>
                  <v-card-actions>
                     <v-text-field label="Quantity" shaped flat color="orange" filled v-model="quantity"></v-text-field>
                    <v-spacer></v-spacer>
                   <v-btn depressed class="mx-2 white--text orange" right @click="addToCart(getProduct)">
                      <v-icon>mdi-cart-plus</v-icon> <b>Add to cart</b>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
        <v-col md="3">
          <v-container>
           <v-card class="rounded-lg" flat>
                  <v-card-title>
                    <v-subheader>Recent Product</v-subheader>
                  </v-card-title>
                  <v-card-text>
                    <div  v-for="(recent, index) in getRecentProducts" :key="index">
                      <v-divider></v-divider>
                      <v-list-item>
                      <v-list-item-avatar>
                        <v-img :src="'/images/'+recent.photo"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        
                        <v-list-item-title>{{recent.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{recent.description}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    </div>
                  </v-card-text>
            </v-card>
          </v-container>
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
  data(){
    return {
      quantity: 1
    }
  },
  components: {
    Navigation,
    Footer,
  },
  mounted() {
    this.$store.dispatch("product/getProduct", this.$route.params.slug);
    this.$store.dispatch("product/getRecentProducts");
    this.$store.dispatch("product/getRelatedProducts", this.$route.params.slug);
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
    addFavourite(id){
      axios.post(`/api/favourite/${id}`).then(()=>{
        this.$store.commit('product/FAVOURITE', id)
      })
    },
    unFavourite(id){
      axios.delete(`/api/favourite/${id}`).then(()=>{
        this.$store.commit('product/UNFAVOURITE', id)
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

    }
  }
};
</script>