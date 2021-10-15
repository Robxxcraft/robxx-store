<template>
    <v-bottom-navigation value="1" color="orange" fixed>
      <v-btn router :to="{name: 'Home'}" class="text-decoration-none">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'AllCategories'}" class="text-decoration-none">
        <span>Categories</span>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'AllProducts'}" class="text-decoration-none">
        <span>Products</span>
        <v-icon>mdi-warehouse</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'Profile'}" class="text-decoration-none">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    
}
</script>