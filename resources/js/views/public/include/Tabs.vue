<template>
    <v-card>
          <v-tabs color="amber">
              <v-tab  style="text-decoration: none">Home</v-tab>
              <v-tab router to="/categories" style="text-decoration: none">Categories</v-tab>
              <v-tab router to="/products" style="text-decoration: none">Product</v-tab>
              <v-spacer></v-spacer>
              <v-btn>
                  <v-icon>mdi-cart</v-icon>
              </v-btn>
          </v-tabs>
      </v-card>
</template>