<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4">
        <v-row wrap>
        <v-col sm="12" md="3">
          <v-card flat class="rounded-lg">
            <v-card-title>
              <p class="subheading">Categories</p>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(category, index) in getCategories" :key="index">
                  <v-icon left>mdi-format-list-text</v-icon>
                  <div class="mx-2" @click="getCP"><router-link class="grey--text" style="text-decoration: none;" :to="{name: 'CategoryProducts', params: {slug: category.slug}}"><div>{{category.name}}</div></router-link></div>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col sm="12" md="9">
          <router-view ref="Category"></router-view>
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
  mounted(){
    this.$store.dispatch('category/getCategories');
  },
  computed: {
      getCategories(){
        return this.$store.state.category.categories
      }
  },
  methods: {
    getCP(){
      this.$refs.Category.getCP()
    }
  }
};
</script>