<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4">
         <v-row wrap>
             <v-col md="8" sm="12">
                 <v-card flat class="rounded-lg">
                     <v-container>
                         <v-img src="'/images/account.jpg'">

                         </v-img>
                        <div class="justify-center text-center">
                            <v-card-title class="justify-center font-weight-medium">Profile</v-card-title>
                            <v-card-subtitle>{{getUser.first_name}} {{getUser.last_name}} <v-btn fab depressed color="white" router :to="{name: 'EditProfile'}"><v-icon title="Edit Profile" color="orange">mdi-pencil</v-icon></v-btn> </v-card-subtitle>
                        </div>
                        <v-card-text>
                            <v-divider></v-divider>
                            <v-container>
                                <div class="my-3">
                                    <div class="headline">Email</div>
                                    <div class="caption grey--text">{{getUser.email}}</div>
                                </div>
                                <div class="my-3">
                                    <div class="headline">Address</div>
                                    <div class="caption grey--text">{{getUser.details.address}}</div>
                                </div>
                                <div class="my-3">
                                    <div class="headline">City</div>
                                    <div class="caption grey--text">{{getUser.details.city}}</div>
                                </div>
                                <div class="my-3">
                                    <div class="headline">Province</div>
                                    <div class="caption grey--text">{{getUser.details.province}}</div>
                                </div>
                                <div class="my-3">
                                    <div class="headline">Zipcode</div>
                                    <div class="caption grey--text">{{getUser.details.zipcode}}</div>
                                </div>
                                <div class="my-3">
                                    <div class="headline">Phone Number</div>
                                    <div class="caption grey--text">{{getUser.details.phone_number}}</div>
                                </div>
                            </v-container>
                        </v-card-text>
                     </v-container>
                 </v-card>
             </v-col>
             <v-col md="4" sm="12">
                 <v-card flat class="rounded-lg">
                     <v-card-title class="font-weight-medium">Orders History</v-card-title>
                     <v-card-subtitle>Profile{{getUser.details}}</v-card-subtitle>
                 </v-card>
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
  computed: {
      getUser(){
          return this.$store.state.auth.user
      },
  }
};
</script>