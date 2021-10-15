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
                      <v-img :src="recent.photo ? `/images/${recent.photo}` : 'assets/images/blank.png'" style=" width: 100%; max-height:auto;"></v-img>
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
            <v-carousel :height="$vuetify.breakpoint.smAndDown ? 'auto' : '150px;'" continuous cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus" class="rounded-lg">
          <v-carousel-item>
            <v-img style=" width: 100%; max-height:auto;"  src="/assets/images/b-bg1.png"></v-img>
          </v-carousel-item>
          <v-carousel-item>
            <v-img style=" width: 100%; max-height:auto;"  src="/assets/images/b-bg2.jpg"></v-img>
          </v-carousel-item>
          <v-carousel-item>
            <v-img style=" width: 100%; max-height:auto;"  src="/assets/images/b-bg3.jpg"></v-img>
          </v-carousel-item>
            </v-carousel>
            <v-card class="rounded-lg mt-5" flat height="420">
              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-row class="pa-3 mt-2">
                    <span class="font-weight-medium ma-3">On Sale</span>
                 <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold text-h6">{{days}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">d</span>
              </v-card>

              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold text-h6">{{hours}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">h</span>
              </v-card>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold text-h6">{{minutes}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">m</span>
              </v-card>
              <v-card color="blue darken-3 mx-1" elevation="3" class="pa-2">
                  <span class="white--text font-weight-bold text-h6">{{seconds}}</span>
                  <span class="white--text font-weight-bold subtitle-2 ml-n1">s</span>
              </v-card>
                </v-row>
              </v-app-bar>
              <v-card-text>
                <v-list-item three-line>
                  <v-list-item-avatar rounded size="120" color="grey lighten-4">
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-hover>

                    <v-list-item-title class="text-h5">
                      <router-link :to="{name : 'ProductDetails', params: {slug: 'oooo'}}" class="black--text" style="text-decoration: none;"><span>Caramel Capuchino</span></router-link>
                    </v-list-item-title>
                    </v-hover>
                    <v-list-item-subtitle class="mt-1">Caramel with syrupsawdbiwbkjbwfkbqw</v-list-item-subtitle>
                    <div>Stock<span class="font-weight-bold ml-3">100</span></div>
                    <div>Price<span class="font-weight-bold ml-3">$90.00</span></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">
                      <v-btn plain color="orange darken-3" depressed style="text-transform: none;">Add To Cart</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card-text>
            </v-card>
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

      <section class="pb-8">
        <v-container>
          <v-card class="rounded-lg" flat>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-row justify="center">
                  <v-col cols="12" sm="5">
                    <h2 class="font-weight-light display-1">Contact</h2>
                    <h4 class="grey--text font-weight-light mt-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis, ducimus nam. Illo laudantium dolores sunt
                      architecto dolorem ipsam sed repudiandae sit aliquid iusto
                      ad commodi, natus cumque impedit dolore libero.
                    </h4>
                    <h4 class="font-weight-light mt-3">
                      Telephone: +62 xxx xxx xxx
                    </h4>
                    <h4 class="font-weight-light">Email: email@gmail.com</h4>
                  </v-col>
                  <v-col cols="12" sm="7">
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="textArea"
                        :rules="textAreaRules"
                        label="Message"
                        required
                      ></v-textarea>
                      <v-btn
                        class="mt-3"
                        depressed
                        :disabled="!valid"
                        color="orange lighten-2 white--text"
                        block
                        @click="submit"
                        >Send</v-btn
                      >
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
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
      name: "",
      nameRules: [
        (v) => !!v || "Name required",
        (v) => (v && v.length >= 6) || "Name min 6",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Email required",
        (v) => /.+@.+\..+/.test(v) || "Email not valid",
      ],
      textArea: "",
      textAreaRules: [
        (v) => !!v || "Text required",
        (v) => (v && v.length >= 10) || "Text min 10",
      ],
      lazy: false,
      searchtext: null,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  },
  mounted() {
    this.$store.dispatch("product/getRecentProducts");
    this.$store.dispatch("tag/getTags");
  },
  created(){
      setInterval(this.updateTimer, 1000)
  },
  computed: {
    getRecentProducts() {
      return this.$store.getters["product/get_recent_products"];
    },
    getTags(){
      return this.$store.state.tag.tags;
    },
  },
  methods: {
    submit() {},
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
      let future = Date.parse("January 1, 2022 00:00:00");
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