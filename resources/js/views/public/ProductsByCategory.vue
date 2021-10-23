<template>
    
    <section>
        <v-card flat class="rounded-lg">
          <v-row class="mx-4">
        <v-col v-for="(product, index) in getProductsByCategory.data" :key="index" cols="6" md="4" lg="4" xl="4">
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
            <template v-if="getTotalItem > 12">
              <v-pagination class="my-8" circle next-icon="mdi-menu-right" prev-icon="mdi-menu-left" color="orange darken-2" v-model="currentPage" :length="lastPage" total-visible="7" @input="changePage"></v-pagination>
            </template>
      </v-card-actions>
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
      disable: false,
      currentPage: 1
      }
    },
    computed: {
      getProductsByCategory(){
        return this.$store.state.product.products_by_category
      },
      lastPage(){
        return this.$store.getters["product/get_last_page_prodbycat"];
      },
      getTotalItem(){
        return this.$store.state.product.products_by_category.total;
      }
    },
    methods: {
      getPBC(){
        this.$store.dispatch('product/getProductsByCategory',
        {
          slug: this.$route.params.slug,
          page: 1,
        }
        );
      },
      changePage(page){
      this.$store.dispatch("product/getProductsByCategory", {
          slug: this.$route.params.slug,
          page: page,
        });
        window.scrollTo(0,0);
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