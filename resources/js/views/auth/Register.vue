<template>
  <v-app>
      <v-main>
     <v-container class="fill-height" fluid>
       <v-row align="center" justify="center" dense>
         <v-col cols="12" sm="8" md="4" lg="4">
           <v-card elevation="0">
             <v-card-title class="justify-center text-center">
               <p class="title font-weight-bold">Sign Up</p>
             </v-card-title>
             <a href="#" title="Register">
               <v-img src="/assets/admin/auth/Register.svg" alt="Register" contain height="200"></v-img>
             </a>
             <v-card-text>
               <v-form @submit.prevent="register">
                 <v-row>
                   <v-col cols="12" xl="6" lg="6" md="6" sm="12">
                    <v-text-field label="Your First Name" color="orange" v-model="form.first_name" name="first_name" prepend-inner-icon="mdi-email" type="text" class="rounded-0 mb-n5" :error-messages="errors.first_name" outlined></v-text-field>
                   </v-col>
                   <v-col cols="12" xl="6" lg="6" md="6" sm="12">
                    <v-text-field label="Your Last Name" color="orange" v-model="form.last_name" name="last_name" prepend-inner-icon="mdi-email" type="text" class="rounded-0" :error-messages="errors.last_name" outlined></v-text-field>
                   </v-col>
                 </v-row>
                  <v-text-field label="Your Email" color="orange" v-model="form.email" prepend-inner-icon="mdi-mail" type="email" class="rounded-0" :error-messages="errors.email" outlined></v-text-field>
                 <v-text-field label="Your Password" color="orange" v-model="form.password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordHandle" class="rounded-0" :error-messages="errors.password" outlined></v-text-field>
                 <v-text-field label="Your Password Confirmation" color="orange" v-model="form.password_confirmation" prepend-inner-icon="mdi-lock" :type="showPasswordConfirmation ? 'text' : 'password'" :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswordConfirmationHandle" class="rounded-0" :error-messages="errors.password_confirmation" outlined></v-text-field>
                 <v-btn type="submit" class="rounded-0" color="orange darken-2" x-large block dark>Register</v-btn>
                <v-card-actions class="text--secondary">
                  <v-checkbox color="black" label="Remember me"></v-checkbox>
                  <v-spacer></v-spacer>
                  Already have an account? <router-link :to="{name: 'Login'}" class="pl-2" style="color: #000000; text-decoration: none;" > Sign In</router-link>
                </v-card-actions>
               </v-form>
             </v-card-text>
             <v-card-actions class="ml-6 mr-6 text-center">
               <p>By continuing, you agree to Fedorae Education's<br><b><a href="#" style="color: #000000;">Policy</a></b> and <b><a href="#" style="color: #000000;">Term of use</a></b></p>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row>
       <v-snackbar v-model="snackbar" top right absolute :color="snackbarColor" :timeout="-1">
          {{message}}
        </v-snackbar>
     </v-container>
   </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      showPassword: false,
      showPasswordConfirmation: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      snackbar: false,
      snackbarColor: null,
      message: null,
      errors: {},
    };
  },

  methods: {
    showPasswordHandle(){
      this.showPassword = !this.showPassword;
    },

    showPasswordConfirmationHandle(){
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    },

    register() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
        .post("/api/register", this.form)
        .then(response => {
          if (response.data.status) {
            this.message = "Register Successfully"
            this.snackbarColor = 'green accent-4'
            this.snackbar = true
            this.$router.push({name: 'Login'})
          }
        }).catch(errors => { 
          this.errors = errors.response.data.errors
          this.message = "Some Error Occurred"
          this.snackbarColor = 'red accent-2'
        }).finally(()=>{ setTimeout(()=>{ this.snackbar = false  }, 3000)})
      })
    },
  },
};
</script>
