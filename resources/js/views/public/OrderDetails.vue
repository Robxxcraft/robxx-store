<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <Navigation />
      <section class="mx-4 my-5">
        <v-card class="rounded-lg" flat>
            <v-card-title>Order Details</v-card-title>
          <v-card-text>
            <v-card flat>
              <v-app-bar flat height="60" color="grey lighten-4">
                    <div class="subtitle-2"><span class="grey--text text--darken-3 font-weight-bold text-h6">Overview</span><br><span class="orange--text text--darken-3 font-weight-thin ml-2">Order #001</span> </div>
                    <v-spacer></v-spacer>
                      <span class="font-weight-bold`">Okt 7, 2021</span>
                  </v-app-bar>
              <v-divider></v-divider>
                <v-container>
                  <v-list-item>
                    <v-list-item-avatar color="grey" size="80" tile>
                      <v-img contain height="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. A natus expedita, aliquid eius, accusamus amet aspernatur doloribus soluta, velit perferendis sint officiis commodi totam impedit? Ut dignissimos minima aut? Modi.
                      </v-list-item-title>

                      <v-list-item-subtitle>
                          Category - <span class="orange--text text--darken-3">oooo</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                          Quantity 
                          <span class="orange--text text--darken-3">
                            99
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar color="grey" size="80" tile>
                      <v-img contain height="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. A natus expedita, aliquid eius, accusamus amet aspernatur doloribus soluta, velit perferendis sint officiis commodi totam impedit? Ut dignissimos minima aut? Modi.
                      </v-list-item-title>

                      <v-list-item-subtitle>
                          Category - <span class="orange--text text--darken-3">oooo</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                          Quantity 
                          <span class="orange--text text--darken-3">
                            99
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar color="grey" size="80" tile>
                      <v-img contain height="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. A natus expedita, aliquid eius, accusamus amet aspernatur doloribus soluta, velit perferendis sint officiis commodi totam impedit? Ut dignissimos minima aut? Modi.
                      </v-list-item-title>

                      <v-list-item-subtitle>
                          Category - <span class="orange--text text--darken-3">oooo</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                          Quantity 
                          <span class="orange--text text--darken-3">
                            99
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                </v-container>
                <v-row>
                    <v-col md="4">
                      <div class="title">Payment With
                        <p class="caption grey--text text--accent-4"><b>$99</b></p>
                      </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col md="4">
                      <div class="title">Stock
                        <p class="caption grey--text text--accent-4"><b>100</b></p>
                      </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col md="4">
                      <div class="title">Date
                        <p class="caption grey--text text--accent-4"><b>Okt 9, 2021</b></p>
                      </div>
                    </v-col>
                  </v-row>
            </v-card>
          </v-card-text>
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
}
</script>