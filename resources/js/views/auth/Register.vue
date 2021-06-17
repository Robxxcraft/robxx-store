<template>
  <v-app>
      
  </v-app>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {}
    };
  },

  methods: {

    async submit() {

      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
        .post("/api/register", this.form)
        .then(response => {
          console.log(response.data)
        }).catch(errors => { 
          console.log(errors.response.data.errors) 
        })
      })
      
    },
  },
};
</script>
