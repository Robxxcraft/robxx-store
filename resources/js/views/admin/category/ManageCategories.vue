<template>
 <v-card>
    <v-card-title>
      Category
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
      <v-btn :to="{name:'CreateCategory'}" text style="text-decoration: none"><v-icon class="mx-4">mdi-plus-circle-outline</v-icon></v-btn>
      <v-btn fab text><v-icon  class="mx-2">mdi-dots-vertical</v-icon></v-btn>
      <v-btn @click="check = true">Pilih</v-btn>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getCategories"
      :search="search">
    <template style="width: 2px" v-slot:[`item.select`]="{item}">
      <v-checkbox color="orange"></v-checkbox>
    </template>
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
        <v-btn small depressed class="blue accent-2 white--text ma-1" router :to="{name: 'EditCategory', params: {id: item.id}}" style="text-decoration: none;" title="Edit"><v-icon>mdi-pencil</v-icon></v-btn>
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
          { text: '#', align: 'start', value: 'select'},
          { text: 'Id',  value: 'id'},
          { text: 'Name', value: 'name' },
          { text: 'Slug', value: 'slug' },
          { text: 'Date', value: 'date' },
          { text: 'Action', value: 'action' },
      ],
      check: false
      }
  },
  mounted(){
    this.$store.dispatch('category/getCategories');
  },
  computed: {
      getCategories(){
        return this.$store.state.category.categories
      }
  },
  methods: {
    deleteCategory(id){
      this.$store.dispatch('category/deleteCategory', id).finally(()=>{
        this.$toasted.show("Category Deleted Successfully", {
          type: 'success',
          duration: '2000'
        })
      })
    }
  }
}
</script>

<style>

</style>