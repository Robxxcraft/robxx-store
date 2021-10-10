<template>
  <v-app>
   <v-main>
     <v-row align="center" justify="center">
         <v-col cols="12" sm="12" md="4" lg="4">
           <v-card elevation="0">
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
                 <v-btn type="submit" class="rounded-0 text-h6" color="orange darken-3" x-large block dark style="text-transform: none;">Login</v-btn>
                 <v-btn class="mt-5 black--text subtitle-1" text small style="text-transform: none; text-decoration: none;" :to="{name: 'ForgotPassword'}">Forgot Password?</v-btn>
                 </v-form>
                 </v-card-text>
                <v-card-actions class="text--secondary pa-5">
                      <v-checkbox color="black" label="Remember me"></v-checkbox>
                      <v-spacer></v-spacer>
                      No Account? <router-link :to="{name: 'Register'}" class="pl-2" style="color: #000000; text-decoration: none;"> Sign Up</router-link>
                </v-card-actions>
             <v-card-actions class="ml-6 mr-6 justify-center text-center">
               <p>By continuing, you agree to RobxxStore<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" class="black--text">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
       <v-snackbar v-model="snackbar" top right absolute :color="snackbarColor" :timeout="-1">
          {{message}}
        </v-snackbar>
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
      errors: {}
    }
  },
  methods: {
    handleClick(){
      this.showPassword = !this.showPassword;
    },
    login(){
      this.$store.dispatch('auth/login', this.form)
      .then(() => { 
        location.reload().then(()=>{ 
        this.$router.replace({name: 'Home'}) })
      }).catch(errors => { 
          this.errors = errors.response.data.errors
          this.message = "Some Error Occurred"
          this.snackbarColor = 'red accent-2'
        }).finally(()=>{ setTimeout(()=>{ this.snackbar = false  }, 3000)})
    }
  }
};
</script>

<style>
  .v-text-field--outlined fieldset {
    color: lightgray !important;
  }
</style>