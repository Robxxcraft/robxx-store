<template>
    <v-app :style="{ background: $vuetify.theme.themes.light.background }">
        <v-main>
            <Navigation />
            <section class="mx-4 my-5">
        <v-card flat class="rounded-lg">
            <v-card-text class="text-center align-center justify-center">
                <v-img height="200" contain max-width="auto" src="/assets/images/not_found.svg"></v-img>
                <span class="text-h5 font-weight-bold">Page Not Found</span>
                <v-card-subtitle><v-btn depressed dark class="orange font-weight-bold" to="/" style="text-decoration: none;">HOME</v-btn></v-card-subtitle>
            </v-card-text>
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
}
</script>