<template>
 <v-card flat>
    <v-card-title>
      Transactions
    </v-card-title>
    <v-card-actions>
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
      :items="getTransactions"
      :search="search"
    >
    <template v-slot:[`item.total_amount`]="{item}">
    <span class="font-weight-bold">${{item.total_amount}}</span>
    </template>
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
      <v-btn small depressed class="blue accent-2 white--text ma-1 text-decoration-none" title="Transaction Details" :to="{name : 'ShowTransaction', params: {id : item.id}}"><v-icon>mdi-eye</v-icon></v-btn>
      <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteTrasaction(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
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
          { text: 'Token', value: 'order_token' },
          { text: 'Total Quantity', value: 'total_quantity' },
          { text: 'Total Amount', value: 'total_amount' },
          { text: 'Payment', value: 'payment' },
          // { text: 'Email', value: 'email' },
          // { text: 'Username', value: 'username' },
          // { text: 'Phone number', value: 'phone_number'},
          // { text: 'Address', value: 'address'},
          { text: 'Date', value: 'date' , sortable: false},
          { text: 'Actions', value: 'action', sortable: false},
        ]
    }
  },
  mounted(){
    this.$store.dispatch('transaction/getTransactions');
  },
  computed: {
      getTransactions(){
        return this.$store.state.transaction.transactions
      }
  },
  methods: {
    deleteTrasaction(id){
      axios.delete(`/api/transactions/${id}`).then(res => {
        commit('DELETE_TRANSACTION', id)
        this.$toasted.show(res.data, {
          type: 'success',
          duration: '2000'
        });
    }).catch(errors => {
      console.log(errors)
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