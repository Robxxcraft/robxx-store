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
               <v-form @submit.prevent="register">
                 <v-row>
                   <v-col cols="12" lg="6" md="6" sm="12">
                    <v-text-field label="Your First Name" color="lightgray" v-model="form.first_name" name="first_name" prepend-inner-icon="mdi-mail" type="text" class="rounded-0" outlined></v-text-field>
                   </v-col>
                   <v-col cols="12" lg="6" md="6" sm="12">
                    <v-text-field label="Your Last Name" color="lightgray" v-model="form.last_name" name="last_name" prepend-inner-icon="mdi-mail" type="text" class="rounded-0" outlined></v-text-field>
                   </v-col>
                 </v-row>
                 <v-text-field label="Your Email" color="lightgray" v-model="form.email" name="email" prepend-inner-icon="mdi-mail" type="email" class="rounded-0" outlined></v-text-field>
                 <v-text-field label="Your Password" color="lightgray" v-model="form.password" name="password" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="handleClick" class="rounded-0" outlined></v-text-field>
                 <v-btn type="submit" class="rounded-0" color="#000000" x-large block dark>Register</v-btn>
                <v-card-actions class="text--secondary">
                  <v-checkbox color="#000000" label="Remember me"></v-checkbox>
                  <v-spacer></v-spacer>
                  Already have an account? <router-link :to="{name: 'Login'}" class="pl-2" style="color: #000000;"> Sign In</router-link>
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
export default {
  name: "Register",

  data() {
    return {
      showPassword: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      errors: {}
    };
  },

  methods: {

    handleClick(){
      this.showPassword = !this.showPassword;
    },

    async register() {

      await axios.get("/sanctum/csrf-cookie").then(() => {
        axios
        .post("/api/register", this.form)
        .then(response => {
          if (response.data.status) {
            this.$router.push({name: 'Login'})
          }
        }).catch(errors => { 
          console.log(errors.response.data.errors) 
        })
      })
    },
  },
};
</script>
