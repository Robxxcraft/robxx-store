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
                     <v-card-title><span class="grey--text text--darken-1">
                Edit Profile</span></v-card-title>
                     <v-card-text>
                         <div class="justify-center text-center my-5">
                             <v-badge color="orange accent-2" bottom bordered>
                                 <v-avatar width="100px" height="100px">
                                    <img src="#" alt="" />
                                 </v-avatar>
                             </v-badge>
                             <div class="mt-6 mb-2 title font-weight-bold">
                                 {{email}}
                             </div>
                             <div class="text-body-1">
                                 Joined at {{date | timeformat}}
                             </div>
                         </div>
                         <v-container>
                             <div class="my-4">
                             <v-row wrap>
                             <v-col md="6" sm="12">
                                 <v-text-field :append-icon="form.first_name && form.first_name != 'null' ? 'mdi-check-circle-outline':''" type="text" label="First Name" filled rounded class="rounded-0" color="orange" v-model="form.first_name"></v-text-field>
                             </v-col>
                             <v-col md="6" sm="12">
                                 <v-text-field :append-icon="form.last_name && form.last_name != 'null' ? 'mdi-check-circle-outline':''" type="text" label="Last Name" filled rounded class="rounded-0" color="orange" v-model="form.last_name"></v-text-field>
                             </v-col>
                             
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-textarea :append-icon="form.address && form.address != 'null' ? 'mdi-check-circle-outline':''" label="Address" filled rounded class="rounded-0" color="orange" v-model="form.address"></v-textarea>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field :append-icon="form.city && form.city != 'null' ? 'mdi-check-circle-outline':''" type="text" label="City" filled rounded class="rounded-0" color="orange" v-model="form.city"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field :append-icon="form.province && form.province != 'null' ? 'mdi-check-circle-outline':''" type="text" label="Province" filled rounded class="rounded-0" color="orange" v-model="form.province"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field :append-icon="form.zipcode && form.zipcode != 'null' ? 'mdi-check-circle-outline':''" type="text" label="Zipcode" filled rounded class="rounded-0" color="orange" v-model="form.zipcode"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field :append-icon="form.phone_number && form.phone_number != 'null' ? 'mdi-check-circle-outline':''" type="text" label="Phone Number" filled rounded class="rounded-0" color="orange" v-model="form.phone_number"></v-text-field>
                             </v-col>
                            </v-row>
                         </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn depressed @click.prevent="submit" class="white--text orange darken-2" right>
                                Save
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
  </v-app>
</template>

<script>
import Navigation from "../include/Navigation.vue";
import Footer from "../include/Footer";
export default {
  components: {
    Navigation,
    Footer,
  },
  data(){
    return {
      email: this.$store.state.auth.user.email,
      date: this.$store.state.auth.user.created_at,
      form: {
        first_name: this.$store.state.auth.user.first_name,

        last_name: this.$store.state.auth.user.last_name,

        address: this.$store.state.auth.user.details ?  this.$store.state.auth.user.details.address : '',

        city: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.city : '',

        province: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.province : '',

        zipcode: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.zipcode : '',
        
        phone_number: this.$store.state.auth.user.details ? this.$store.state.auth.user.details.phone_number : '',
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

            axios.post("/api/update-user", formData, config).then(response => {
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