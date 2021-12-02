<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
                 <v-card flat class="rounded-lg mb-5">
                   <v-row class="mt-3">
                   <v-col cols="12" md="6" lg="6" xl="6" class="text-center">
                     <v-img :src="'/assets/images/about.svg'" class="mx-5" contain max-height="400px"></v-img>
                   </v-col>
                   <v-col class="my-auto" cols="12" md="6" lg="6" xl="6">
                     <v-subheader class="text-h4 mt-5">About Us</v-subheader>
                     <v-container class="mb-5">
                       <span class="subtitle-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                       Voluptatum, similique. Ipsum eos iure consequatur illum quas est, dolores, 
                       omnis magni officiis unde necessitatibus. 
                       Soluta modi dolor nesciunt nam perferendis voluptatem!</span><br>
                       <span class="subtitle-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                       Voluptatum, similique. Ipsum eos iure consequatur illum quas est, dolores, 
                       omnis magni officiis unde necessitatibus. 
                       Soluta modi dolor nesciunt nam perferendis voluptatem!</span>
                     </v-container>
                   </v-col>
                 </v-row>
                 </v-card>
      </section>
      
      <Footer />
    </v-main>
    <BottomNavigation :hidden="!$vuetify.breakpoint.smAndDown"/>
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
};
</script>