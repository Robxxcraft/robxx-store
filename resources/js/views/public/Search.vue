<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-row>
            <v-col cols="12" md="9" lg="9" xl="9">
                <v-card class="rounded-lg" flat>
            <v-card-title class="pt-8">
              <p class="title ml-1">Searched</p>
            </v-card-title>
            <v-card-subtitle class="mb-5 ml-4">
                <div class="subtitle-1">
                  <v-chip class="rounded-lg orange orange--text font-weight-bold" outlined>{{searched}}</v-chip>
                </div>
            </v-card-subtitle>
            <v-card-text>
               <v-row>
        <v-col v-for="(product, index) in getSearches.data" :key="index" cols="6" md="4" lg="4" xl="4">
            <v-hover v-slot="{ hover }" open-delay="50">
              <v-card :color="`${color[index % 10]} lighten-5`" class="rounded-t-lg" :elevation="hover ? 16 : 3">
               <div class="align-center">
                 <v-img  :src="product.photo ? '/images/'+product.photo : '/assets/images/blank.png'" class="rounded-t-lg" contain max-width="auto" :height="$vuetify.breakpoint.smAndDown ? '100px' : '200px'">
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
               <v-card-actions class="my-5 align-center justify-center">
            <template v-if="getTotalItems > 12">
              <v-pagination class="my-8" circle next-icon="mdi-menu-right" prev-icon="mdi-menu-left" color="orange darken-2" v-model="currentPage" :length="lastPage" total-visible="7" @input="changePage"></v-pagination>
            </template>
      </v-card-actions>
               <template v-if="getSearches.data <= 0">
                 <v-card height="420" flat>
                   <v-row align="center" justify="center">
                   <span class="text-h5 grey--text pa-5 mt-8">Not Found</span>
                 </v-row>
                 </v-card>
               </template>
            </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" lg="3" xl="3">
                <v-card class="rounded-lg" flat>
                    <v-card-title>
                        <v-text-field v-model="searchtext" label="Search" append-icon="mdi-magnify" filled rounded color="orange" @click:append="search(searchtext)" @keyup.enter="search(searchtext)"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <div class="text-h6"> 
                            Tags
                        </div>
                        <v-divider></v-divider>
                        <div class="caption">
                  <v-chip class="mx-1 my-1" outlined color="orange accent-2" v-for="(tag, index) in getTags" :key="index" @click="tagProducts(tag.slug)" v-text="tag.name"></v-chip>
                </div>
                        
                    </v-card-text>
                </v-card>
        </v-col>
        </v-row>
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
  data(){
    return {
        searchtext: null,
        searched: null,
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
      disable: false,
      currentPage: 1
    }
  },
  components: {
    Navigation,
    BottomNavigation,
    Footer,
  },
  mounted() {
    this.$store.dispatch("tag/getTags");
    this.search(this.$route.params.slug, 1);
  },
  computed: {
    getSearches() {
      return this.$store.state.search.search;
    },
    getTags(){
      return this.$store.state.tag.tags;
    },
    lastPage(){
      return this.$store.state.search.search.last_page;
    },
    getTotalItems(){
      return this.$store.state.search.search.total;
    }
  },
  methods: {
    changePage(page){
      this.$store.dispatch("search/getSearches", {
          searchText: this.searched,
          page: page,
        })
      window.scrollTo(0,0);
    },
    search(searchvalue, page){
        let s = searchvalue.replace(/[-]/gi, ' ')
        let w = s.charAt(0).toUpperCase() + s.slice(1);
        this.searched = w;
        this.$store.dispatch('search/getSearches', {
          searchText: this.searched,
          page: page,
        })
        window.scrollTo(0,0);
    },
    tagProducts(slug){
      this.$router.push({name: 'TagProducts', params: {slug : slug}})
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
    addFavourite(id) {
      this.disable = true
      
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      
      axios.post(`/api/favourite/${id}`).then(()=> {
        this.$store.commit("search/FAVOURITE_SEARCH", id)
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
        this.$store.commit("search/UNFAVOURITE_SEARCH", id)
      }).finally(() => {
        this.disable = false
      })
    },
  }
};
</script>