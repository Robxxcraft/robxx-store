<template>
    <v-card flat>
          <v-container>
                    <v-card-title>
                        Edit Profile
                    </v-card-title>
                    <v-card-subtitle>
                        <v-divider></v-divider>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="justify-center text-center my-5">                                 
                            <v-avatar color="grey lighten-4" width="100px" height="100px">
                                <v-img :src="img" contain></v-img>
                            </v-avatar>
                            <v-btn fab class="mt-16 ml-n5" style="position: absolute;" x-small dark color="orange">
                                <v-container>
                                    <v-file-input hide-input class="mt-n3 mr-n2" v-model="form.photo" prepend-icon="mdi-pencil"></v-file-input>
                                </v-container>
                            </v-btn>
                        </div>
                         <v-container>
                             <div class="my-4">
                             <v-row wrap>
                             <v-col md="6" lg="6" xl="6" cols="12">
                                 <v-text-field type="text" label="First Name" :error-messages="errors.first_name" filled rounded class="rounded-0" color="orange" v-model="form.first_name"></v-text-field>
                             </v-col>
                             <v-col md="6" lg="6" xl="6" cols="12">
                                 <v-text-field type="text" label="Last Name" filled rounded class="rounded-0" color="orange" v-model="form.last_name"></v-text-field>
                             </v-col>
                                <v-col md="12">
                                 <v-textarea label="Address" filled rounded class="rounded-0" color="orange" v-model="form.address"></v-textarea>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field type="text" label="City" filled rounded class="rounded-0" color="orange" v-model="form.city"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field type="text" label="Province" filled rounded class="rounded-0" color="orange" v-model="form.province"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field type="text" label="Zipcode" filled rounded class="rounded-0" color="orange" v-model="form.zipcode"></v-text-field>
                             </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                 <v-text-field type="text" label="Phone Number" :error-messages="errors.phone_number" filled rounded class="rounded-0" color="orange" v-model="form.phone_number"></v-text-field>
                             </v-col>
                            </v-row>
                         </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn depressed @click.prevent="updateUser" class="white--text orange darken-3" style="text-transform: none;" right>
                                Update
                            </v-btn>
                        </v-card-actions>
                         </v-container>
                     </v-card-text>
          </v-container>
    </v-card>
      
   
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      photo: null,
      form: {
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        province: '',
        zipcode: '',
        phone_number: '',
        photo: null
      },
      errors: {},
    }
  },
  mounted(){
       axios.get(`/api/admin-user-edit/${this.$route.params.id}`).then(res => {
           const details = res.data.details
            this.form.first_name = res.data.first_name;
            this.form.last_name = res.data.last_name;
            if (details) {
                this.form.address = details.address;
                this.form.city = details.city;
                this.form.province = details.province;
                this.form.zipcode = details.zipcode;
                this.photo = details.photo;
            }
       })
  },
  computed: {
      img(){
            if (this.form.photo != null) {
                return URL.createObjectURL(this.form.photo);
            }

            return `/user/photo/${this.photo}`;
        }
  },
  methods: {
      updateUser(){
            this.errors = {}
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
            formData.append('photo', this.form.photo)

            axios.post(`/api/admin-update-user/${this.$route.params.id}`, formData, config).then(response => {
                this.$router.push({name: 'ManageUsers'});
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