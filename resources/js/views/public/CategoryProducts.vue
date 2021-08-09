<template>
    
    <section>
        <v-card flat class="rounded-lg">
          <v-layout class="justify-center" row wrap>
                  <v-flex class="mx-4 my-2" xs5 sm5 md6 lg3 v-for="(product, index) in getCategoryProducts" :key="index">
                    <v-card :style="{ background: $vuetify.theme.themes.light.background2 }" max-width="400" elevation="10">
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
          </v-layout>
    </v-card>
    </section>
</template>

<script>
export default {
    mounted(){
      this.getCP()
    },
    computed: {
      getCategoryProducts(){
        return this.$store.state.product.category_products
      }
    },
    methods: {
      getCP(){
        this.$store.dispatch('product/getCategoryProducts', this.$route.params.slug);
      }
    }
}
</script>