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
                 <v-text-field label="Enter your email" color="orange" v-model="form.email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" :error-messages="errors.email" outlined></v-text-field>
                 <v-text-field label="Your New Password" color="orange" v-model="form.password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordHandle" class="rounded-0" :error-messages="errors.password" outlined></v-text-field>
                 <v-text-field label="Your New Password Confirmation" color="orange" v-model="form.password_confirmation" prepend-inner-icon="mdi-lock" :type="showPasswordConfirmation ? 'text' : 'password'" :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordConfirmationHandle" class="rounded-0" :error-messages="errors.password_confirmation" outlined></v-text-field>
                 <v-btn type="submit" class="text-h6" tile color="orange darken-2" x-large block dark style="text-transform: none;">Reset Password</v-btn>
               </v-form>
             </v-card-text>
             <v-card-actions class="text--secondary pa-5 justify-center text-center">
                Already have an account? <router-link :to="{name: 'Login'}" class="pl-2" style="color: #000000; text-decoration:none;"> Sign In</router-link>
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
      showPassword: false,
      showPasswordConfirmation: false,
      errors: {}
    }
  },
  methods: {
    showPasswordHandle(){
      this.showPassword = !this.showPassword;
    },

    showPasswordConfirmationHandle(){
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    },

    forgot(){
      axios.post('/api/reset-password', this.form)
      .then(res => {  
        this.$router.replace({name: 'Login'});
        this.$toasted.show(res.data.success, {
                    type: 'success',
                    duration: '2000'
                })
      }).catch((res, errors) => {
       this.errors = errors.response.data.errors
       this.$toasted.show(res.data.message, {
                    type: 'error',
                    duration: '2000'
                })
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