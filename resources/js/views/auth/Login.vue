<template>
  <v-app>
   <v-main>
     <v-container class="fill-height" fluid>
     <v-row align="center" justify="center" dense>
         <v-col cols="12"  md="4" lg="4" xl="4">
           <v-card elevation="0" :loading="loading">
             <v-card-title class="justify-center text-center">
               <p class="title font-weight-bold">Sign In</p>
             </v-card-title>
             <a href="#" title="Login">
               <v-img src="/assets/admin/auth/Login.svg" alt="Login" contain height="200"></v-img>
             </a>
             <v-card-text>
               <v-form @submit.prevent="login">
                 <v-text-field label="Enter your email" color="orange" v-model="form.email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" :error-messages="errors.email" outlined></v-text-field>
                 <v-text-field label="Enter your password" color="orange" v-model="form.password" name="password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleClick" class="rounded-0" :error-messages="errors.password" outlined></v-text-field>
                 <v-btn class="grey--text subtitle-1 mb-3" text x-small style="text-transform: none; text-decoration: none;" :to="{name: 'ForgotPassword'}">Forgot Password?</v-btn>
                  <v-btn type="submit" class="text-h6" tile color="orange darken-3"  x-large block dark style="text-transform: none;">Login</v-btn>
                <v-card-actions class="text--secondary">
                  <v-row align="center" justify="center">
                    <v-col cols="12" class="mb-n3" lg="6"><v-checkbox  color="black" label="Remember me"></v-checkbox></v-col>
                    
                    <v-col cols="12" lg="6" class="text-center">
                      <span style=" margin: 0; padding: 0;">No account?</span>
                      <span><v-btn class="black--text subtitle-1" text  style="text-transform: none; text-decoration: none;" :to="{name: 'Register'}">Sign Up</v-btn></span>
                    </v-col>     
                  </v-row>
                </v-card-actions>
                 </v-form>
                 </v-card-text>
             <v-card-actions class="ml-6 mr-6 justify-center text-center">
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
  name: "Login",
  data(){
    return {
      showPassword: false,
      form: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false
    }
  },
  methods: {
    handleClick(){
      this.showPassword = !this.showPassword;
    },
    login(){
      this.loading = true
      this.$store.dispatch('auth/login', this.form)
      .then(() => { 
        this.loading = false
        location.reload();
      }).catch(errors => { 
        this.loading = false
          this.errors = errors.response.data.errors
          this.$toasted.show("Some Error Ocured", {
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