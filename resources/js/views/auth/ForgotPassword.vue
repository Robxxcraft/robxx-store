<template>
  <v-app>
   <v-main>
     <v-row align="center" justify="center">
         <v-col cols="12" sm="12" md="4" lg="4">
           <v-card elevation="0">
             <a href="#" name="Fedorae Education" title="Fedorae Education" target="_blank">
               <v-img src="/assets/images/logo.png" alt="Fedoration Education Log" contain height="200"></v-img>
             </a>
             <v-card-title>Forgot Password</v-card-title>
             <v-card-text>
               <v-form @submit.prevent="login">
                 <v-text-field label="Enter your email" color="lightgray" v-model="form.email" name="email" prepend-inner-icon="mdi-mail" type="email" class="rounded-0" outlined></v-text-field>
                 <v-btn type="submit" class="rounded-0" color="black" x-large block dark>Reset Password</v-btn>
               </v-form>
             </v-card-text>
             <v-card-actions class="text--secondary pa-5">
                <v-spacer></v-spacer>
                Already have an account? <router-link :to="{name: 'Login'}" class="pl-2" style="color: #000000;"> Sign In</router-link>
             </v-card-actions>
             <v-card-actions class="ml-6 mr-6 text-center">
               <p>By continuing, you agree to RobxxStore<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" class="black--text">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
   </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data(){
    return {
      showPassword: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleClick(){
      this.showPassword = !this.showPassword;
    },
    ...mapActions({
      doLogin: 'auth/login'
    }),
    async login(){
      await this.doLogin(this.form);

      await this.$router.replace({name: 'DashboardAdmin'})
    }
  }
};
</script>

<style>
  .v-text-field--outlined fieldset {
    color: lightgray !important;
  }
</style>