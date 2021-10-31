<template>
 <v-card flat>
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
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getOrders"
      :search="search"
    >
    <template v-slot:[`item.total_amount`]="{item}">
    <span class="font-weight-bold">${{item.total_amount}}</span>
    </template>
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}" style="width:800px;">
        <v-btn small v-if="item.payment == 'Midtrans' && item.order_status == 'Pending'" depressed class="green accent-2 white--text ma-1 text-decoration-none" title="Accept Order" @click.prevent="accept(item.id)"><v-icon>mdi-check</v-icon></v-btn>
        <v-btn small depressed class="blue accent-2 white--text ma-1 text-decoration-none" title="Order Details" :to="{name : 'ShowOrder', params: {id : item.id}}"><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteOrder(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
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
          { text: 'User', value: 'user.first_name' },
          { text: 'Date', value: 'date' , sortable: false},
          { text: 'Actions', value: 'action', sortable: false},
        ]
    }
  },
  mounted(){
    this.$store.dispatch('order/getAdminOrders');
  },
  computed: {
      getOrders(){
        return this.$store.state.order.admin_orders
      },
  },
  methods: {
    accept(id){
      axios.post(`/api/midtrans/${id}`).then(() => {
        this.$store.commit("order/PAYMENT_ACCEPTED", id);
        this.$toasted.show("Order Accepted", {
          type: 'success',
          duration: '2000'
        });
      }).catch(() => {
        this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
          })
    },
    deleteOrder(id){
      axios.get(`/api/orders/${id}/delete`).then(res => {
        this.$store.commit("order/DELETE_ADMIN_ORDER", id);
        this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
      }).catch(() => {
        this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
          })
    }
  }
}
</script>

<style>

</style>