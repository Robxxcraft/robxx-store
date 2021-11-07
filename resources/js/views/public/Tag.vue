<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section :class="$vuetify.breakpoint.smAndDown ? 'my-5' : 'mx-4 my-5'">
        <v-row :no-gutters="$vuetify.breakpoint.smAndDown ? true : false">
            <v-col cols="12" md="9" lg="9" xl="9">
                <v-card class="rounded-lg" flat>
            <v-card-title class="pt-8">
              <p class="title ml-1">Tagged</p>
            </v-card-title>
            <v-card-subtitle class="mb-5 ml-4">
                <div class="subtitle"></div>
            </v-card-subtitle>
            <v-card-text class="justify-center">
              <v-row :class="$vuetify.breakpoint.smAndDown ? '' : 'mx-4'">
        <v-col v-for="(product, index) in getTagProducts.data" :key="index" cols="6" md="3" lg="3" xl="3">
            <v-hover v-slot="{ hover }" open-delay="50">
              <v-card :color="`${color[index % 10]} lighten-5`" :height="$vuetify.breakpoint.smAndDown ? '275' : '375'" class="rounded-t-lg d-flex flex-column" :elevation="hover ? 16 : 3">
               <div class="align-center">
                 <v-img  :src="product.photo ? product.photo : '/assets/images/blank.png'" class="rounded-t-lg" contain max-width="auto" :height="$vuetify.breakpoint.smAndDown ? '100px' : '200px'">
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
                  <v-card-title class="mb-n3">
                    <router-link class="grey--text text--darken-3" :to="{name: 'ProductDetails', params: {slug: product.slug}}" style="text-decoration: none;"><span :class="$vuetify.breakpoint.smAndDown ? 'subtitle-2 font-weight-bold' : 'font-weight-bold'">{{product.title | titlelength('...')}}</span></router-link>   
                  </v-card-title>
                    <v-spacer></v-spacer>
                <template v-if="product.category">
                  <v-card-subtitle class="pb-1 mt-n5 caption grey--text text--darken-1"><span :class="$vuetify.breakpoint.smAndDown ? 'caption' : ''">{{product.category.name}}</span></v-card-subtitle>
                </template>
                    <v-card-actions class="mt-4">
                      <span>
                      <div class="subtitle-2 ml-1 orange--text text--darken-2"><b>${{product.price}}</b></div></span>
                      <v-spacer></v-spacer>
                      <v-btn dark color="orange" class="caption white--text font-weight-bold" elevation="5" @click="addToCart(product)" style="text-transform: none;">Add To Cart</v-btn>
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
               <template v-if="getTagProducts.data <= 0">
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
                        <v-text-field v-model="searchtext" label="Search" append-icon="mdi-magnify" filled rounded color="orange" @click:append="search" 
                    @keyup.enter="search"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <div class="text-h6"> 
                            Tags
                        </div>
                        <v-divider></v-divider>
                        <div class="caption">
                  <v-chip class="mx-1 my-1" outlined color="orange accent-3" v-for="(tag, index) in getTags" :key="index" @click="tagProducts(tag.slug)" v-text="tag.name"></v-chip>
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
        tagged: null,
        searchtext: null,
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
    this.tagProducts(this.$route.params.slug, 1);
  },
  computed: {
    getTagProducts() {
      return this.$store.state.tag.tag_products;
    },
    getTags(){
      return this.$store.state.tag.tags;
    },
    lastPage(){
      return this.$store.state.tag.tag_products.last_page;
    },
    getTotalItems(){
      return this.$store.state.tag.tag_products.total;
    }
  },
  methods: {
    changePage(page){
      this.$store.dispatch("tag/getTagProducts", {
          slug: this.$route.params.slug,
          page: page,
        })
      window.scrollTo(0,0);
    },
    search(){
      var title = this.searchtext
      var slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+/, '-').replace(/-+$/, '')
      this.$router.replace({name: 'Search', params:{ slug: slug}})
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
    tagProducts(slug, page){
      this.$store.dispatch("tag/getTagProducts", {
          slug: slug,
          page: page,
        })
      window.scrollTo(0,0);
    },
    addFavourite(id) {
      this.disable = true
      
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      
      axios.post(`/api/favourite/${id}`).then(()=> {
        this.$store.commit("tag/FAVOURITE_TAG", id)
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
        this.$store.commit("tag/UNFAVOURITE_TAG", id)
      }).finally(() => {
        this.disable = false
      })
    },
  }
};
</script>