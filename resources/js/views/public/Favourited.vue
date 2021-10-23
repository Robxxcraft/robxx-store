<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-2 my-5">
        <v-card class="rounded-lg mb-10" flat>
            <v-card-title>
                <v-icon large color="red" class="pa-3">mdi-heart</v-icon>
                <div class="font-weight-medium">Favourited List</div>
            </v-card-title>
       
       <v-row class="mx-4">
        <v-col v-for="(product, index) in getFavourited" :key="index" cols="6" md="4" lg="3" xl="3" sm="6">
            <v-hover v-slot="{ hover }" open-delay="50">
              <v-card :color="`${color[index % 10]} lighten-5`" class="rounded-t-lg" :elevation="hover ? 16 : 3">
               <div class="align-center">
                 <v-img  :src="product.photo ? '/images/'+product.photo : 'assets/images/blank.png'" class="rounded-t-lg" contain max-width="auto" :height="$vuetify.breakpoint.smAndDown ? '100px' : '200px'">
                  <v-app-bar flat color="rgba(0,0,0,0)" class="rounded-t-lg mb-3">
                    <v-spacer></v-spacer>
                        <template v-if="product.favourited_count == true">
                          <v-btn fab x-small @click="unFavourite(product.id)" :disabled="disable" color="white">
                          <v-icon color="red">mdi-heart</v-icon>
                          </v-btn>
                        </template>
                        <template v-else>
                          <v-btn fab x-small  @click="addFavourite(product.id)" :disabled="disable" color="white">
                                <v-icon color="red">mdi-heart-outline</v-icon>
                            </v-btn>
                            </template>
                            
                  </v-app-bar>
                 </v-img>
               </div>
                <v-card-title>
                  <router-link class="grey--text text--darken-3 mb-2" :to="{name: 'ProductDetails', params: {slug: product.slug}}" style="text-decoration: none;"><span class="subtitle-1">{{product.title | titlelength('...')}}</span> </router-link>   
                </v-card-title>  
                <template v-if="product.category">
                  <v-card-subtitle class="pb-1 grey--text">{{product.category.name}}</v-card-subtitle>
                </template>
                    <v-card-text>
                      <div><b>${{product.price}}</b></div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-spacer></v-spacer>
                      <v-btn dark color="orange" class="caption white--text font-weight-bold" depressed @click="addToCart(product)" style="text-transform: none;">Add To Cart</v-btn>
                    </v-card-actions>
            </v-card>
            </v-hover>
          </v-col>
      </v-row>
      </v-card>
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
  data() {
    return {
      color: [
        "red",
        "blue",
        "blue-grey",
        "yellow",
        "brown",
        "orange",
        "purple",
        "teal",
        "green",
        "indigo"
      ],
      disable: false
    };
  },
  mounted() {
    this.$store.dispatch("favourite/getFavouritedLists");
  },
  computed: {
    getFavourited() {
      return this.$store.state.favourite.favourited;
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
    addFavourite(id) {
      this.disable = true
      
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      
      axios.post(`/api/favourite/${id}`).then(()=> {
        this.$store.commit("favourite/FAVOURITE_PAGE", id)
      }).finally(() => {
        this.disable = false
      })
    },
    unFavourite(id) {
      this.disable = true

      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      
      axios.delete(`/api/favourite/${id}`).then(()=> {
        this.$store.commit("favourite/UNFAVOURITE_PAGE", id)
      }).finally(() => {
        this.disable = false
      })
    },
  },
};
</script>