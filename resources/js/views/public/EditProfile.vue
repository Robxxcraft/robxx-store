<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4">
         <v-card class="rounded-lg" flat>
             <v-container>
                 <v-card-title>Edit Profile</v-card-title>
             <v-card-text>
                 
                 <v-row wrap>
                  <v-col md="6" sm="12">
                    <v-text-field
                    label="First Name"
                    filled
                    rounded
                    color="orange"
                    v-model="form.first_name"
                  ></v-text-field>
                  </v-col>
                  <v-col md="6" sm="12"><v-text-field
                    label="Last Name"
                    filled
                    rounded
                    color="orange"
                    v-model="form.last_name"
                  ></v-text-field></v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea filled rounded label="Address" color="orange" v-model="form.address">
                    </v-textarea>
                    <v-text-field
                    label="City"
                    filled
                    rounded
                    color="orange"
                    v-model="form.city"
                  ></v-text-field>
                  <v-text-field
                    label="Province"
                    filled
                    rounded
                    color="orange"
                    v-model="form.province"
                  ></v-text-field>
                  <v-text-field
                    label="Zipcode"
                    filled
                    rounded
                    color="orange"
                    v-model="form.zipcode"
                  ></v-text-field>
                  <v-text-field
                    label="Phone Number"
                    filled
                    rounded
                    color="orange"
                    v-model="form.phone_number"
                  ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col md="4">
                        <v-file-input  accept="image/png, image/jpg, image/jpeg"  prepend-icon="mdi-camera" label="Photo" @change="onImageUpload" filled hint="Enter Photo Product"></v-file-input>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col md="4">
                        <v-img :src="img"></v-img>
                    </v-col>
                </v-row>
             </v-card-text>
             <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn class="white--text font-weight-light" color="orange" @click.prevent="submit" depressed>Update</v-btn>
             </v-card-actions>
             </v-container>
         </v-card>
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
      img: null
    }
  },
  methods: {
      onImageUpload(files){
            this.img = URL.createObjectURL(files)
            this.photo = files
      },
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

            axios.post("/api/update-user", formData, config).then(async () => {
               await this.$store.dispatch('auth/user')
               this.$router.replace({name: 'Profile'})
                
            }).catch((error) => {
                console.log(error)
            })
      }
  }
};
</script>