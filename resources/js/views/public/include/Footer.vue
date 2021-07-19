<template>
    <v-footer dark padless>
        <v-card flat tile class="orange lighten-2 white--text text-center">
          <v-card-text>
            <v-btn class="mx-4 white--text" icon><v-icon size="24px">mdi-facebook</v-icon></v-btn>
            <v-btn class="mx-4 white--text" icon><v-icon size="24px">mdi-twitter</v-icon></v-btn>
            <v-btn class="mx-4 white--text" icon><v-icon size="24px">mdi-instagram</v-icon></v-btn>
          </v-card-text>
          <v-card-text class="white--text pt-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit ut inventore autem aliquid? Ipsa adipisci vero aut ad. Ab necessitatibus quos molestiae cumque. Ipsam, corporis. Laudantium architecto tempore quos ullam?</v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text">
            {{new Date().getFullYear()}} - <strong>Vuetify</strong>
          </v-card-text>
        </v-card>
      </v-footer>
</template>