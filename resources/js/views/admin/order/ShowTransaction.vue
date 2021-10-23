<template>
 <v-card flat>
     <v-btn @click="$router.go(-1)" class="rounded-lg mt-2 ml-2" elevation="3"><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
    <v-card-title>
      Transaction Details - {{getTransaction.order_token}}
      <v-spacer></v-spacer>
      <span class="subtitle-2 grey--text">{{getTransaction.created_at | timeformat}}</span>
    </v-card-title>
   <v-card-text>
      <v-row class="my-5">
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Payment With</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">{{getTransaction.payment}}</span>
        </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4" xl="4">
        <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Total Quantity</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">{{getTransaction.total_quantity}}</span>
        </v-card-text>
      </v-card>
      </v-col>
       <v-col cols="12" md="4" lg="4" xl="4">
         <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Total Amount</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">${{getTransaction.total_amount}}</span>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-list>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-email</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Email
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getTransaction.email}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Username
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getTransaction.username}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-phone</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Phone Number
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        +{{getTransaction.phone_number}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-map-marker</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Address
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getTransaction.address}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('transaction/getAdminShowTransaction', this.$route.params.id);
  },
  computed: {
      getTransaction(){
        return this.$store.state.transaction.transaction
      }
  },
}
</script>