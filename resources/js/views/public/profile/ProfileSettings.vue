<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
         <v-row wrap>
             <v-col cols="3" class="hidden-sm-and-down">
                 <v-card class="rounded-lg" flat>
                     <v-list style="margin: 0; padding: 0;">
                    <v-list-item router :to="{name: 'Profile'}" style="text-decoration:none;">
                         <v-list-item-icon><v-icon class="gray--text text--darken-2">mdi-account-details</v-icon></v-list-item-icon>
                         <v-list-item-title>
                            My Profile
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item router :to="{name: 'ChangePassword'}" style="text-decoration:none;">
                         <v-list-item-icon><v-icon class="gray--text text--darken-2">mdi-key</v-icon></v-list-item-icon>
                         <v-list-item-title>
                            Change Password
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item router :to="{name: 'ProfileSettings'}" style="text-decoration:none;">
                         <v-list-item-icon><v-icon class="red--text text--accent-2">mdi-account-cog</v-icon></v-list-item-icon>
                         <v-list-item-title>
                            Profile Settings
                        </v-list-item-title>
                    </v-list-item>
                    </v-list>
                 </v-card>
             </v-col>
             <v-col cols="12" sm="12" md="9">
                 <v-card flat class="rounded-lg">
                     <v-app-bar class="mb-2" :hidden="!$vuetify.breakpoint.smAndDown" flat>
                         <v-tabs color="orange" light>
                             <v-tab :to="{name: 'Profile'}" class="text-decoration-none">My Account</v-tab>
                             <v-tab :to="{name: 'ChangePassword'}" class="text-decoration-none">Change Password</v-tab>
                             <v-tab :to="{name: 'ProfileSettings'}" class="text-decoration-none">Profile Settings</v-tab>
                         </v-tabs>
                     </v-app-bar>
                     <v-card-title>Profile Settings</v-card-title>
                     <v-card-text>
                         <v-container>
                             <v-subheader class="red--text text--accent-2 font-weight-bold"><v-icon color="red" class="mr-1">mdi-alert</v-icon> Delete Account</v-subheader>
                                <v-card height="100" flat class="my-5">
                                    <div class="text-body-1">
                                    Are you sure delete this account?
                                    </div>
                                </v-card>
                         <v-card-actions>
                             <v-spacer></v-spacer>
                             <v-btn dark color="red accent-2" depressed>
                                 Delete
                             </v-btn>
                         </v-card-actions>
                         </v-container>
                     </v-card-text>
                 </v-card>
             </v-col>
             
         </v-row>
      </section>
      
      <Footer />
    </v-main>
    <BottomNavigation :hidden="!$vuetify.breakpoint.smAndDown"/>
  </v-app>
</template>

<script>
import Navigation from "../include/Navigation.vue";
import BottomNavigation from "../include/BottomNavigation.vue";
import Footer from "../include/Footer.vue";
export default {
  components: {
    Navigation,
    BottomNavigation,
    Footer,
  },
  data(){
    return {
      form: {
        first_name: this.$store.state.auth.user.first_name,

        last_name: this.$store.state.auth.user.last_name,

        address: this.$store.state.auth.user.details.city,

        city: this.$store.state.auth.user.details.city,

        province: this.$store.state.auth.user.details.province,

        zipcode: this.$store.state.auth.user.details.zipcode,
        
        phone_number: this.$store.state.auth.user.details.phone_number,
      },
      photo: null,
      img: null,
      errors: {}
    }
  },
  methods: {
      submit(){
        const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

            let formData = new FormData();
            formData.append('_method', 'PUT')
            formData.append('first_name', this.form.first_name)
            formData.append('last_name', this.form.last_name)
            formData.append('address', this.form.address)
            formData.append('city', this.form.city)
            formData.append('province', this.form.province)
            formData.append('zipcode', this.form.zipcode)
            formData.append('phone_number', this.form.phone_number)
            formData.append('photo', this.photo)

            axios.post("/api/update-user", formData, config).then( () => {
                this.$store.dispatch('auth/user');
                this.$toasted.show(response.data, {
                    type: 'success',
                    duration: '2000'
                });
            }).catch(errors => {
                errors.response.data.errors;
                this.$toasted.show("Some Error Occured", {
                    type: 'danger',
                    duration: '2000'
                });
            })
        }
  }
};
</script>