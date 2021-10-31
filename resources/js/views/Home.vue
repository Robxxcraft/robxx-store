<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />

      <section class="mx-4">
        
      </section>
        <section>
          <v-row wrap class="mx-1 my-4">
          <v-col cols="12" md="3" :hidden="$vuetify.breakpoint.smAndDown">
            <v-card class="rounded-lg" height="420" flat>
              <v-list>
                <template>
                  
                  <v-card-title class="text-h6 grey--text text--darken-2">Recent Products</v-card-title>
                  <div>

                  <v-list-item v-for="(recent, index) in getRecentProducts" :key="index" style="text-decoration: none;"  :to="{
                          name: 'ProductDetails',
                          params: { slug: recent.slug }
                        }" three-line>
                    <v-list-item-avatar color="#EFF4F1" size="70" rounded>
                      <v-img :src="recent.photo ? `/images/${recent.photo}` : 'assets/images/blank.png'" contain></v-img>
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
          <v-col cols="12" md="6">
            <v-carousel height="auto" continuous cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus" class="rounded-lg">
          <v-carousel-item v-for="(banner, index) in banners" :key="index">
            <v-img :src="`/assets/images/banner/${banner.image}`"></v-img>
          </v-carousel-item>
            </v-carousel>
            <v-card class="rounded-lg mt-5" flat height="430">
                <v-app-bar flat color="rgba(0,0,0,0)">
                     <v-row>                        <span class="font-weight-bold ma-3">New Year Sale</span>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold subtitle-1">{{days}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">d</span>
              </v-card>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold subtitle-1">{{hours}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">h</span>
              </v-card>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold subtitle-1">{{minutes}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">m</span>
              </v-card>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold subtitle-1">{{seconds}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">s</span>
              </v-card>
                     </v-row>
                </v-app-bar>

          <v-carousel hide-delimiters class="mt-5">
      <v-carousel-item v-for="(product, index) in getSales" :key="index">
              <v-list-item three-line>
                      <v-list-item-avatar rounded size="120" color="grey lighten-4">
                       <v-img :src="product.photo ? `/images/${product.photo}` : 'assets/images/blank.png'" contain></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-hover>

                    <v-list-item-title class="text-h5">
                      <router-link :to="{name : 'ProductDetails', params: {slug: {slug : product.slug}}}" class="black--text" style="text-decoration: none;"><span>{{product.title}}</span></router-link>
                    </v-list-item-title>
                    </v-hover>
                    <v-list-item-subtitle class="mt-1 orange--text text--darken-2">{{product.category.name}}</v-list-item-subtitle>
                    <div>Stock<span class="orange--text text--darken-2 font-weight-bold ml-3">{{product.stok}}</span></div>
                    <div>Price<span class="orange--text text--darken-2 font-weight-bold ml-3">${{product.price}}</span></div>
                  </v-list-item-content>
                    </v-list-item>
            
         
              <v-card-text>
                <v-card-actions>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">
                      <v-btn plain color="orange darken-3" class="font-weight-bold" depressed style="text-transform: none;" @click.prevent="addToCart(product)">Add To Cart</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card-text>
       
      </v-carousel-item>
          </v-carousel>
            </v-card>
          </v-col>
          <v-col cols="12" md="3" class="text-center align-center justify-center my-5" :hidden="!$vuetify.breakpoint.smAndDown">
            <v-subheader class="text-h6 font-weight-bold">Categories</v-subheader>
            <v-row wrap>
              <v-col cols="3" v-for="(category, index) in getHomeCategories" :key="index" style="padding: 0; margin:0;">
                <v-card color="orange"
                class="my-2 mx-2"
                elevation="3"
                :to="{name: 'ProductsByCategory', params: {slug: category.slug}}"
                style="text-decoration: none;"
                width="auto"
                height="120">
              <v-card-subtitle>
                <v-icon class="white--text">mdi-format-list-text</v-icon></v-card-subtitle>    
                        <v-card-actions class="align-center justify-center"><span class="white--text o font-weight-bold">{{category.name}}</span></v-card-actions>
                
                </v-card>
              </v-col>
              <v-col cols="3" style="padding: 0; margin:0;">
                <v-card color="orange"
                class="my-1"
                elevation="3"
                :to="{name: 'AllCategories'}"
                style="text-decoration: none;"
                width="auto"
                height="120">
              <v-card-subtitle>
                <v-icon class="white--text">mdi-dots-horizontal</v-icon></v-card-subtitle>    
                        <v-card-actions class="align-center justify-center"><span class="white--text o">More</span></v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="rounded-lg" height="590" flat>
              <v-card-title>
                <v-text-field
                v-model="searchtext"
                    label="Search"
                    append-icon="mdi-magnify"
                    filled
                    rounded
                    color="orange"
                    @click:append="search"
                    @keyup.enter="search"
                  ></v-text-field>
              </v-card-title>
              <v-card-text>
                <div class="text-h6 grey--text text--darken-2"> 
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
        </section>

      <section class="mx-4 my-5">
          <v-card flat class="rounded-lg mb-8">
                   <v-row class="mt-3">
                   <v-col cols="12" md="6" lg="6" xl="6" class="text-center">
                     <v-img :src="'/assets/images/about.svg'" class="mx-5" contain max-height="400px"></v-img>
                   </v-col>
                   <v-col class="my-auto" cols="12" md="6" lg="6" xl="6">
                     <v-subheader class="text-h4 mt-5">About Us</v-subheader>
                     <v-container class="mb-5">
                       <span class="subtitle-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                       Voluptatum, similique. Ipsum eos iure consequatur illum quas est, dolores, 
                       omnis magni officiis unde necessitatibus. 
                       Soluta modi dolor nesciunt nam perferendis voluptatem!</span><br>
                       <span class="subtitle-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                       Voluptatum, similique. Ipsum eos iure consequatur illum quas est, dolores, 
                       omnis magni officiis unde necessitatibus. 
                       Soluta modi dolor nesciunt nam perferendis voluptatem!</span>
                     </v-container>
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
import Navigation from "./public/include/Navigation.vue";
import BottomNavigation from "./public/include/BottomNavigation.vue";
import Footer from "./public/include/Footer.vue";
export default {
  components: {
    Navigation,
    BottomNavigation,
    Footer,
  },
  name: "Home",
  data() {
    return {
      valid: true,
      model: null,
      searchtext: null,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      banners: []
    };
  },
  mounted() {
    this.$store.dispatch("category/getCategoriesHome");
    this.$store.dispatch("product/getRecentProducts");
    this.$store.dispatch("product/getSale");
    this.$store.dispatch("tag/getTags");
    axios.get('/api/banner').then(res => {
      this.banners = res.data
    })
  },
  created(){
    setInterval(this.updateTimer, 1000)
  },
  computed: {
    getHomeCategories() {
      return this.$store.state.category.homecategories;
    },
    getRecentProducts() {
      return this.$store.getters["product/get_recent_products"];
    },
    getTags(){
      return this.$store.state.tag.tags;
    },
    getSales(){
      return this.$store.state.product.sale;
    },
  },
  methods: {
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
    tagProducts(slug){
      this.$router.push({name: 'TagProducts', params: {slug : slug}})
    },
    updateTimer(){
      let future = Date.parse('January 1 2022 00:00:00');
      let now = new Date();
      let diff = future - now;
      
      var secs = Math.floor(diff / 1000)
      var mins = Math.floor(diff / (1000 * 60 ))
      var hours = Math.floor(diff / (1000*60*60))
      var days = Math.floor(diff / (1000*60*60*24))
      
      var d = days;
      var h = hours - days * 24
      var m = mins - hours * 60
      var s = secs - mins * 60

      this.days = d
      this.hours = h
      this.minutes = m
      this.seconds = s
    }
  },
};
</script>

<style>
.o{
  font-size: 10px;
}
</style>