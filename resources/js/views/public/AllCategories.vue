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
              <span class="subheading">Categories</span>
            </v-card-title>
            <v-card-text>
              <v-list>
                <div v-for="(category, index) in getCategories" :key="index">
                  <v-list-item :to="{name: 'ProductsByCategory', params: {slug: category.slug}}" style="text-decoration: none;" @click="getPBC">
                  <v-list-item-icon>
                    <v-icon left>mdi-format-list-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{category.name}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
          <template>
            <v-sheet
          class="mx-auto rounded-lg hidden-md-and-up"
          elevation="0"
          max-width="800"
        >
        <span class="text-h6 font-weight-medium ml-5">Categories</span>
          <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
          >
            <v-slide-item
              v-for="(category, index) in getCategories" :key="index"
            >
              <v-card
                color="orange"
                outlined
                class="my-4 mx-2"
                elevation="3"
                router
                :to="{name: 'ProductsByCategory', params: {slug: category.slug}}"
                style="text-decoration: none;"
                height="100"
                width="100"
                @click="getPBC"
              >
                <v-row>
                  <v-col cols="12" class="text-center mt-3">
                     <v-icon large class="white--text">mdi-format-list-text</v-icon>
                  </v-col>
                  <v-col cols="12" class="text-center mt-n3">
                    <span class="subtitle-2 font-weight-bold white--text">{{category.name}}</span>
                  </v-col>
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
      <BottomNavigation :hidden="!$vuetify.breakpoint.smAndDown"/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./include/Navigation.vue";
import BottomNavigation from "./include/BottomNavigation.vue";
import Footer from "./include/Footer.vue";
export default {
  components: {
    Navigation,
    BottomNavigation,
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