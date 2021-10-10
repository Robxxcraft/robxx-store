<template>
 <v-card>
    <v-card-title>
      Change Banner
    </v-card-title>
    <v-card-text>
        <v-col sm="12" md="6" lg="4" xl="4">
              <v-img src="/assets/images/b-bg1.png" contain max-height="150" max-width="auto">
                <v-btn tile class="rounded-br-lg" elevation="3"><v-icon>mdi-pencil</v-icon></v-btn>
              </v-img>
        </v-col>
        
    </v-card-text>
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
          { text: 'Date', value: 'date' },
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