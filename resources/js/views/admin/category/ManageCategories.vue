<template>
 <v-card>
    <v-card-title>
      Category <router-link :to="{name: 'CreateCategory'}"><v-icon>mdi-mail</v-icon></router-link>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getCategories"
      :search="search"
    >
    <template v-slot:[`item.action`]="{item}">
        <router-link :to="{name: 'EditCategory', params: {id: item.id}}">Edit</router-link>
        <a href="#" @click.prevent="deleteCategory(item.id)">Delete</a>
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
          { text: 'Name', value: 'name' },
          { text: 'Slug', value: 'slug' },
          { text: 'Action', value: 'action' },
        ]
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
      this.$store.dispatch('category/deleteCategory', id)
    }
  }
}
</script>

<style>

</style>