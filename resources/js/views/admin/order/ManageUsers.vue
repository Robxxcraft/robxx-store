<template>
 <v-card>
    <v-card-title>
      Users
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mx-2"
      ></v-text-field>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getUsers"
      :search="search"
    >
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
        <v-btn small depressed class="blue accent-2 white--text ma-1" router :to="{name: 'DetailUser', params: {id: item.id}}">Details</v-btn>
        <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteUser(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
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
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Email', value: 'email' },
          // { text: 'Address', value: 'details.address' },
          // { text: 'City', value: 'details.city' },
          // { text: 'Province', value: 'details.province' },
          // { text: 'Zipcode', value: 'details.zipcode' },
          // { text: 'Phone Number', value: 'details.phone_number' },
          // { text: 'Photo', value: 'details.photo' },
          { text: 'Role', value: 'role' },
          { text: 'Action', value: 'action' },
        ]
    }
  },
  mounted(){
    this.$store.dispatch('user/getUsers');
  },
  computed: {
      getUsers(){
        return this.$store.state.user.users
      }
  },
  methods: {
    deleteUser(id){
      this.$store.dispatch('user/deleteUser', id)
    }
  }
}
</script>

<style>

</style>