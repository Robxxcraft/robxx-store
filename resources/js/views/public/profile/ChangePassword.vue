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
                     <v-card-title>Change Password</v-card-title>
                     <v-card-text class="my-4">
                         <v-container>
                            <div class="col-md-12">
                                <v-text-field type="text" filled rounded class="rounded-0" color="orange" label="Current Password" v-model="form.current_password" :type="showCurrentPassword ? 'text' : 'password'" :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleShowCurrentPassword" :error-messages="errors.current_password"></v-text-field>
                            </div>
                            <div class="col-md-12">
                                <v-text-field type="text" filled rounded class="rounded-0" color="orange" label="New Password" v-model="form.password" :type="showNewPassword ? 'text' : 'password'" :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleShowNewPassword" :error-messages="errors.password"></v-text-field>
                            </div>
                            <div class="col-md-12">
                                <v-text-field type="text" filled rounded class="rounded-0" color="orange" label="Password Confirmation" v-model="form.password_confirmation" :error-messages="errors.password_confirmation" :type="showPasswordConfirmation ? 'text' : 'password'" :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleShowPasswordConfirmation"></v-text-field>
                            </div>
                     <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn depressed @click.prevent="submit" class="white--text orange darken-3" style="text-transform: none;" right>
                             Update
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
        current_password : '',
        password : '',
        password_confirmation : '',
      },
      showCurrentPassword : false,
      showNewPassword : false,
      showPasswordConfirmation : false,
      errors: {}
    }
  },
  methods: {
      handleShowCurrentPassword(){
          this.showCurrentPassword = !this.showCurrentPassword
      },
      handleShowNewPassword(){
          this.showNewPassword = !this.showNewPassword
      },
      handleShowPasswordConfirmation(){
          this.showPasswordConfirmation = !this.showPasswordConfirmation
      },
      submit(){
            let formData = new FormData();
            formData.append('_method', 'PUT')
            formData.append('current_password', this.form.current_password)
            formData.append('password', this.form.password)
            formData.append('password_confirmation', this.form.password_confirmation)
            
            axios.post("/api/change-password", formData).then(response => {
                this.$router.replace({name: 'Profile'})
                this.$toasted.show(response.data, {
                    type: 'success',
                    duration: '2000'
                });
            }).catch(errors => {
                this.errors = errors.response.data.errors;
                this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
            })
        }
  }
};
</script>