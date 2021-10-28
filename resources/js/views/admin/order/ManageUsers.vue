<template>
 <v-card>
    <v-card-title>
      Users
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
      :items="getUsers"
      :search="search"
    >
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
      <template v-if="item.role == 'User'">
        <v-btn small v-if="superadmin" depressed class="yellow darken-3 white--text ma-1" @click.prevent="addAdmin(item.id)" style="text-decoration: none;" title="Add Admin"><v-icon>mdi-account-cog</v-icon></v-btn>
      </template>
      <template>
        <v-btn small v-if="superadmin && item.role == 'Admin'" depressed class="red darken-3 white--text ma-1" @click.prevent="deleteAdmin(item.id)" style="text-decoration: none;" title="Delete Admin"><v-icon>mdi-account-cog</v-icon></v-btn>
      </template>
        
        <v-btn small depressed class="blue accent-2 white--text ma-1" :to="{name: 'ShowUser', params: {id: item.id}}" style="text-decoration: none;" title="Edit User"><v-icon>mdi-pencil</v-icon></v-btn>
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
      },
        superadmin(){
          const role = this.$store.getters["auth/role"];
          if (role == 'Superadmin') {
            return true
          }
          return false
        }
      },
  methods: {
    deleteUser(id){
      axios.delete(`/api/user/${id}/delete`).then(res => {
          this.$store.commit('user/DELETE_USER', id)
          this.$toasted.show(res.data, {
          type: 'success',
          duration: '2000'
        })
        }).catch(()=>{
          this.$toasted.show("Some Error Occured", {
          type: 'error',
          duration: '2000'
        })
        })
    },
    addAdmin(id){
      axios.post(`/api/add-admin/${id}`).then(res => {
          this.$store.commit('user/ADD_ADMIN', id)
          this.$toasted.show(res.data, {
          type: 'success',
          duration: '2000'
        })
        }).catch(()=>{
          this.$toasted.show("Some Error Occured", {
          type: 'error',
          duration: '2000'
        })
        })
    },
    deleteAdmin(id){
      axios.post(`/api/delete-admin/${id}`).then(res => {
          this.$store.commit('user/DELETE_ADMIN', id)
          this.$toasted.show(res.data, {
          type: 'success',
          duration: '2000'
        })
        }).catch(()=>{
          this.$toasted.show("Some Error Occured", {
          type: 'error',
          duration: '2000'
        })
        })
    }
  }
}
</script>

<style>

</style>