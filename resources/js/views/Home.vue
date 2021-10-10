<template>
  <!-- <div>
    Selamat Datang di robxx store
    <router-link :to="{name: 'Admin'}">Admin</router-link>
  </div> -->
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />

      <section class="mx-4">
        
      </section>
        <section>
          <v-row wrap class="mx-1 my-4">
          <v-col cols="12" md="3">
            <v-card class="rounded-lg" flat>
              <v-list three-line>
                <template>
                  <v-subheader class="title">Recent Product</v-subheader>
                  <v-list-item v-for="(recent, index) in getRecentProducts" :key="index">
                    <v-list-item-avatar color="#EFF4F1" size="70" rounded>
                      <img :src="'/images/'+recent.photo" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title><router-link style="text-decoration: none;"  :to="{
                          name: 'ProductDetails',
                          params: { slug: recent.slug }
                        }">
                          <h6 class="black--text">{{recent.title}}</h6>
                        </router-link></v-list-item-title>
                      <v-list-item-subtitle class="pb-2">{{recent.category.name}}</v-list-item-subtitle>
                      <div class="font-weight-bold">${{recent.price}}</div>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-carousel height="150px" continuous cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus" class="rounded-lg">
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
            <v-card class="rounded-lg mt-5" flat>
              <!-- <v-card-title>
                Most Bought
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="4" align="center">
                  <v-avatar size="300" tile>
                    <v-img src="5.png"></v-img>
                  </v-avatar>
                  <v-btn fab icon class="ml-14"
                    ><v-icon>mdi-minus</v-icon></v-btn
                  >
                  1
                  <v-btn fab icon><v-icon>mdi-plus</v-icon></v-btn>
                </v-col>
                <v-col cols="12" sm="8" class="px-10">
                  <v-app-bar flat color="rgba(0,0,0,0)">
                    <v-spacer></v-spacer>
                    <v-icon color="grey lighten-1">fas fa-heart</v-icon>
                  </v-app-bar>
                  <h3 class="grey--text">Lidah Buaya</h3>
                  <p class="grey--text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis consequuntur dolorum, quibusdam eum pariatur,
                    laboriosam quia provident placeat corrupti repellat odio at.
                    Hic commodi .
                  </p>
                  <h5 class="grey--text">Overview</h5>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >far fa-calendar-alt</v-icon
                          >
                        </v-avatar>
                        30 Days
                      </v-app-bar>
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-compress-alt</v-icon
                          >
                        </v-avatar>
                        4.7 Diameter
                      </v-app-bar>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-temperature-low</v-icon
                          >
                        </v-avatar>
                        70% Humidity
                      </v-app-bar>
                      <v-app-bar flat color="rgba(0,0,0,0)">
                        <v-avatar color="#FDD3E9" size="30" class="mr-3">
                          <v-icon small color="grey darken-1"
                            >fas fa-tint</v-icon
                          >
                        </v-avatar>
                        4.2° Height
                      </v-app-bar>
                    </v-col>
                  </v-row>
                  <v-btn rounded color="warning"
                    ><v-icon left>fas fa-plus</v-icon>Add to cart</v-btn
                  >
                  <strong class="ml-2">$234</strong>
                </v-col>
              </v-row> -->
              <v-card-title>
                On Sale <span></span>
              </v-card-title>

            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="rounded-lg" flat>
              <v-card-title>
                <v-text-field
                v-model="searchtext"
                    label="Search"
                    append-icon="mdi-magnify"
                    filled
                    rounded
                    color="orange"
                    @click:append="search"
                  ></v-text-field>
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
    <v-bottom-navigation  value="1" color="orange" fixed>
      <v-btn router :to="{name: 'Home'}" class="text-decoration-none">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn depressed>
        <span>Categories</span>
        <v-icon>mdi-list</v-icon>
      </v-btn>

      <v-btn  depressed>
        <span>Products</span>
        <v-icon>mdi-list</v-icon>
      </v-btn>

      <v-btn>
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Navigation from "./public/include/Navigation.vue";
import Footer from "./public/include/Footer.vue";
export default {
  components: {
    Navigation,
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
      searchtext: null
    };
  },
  mounted() {
    this.$store.dispatch("product/getRecentProducts");
    this.$store.dispatch("tag/getTags");
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

      var s = slug.replace(/[-]/gi, ' ')
      var w = s.charAt(0).toUpperCase() + s.slice(1);
      console.log(w)
      
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
      this.$router.push({name: 'TagProducts', params: slug})
    }
  },
};
</script>