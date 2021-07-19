<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <v-row>
        <v-col md="9">
          <v-container>
            <v-card class="rounded-lg mt-3" flat>
              <v-row>
                <v-col cols="12" sm="4">
                    <v-container>
                      <v-img width="100%" height="350" :src="'/images/' + getProduct.photo" class="rounded-lg mx-auto my-auto"></v-img>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="8" class="px-10">
                  <v-card-text>
                      <v-app-bar flat color="rgba(0,0,0,0)">
                    <v-spacer></v-spacer>
                    <v-icon color="grey lighten-1">mdi-heart</v-icon>
                  </v-app-bar>
                  <h3 class="grey--text">{{ getProduct.title }}</h3>
                  <p class="grey--text">
                    {{ getProduct.description }}
                  </p>
                  <div>
                    {{getProduct.stok}}
                  </div>
                  <v-chip-group>
                    <v-chip v-for="(tag, index) in getProduct.tag" :key="index">{{tag.name}}</v-chip>
                  </v-chip-group>
                  </v-card-text>
                  <v-card-actions>
                    <strong class="subheading ml-2"
                      >${{ getProduct.price }}</strong
                    >
                    <v-spacer></v-spacer>
                    <v-btn depressed class="amber" right>
                      <v-icon>fas fa-plus</v-icon>Add to cart
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
                    <v-subheader>Related Product</v-subheader>
                  </v-card-title>
                  <v-card-text>
                    <div  v-for="(homeproduct, index) in getProductsHomes" :key="index">
                      <v-divider></v-divider>
                      <v-list-item>
                      <v-list-item-avatar>
                        <v-img :src="'/images/'+homeproduct.photo"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{homeproduct.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{homeproduct.description}}</v-list-item-subtitle>
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
  components: {
    Navigation,
    Footer,
  },
  mounted() {
    this.$store.dispatch("product/getProduct", this.$route.params.id);
    this.$store.dispatch("product/getProductsHome");
  },
  computed: {
    getProduct() {
      return this.$store.getters["product/get_product"];
    },
    getProductsHomes() {
      return this.$store.getters["product/get_products_home"];
    },
  },
};
</script>