<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <template>
        
      </template>
      <section class="mx-4 my-5">
        <v-row wrap>
        <v-col sm="12" md="3">
          <v-card flat class="rounded-lg hidden-sm-and-down">
            <v-card-title>
              <p class="subheading">Categories</p>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(category, index) in getCategories" :key="index">
                  <v-icon left>mdi-format-list-text</v-icon>
                  <div class="mx-2" @click="getPBC"><router-link class="grey--text" style="text-decoration: none;" :to="{name: 'ProductsByCategory', params: {slug: category.slug}}"><div>{{category.name}}</div></router-link></div>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <template>
            <v-sheet
          class="mx-auto hidden-md-and-up"
          elevation="0"
          max-width="800"
        >
          <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
          >
            <v-slide-item
              v-for="(category, index) in getCategories" :key="index"
              v-slot="{ active, toggle }"
              
            >
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-4"
                flat
                height="100"
                width="100"
                @click="getPBC"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                <router-link class="grey--text text--darken-3" style="text-decoration: none;" :to="{name: 'ProductsByCategory', params: {slug: category.slug}}"><div>{{category.name}}</div></router-link>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
          </v-sheet>
          </template>
        </v-col>
        <v-col sm="12" md="9" class="mt-3">
          <router-view ref="ProductsByCategory"></router-view>
        </v-col>
      </v-row>
      </section>
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
  data(){
    return {
      model: null
    }
  },
  mounted(){
    this.$store.dispatch('category/getCategories');
  },
  computed: {
      getCategories(){
        return this.$store.state.category.categories
      }
  },
  methods: {
    getPBC(){
      this.$refs.ProductsByCategory.getPBC()
    }
  }
};
</script>