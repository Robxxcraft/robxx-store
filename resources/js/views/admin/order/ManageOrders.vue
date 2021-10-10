<template>
 <v-card>
    <v-card-title>
      Orders
    </v-card-title>
    <v-card-actions class="mb-3">
      <v-spacer></v-spacer>
      <v-text-field filled rounded
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mx-2 rounded-0"
        color="orange"
      ></v-text-field>
      <v-btn fab text><v-icon  class="mx-2">mdi-dots-vertical</v-icon></v-btn>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getOrders"
      :search="search"
    >
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}" style="width:800px;">
        <v-btn small depressed class="blue accent-2 white--text ma-1 text-decoration-none" title="Order Details" router :to="{name: 'EditCategory', params: {id: item.id}}"><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteCategory(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      search: '',
        headers: [
          { text: '#', align: 'start', value: 'id'},
          { text: 'Status', value: 'order_status' },
          { text: 'Total Quantity', value: 'total_quantity' },
          { text: 'Total Amount', value: 'total_amount' },
          { text: 'Payment', value: 'payment' },
          { text: 'User', value: 'user_id' },
          { text: 'Date', value: 'date' , sortable: false},
          { text: 'Actions', value: 'action', sortable: false},
        ]
    }
  },
  mounted(){
    this.$store.dispatch('order/getOrders');
  },
  computed: {
      getOrders(){
        return this.$store.state.order.orders
      }
  },
  methods: {
    deleteOrder(id){
      this.$store.dispatch('order/deleteOrder', id)
    }
  }
}
</script>

<style>

</style>