<template>
  <v-app>
   <v-main>
     <v-container class="fill-height" fluid>
     <v-row align="center" justify="center" dense>
         <v-col cols="12"  md="4" lg="4" xl="4">
           <v-card elevation="0">
             <v-card-title class="justify-center text-center">
               <p class="title font-weight-bold">Reset Password</p>
             </v-card-title>
               <v-img src="/assets/admin/auth/Forgot.svg" alt="Register" contain height="200"></v-img>
             <v-card-text>
               <v-form @submit.prevent="forgot">
                 <v-text-field label="Enter your email" color="orange" v-model="form.email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" :error-messages="errors.email" outlined></v-text-field>
                 <v-text-field label="Your New Password" color="orange" v-model="form.password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordHandle" class="rounded-0" :error-messages="errors.password" outlined></v-text-field>
                 <v-text-field label="Your New Password Confirmation" color="orange" v-model="form.password_confirmation" prepend-inner-icon="mdi-lock" :type="showPasswordConfirmation ? 'text' : 'password'" :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordConfirmationHandle" class="rounded-0" :error-messages="errors.password_confirmation" outlined></v-text-field>
                 <v-btn type="submit" :disabled="loading" class="white--text text-h6 font-weight-bold" tile color="orange darken-3" x-large block style="text-transform: none;">Reset Password</v-btn>
               </v-form>
             </v-card-text>
             <v-card-actions class="text--secondary pa-5 justify-center text-center">
                <span style=" margin: 0; padding: 0;">Already have an account?</span>
                <span><v-btn class="black--text subtitle-1" text :disabled="loading" style="text-transform: none; text-decoration: none;" :to="{name: 'Login'}">Sign In</v-btn></span>
             </v-card-actions>
             <v-card-actions class="mx-6 justify-center text-center">
               <p>By continuing, you agree to RobxxStore<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" class="black--text">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
     </v-container>
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
      errors: {},
      loading: false
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
      this.loading = true
      axios.post('/api/reset-password', this.form)
      .then(res => {  
        this.loading = false
        this.$router.replace({name: 'Login'});
        this.$toasted.show(res.data.success, {
                    type: 'success',
                    duration: '2000'
                })
      }).catch((res, errors) => {
        this.loading = false
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