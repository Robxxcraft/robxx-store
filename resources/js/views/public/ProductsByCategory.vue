<template>
    
    <section>
        <v-card flat class="rounded-lg">
          <v-row class="mx-4">
        <v-col v-for="(product, index) in getProductsByCategory" :key="index" cols="6" md="4" lg="3" xl="3" sm="6">
            <v-card :color="`${color[index % 10]} lighten-5`" class="rounded-t-lg" elevation="3">
               <div class="align-center">
                 <v-img :src="product.photo ? '/images/'+product.photo : 'assets/images/blank.png'" class="rounded-t-lg" max-height="150" max-width="auto">
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
                <span class="mt-1">
                  <router-link class="grey--text text--darken-3 mx-1" :to="{name: 'ProductDetails', params: {slug: product.slug}}" style="text-decoration: none;"><span class="subtitle-1">{{product.title | titlelength('...')}}</span> </router-link>   
                </span>
                <v-card-subtitle class="pb-1 mt-1 grey--text">{{product.category.name}}</v-card-subtitle>
                   
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