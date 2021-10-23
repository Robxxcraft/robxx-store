<template>
    <v-bottom-navigation value="1" color="orange" fixed>
      <v-btn router :to="{name: 'Home'}" class="text-decoration-none">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'AllProducts'}" class="text-decoration-none">
        <span>Products</span>
        <v-icon>mdi-warehouse</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'Cart'}" class="text-decoration-none">
        <span>Cart</span>
         <template v-if="authenticated">
            <v-badge :content="cartItemCount != 0 ? cartItemCount : '0'" color="orange darken-2">
            <v-icon>mdi-cart</v-icon>
            </v-badge>
          </template>
          <template v-else>
            <v-icon>mdi-cart</v-icon>
          </template>
      </v-btn>

      <v-btn depressed :to="{name: 'Orders'}" class="text-decoration-none">
        <span>Orders</span>
        <v-icon>mdi-truck</v-icon>
      </v-btn>

      <v-btn depressed :to="{name: 'Profile'}" class="text-decoration-none">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
  mounted(){
    if (this.$store.getters['auth/authenticated']) {
      this.$store.dispatch("cart/getCartItems");
    }
  },
    computed: {
      cartItemCount() {
        return this.$store.getters["cart/cartItemCount"];
      },
      authenticated(){
        return this.$store.getters["auth/authenticated"];
      },
    },
    methods: {

    }
}
</script>