<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4">
                 <v-card flat class="rounded-lg">
                     <v-container>
                            <v-card-title class="justify-center font-weight-medium">About</v-card-title>
                            <v-card-subtitle></v-card-subtitle>
                        <v-card-text>
                            <section class="pb-8">
        <v-container class="rounded-a-lg">
          <v-card class="rounded-a-lg" flat>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-row justify="center">
                  <v-col cols="12" sm="5">
                    <h1 class="font-weight-light display-1">Contact</h1>
                    <h3 class="grey--text font-weight-light mt-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis, ducimus nam. Illo laudantium dolores sunt
                      architecto dolorem ipsam sed repudiandae sit aliquid iusto
                      ad commodi, natus cumque impedit dolore libero.
                    </h3>
                    <h3 class="font-weight-light mt-3">
                      Telephone: +62 xxx xxx xxx
                    </h3>
                    <h3 class="font-weight-light">Email: email@gmail.com</h3>
                  </v-col>
                  <v-col cols="12" sm="7">
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
                        filled
                        color="orange"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        filled
                        color="orange"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="textArea"
                        :rules="textAreaRules"
                        label="Message"
                        filled
                        color="orange"
                        required
                      ></v-textarea>
                      <v-btn
                        class="mt-3 white--text"
                        depressed
                        :disabled="!valid"
                        tile
                        color="orange"
                        block
                        @click="submit"
                        >Send</v-btn
                      >
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </section>
                        </v-card-text>
                     </v-container>
                 </v-card>
      </section>
      
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./include/Navigation.vue";
import Footer from "./include/Footer.vue";
export default {
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name required",
        (v) => (v && v.length >= 6) || "Name min 6",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Email required",
        (v) => /.+@.+\..+/.test(v) || "Email not valid",
      ],
      textArea: "",
      textAreaRules: [
        (v) => !!v || "Text required",
        (v) => (v && v.length >= 10) || "Text min 10",
      ],
      lazy: false,
    };
  },
  methods: {
      submit(){

      }
  }
};
</script>