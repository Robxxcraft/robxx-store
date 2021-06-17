<template>
  <v-app>
   <v-main>
     <v-container class="fill-height" fluid>
       <v-row align="center" justify="center" dense>
         <v-col cols="12" sm="8" md="4" lg="4">
           <v-card elevation="0">
             <a href="#" name="Fedorae Education" title="Fedorae Education" target="_blank">
               <v-img src="/assets/images/logo.png" alt="Fedoration Education Log" contain height="200"></v-img>
             </a>
             <v-card-text>
               <v-form @submit.prevent="login">
                 <v-text-field label="Enter your email" color="lightgray" v-model="form.email" name="email" prepend-inner-icon="mdi-mail" type="email" class="rounded-0" outlined></v-text-field>
                 <v-text-field label="Enter your password" color="lightgray" v-model="form.password" name="password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleClick" class="rounded-0" outlined></v-text-field>
                <v-btn type="submit" class="rounded-0" color="#000000" x-large block dark>Login</v-btn>
                <v-card-actions class="text--secondary">
                  <v-checkbox color="#000000" label="Remember me"></v-checkbox>
                  <v-spacer></v-spacer>
                  No Account? <router-link :to="{name: 'Register'}" class="pl-2" style="color: #000000;"> Sign Up</router-link>
                </v-card-actions>
               </v-form>
             </v-card-text>
             <v-card-actions class="ml-6 mr-6 text-center">
               <p>By continuing, you agree to Fedorae Education's<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" style="color: #000000;">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
     </v-container>
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

      await this.$router.replace({name: 'Admin'})
    }
  }
};
</script>

<style>
  .v-text-field--outlined fieldset {
    color: lightgray !important;
  }
</style>