<template>
    <v-footer dark padless>
        <v-card flat tile dark class="orange darken-3">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" lg="4" xl="4">
                <v-subheader class="text-h5 white--text font-weight-bold">RobxxStore</v-subheader>
                <v-container>
                  <p class="white--text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim corporis in eius, laboriosam accusantium doloribus. Magni eum tenetur accusantium, fugit nam eius velit, placeat, cum tempora esse exercitationem dolorem minima?</p>
                </v-container>
            <v-btn class="mx-4" href="https://www.facebook.com/robbie.chandra.18" icon><v-icon size="24px">mdi-facebook</v-icon></v-btn>
            <v-btn class="mx-4" href="https://wa.me/robbie.chandra.18" icon><v-icon size="24px">mdi-whatsapp</v-icon></v-btn>
            <v-btn class="mx-4" href="https://www.facebook.com/robbie.chandra.18" icon><v-icon size="24px">mdi-instagram</v-icon></v-btn>
            <v-btn class="mx-4" href="https://www.facebook.com/robbie.chandra.18" icon><v-icon size="24px">mdi-telegram</v-icon></v-btn>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4">
              <v-list color="rgba(0,0,0,0)">

                <v-subheader class="subtitle-1 white--text font-weight-bold">Links</v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">About Us</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">Customer Services</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">FAQ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">Report</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-list color="rgba(0,0,0,0)">
                <v-subheader class="subtitle-1 white--text font-weight-bold">Address</v-subheader>
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-google-maps</v-icon></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="white--text subtitle-2">
                      Taman Rahayu Regensi II A8/NO15 
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text subtitle-2">
                      Bekasi, West Java, Indonesia
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text text-center">
            {{new Date().getFullYear()}} - <strong>Vuetify</strong>
          </v-card-text>
        </v-card>
      </v-footer>
</template>