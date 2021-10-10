<template>
  <v-app>
   <v-main>
     <v-row align="center" justify="center">
         <v-col cols="12" sm="12" md="4" lg="4">
           <v-card elevation="0">
             <v-card-title class="justify-center text-center">
               <p class="title font-weight-bold">Reset Password</p>
             </v-card-title>
             <a href="#" title="Register">
               <v-img src="/assets/admin/auth/Forgot.svg" alt="Register" contain height="200"></v-img>
             </a>
             <v-card-text>
               <v-form @submit.prevent="forgot">
                 <v-text-field label="Enter your email" color="orange" v-model="form.email" name="email" prepend-inner-icon="mdi-mail" type="email" class="rounded-0" :error-messages="errors.email" outlined></v-text-field>
                 <v-btn type="submit" class="rounded-0" color="orange darken-2" x-large block dark>Reset Password</v-btn>
               </v-form>
             </v-card-text>
             <v-card-actions class="text--secondary pa-5 justify-center text-center">
                Already have an account? <router-link :to="{name: 'Login'}" class="pl-2" style="color: #000000;"> Sign In</router-link>
             </v-card-actions>
             <v-card-actions class="mx-6 justify-center text-center">
               <p>By continuing, you agree to RobxxStore<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" class="black--text">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
   </v-main>
  </v-app>
</template>

<script>
export default {
  name: "ResetPassword",
  data(){
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        token: this.$route.params.token,
      },
      snackbar: false,
      snackbarColor: null,
      message: null,
      errors: {}
    }
  },
  methods: {
    forgot(){
      axios.post('/api/reset-password', this.form)
      .then(res => {  
      
      }).catch(errors => {
       this.message = "Some Error Occured"
       this.snackbarColor = 'red accent-2'
       this.snackbar = true
       this.error = null
       this.errors = errors.response.data.errors
      })
    }
  }
};
</script>

<style>
  .v-text-field--outlined fieldset {
    color: lightgray !important;
  }
</style>