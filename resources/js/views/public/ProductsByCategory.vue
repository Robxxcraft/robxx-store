<template>
    
    <section>
        <v-card flat class="rounded-lg">
          <!-- <v-layout class="justify-center" row wrap>
                  <v-flex class="ma-2" xs4 sm4 md4 lg4 v-for="(product, index) in getProductsByCategory" :key="index">
                    <v-card :style="{ background: $vuetify.theme.themes.light.background2 }" max-width="700" elevation="10">
                      <v-img height="150" class="white--text align-end" :src="'/images/'+product.photo">
                      </v-img>

                      <v-card-title class="my-2">
                        <router-link style="text-decoration: none;" :to="{
                          name: 'ProductDetails',
                          params: { slug: product.slug }
                        }">
                          <h6 class="black--text">{{product.title}}</h6>
                        </router-link>
                        </v-card-title>

                      <v-card-subtitle class="pb-1 grey--text">{{product.category.name}}</v-card-subtitle>

                      <v-card-text>
                        <div><b>${{product.price}}</b></div>
                      </v-card-text>

                      <v-card-actions class="justify-end">
                        <v-icon>mdi-heart</v-icon>
                        <v-spacer></v-spacer>
                        <v-btn color="orange" outlined class="caption white--text" depressed @click="addToCart(product)">Add To Cart</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
          </v-layout> -->
          <v-row>
        <v-col v-for="(product, index) in getProductsByCategory" :key="index" cols="6" md="4" lg="3" xl="3" sm="6">
            <v-card :color="`${color[index % 10]} lighten-5`" class="rounded-t-lg" elevation="3">
               <div class="align-center">
                 <v-img :src="product.photo ? '/images/'+product.photo : '/assets/images/logo.png'" class="rounded-t-lg" max-height="150" max-width="auto">
                  <v-app-bar flat color="rgba(0,0,0,0)" class="rounded-t-lg mb-3">
                    <v-spacer></v-spacer>
                    <v-btn fab x-small color="white">
                        <template v-if="product.favourited_count == true">
                          <v-icon color="red" @click="unFavourite(product.id)" :disabled="disable">mdi-heart</v-icon>
                        </template>
                        <template v-else>
                          <v-icon color="red" @click="addFavourite(product.id)" :disabled="disable">mdi-heart-outline</v-icon>
                        </template>
                      </v-btn>
                  </v-app-bar>
                 </v-img>
               </div>
                <span class="ml-2 font-weight-medium">{{product.title | titlelength('...')}}</span>    
                <v-card-subtitle class="pb-1 grey--text">{{product.category.name}}</v-card-subtitle>
                    <v-card-text>
                      <div><b>${{product.price}}</b></div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-spacer></v-spacer>
                      <v-btn dark color="orange" class="caption white--text" depressed @click="addToCart(product)" style="text-transform: none;">Add To Cart</v-btn>
                    </v-card-actions>
            </v-card>
          </v-col>
      </v-row>
    </v-card>
    </section>
</template>

<script>
export default {
    mounted(){
      this.getPBC()
    },
    data(){
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
      }
    },
    computed: {
      getProductsByCategory(){
        return this.$store.state.product.products_by_category
      }
    },
    methods: {
      getPBC(){
        this.$store.dispatch('product/getProductsByCategory', this.$route.params.slug);
      },
      addFavourite(id) {
      this.disable = true
      
      if (this.$store.getters["auth/authenticated"] == false) {
        return this.$router.replace({ name: "Login" });
      }

      
      axios.post(`/api/favourite/${id}`).then(()=> {
        this.$store.commit("product/FAVOURITE_PRODUCTSBYCATEGORY", id)
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
        this.$store.commit("product/UNFAVOURITE_PRODUCTSBYCATEGORY", id)
      }).finally(() => {
        this.disable = false
      })
    },
    }
}
</script>