<template>
  <div>
      <table class="table table-bordered">
        <thead class="text-center">
          <th>No</th>
          <th>Name</th>
          <th>Slug</th>
          <th colspan="2">Action</th>
        </thead>
        <tbody>
          <tr v-for="category in getCategories" :key="category.id">
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
            <td>{{category.slug}}</td>
            <td><router-link :to="{name: 'EditCategory', params: {id: category.id}}">Edit</router-link></td>
            <td><a href="#" @click.prevent="deleteCategory(category.id)">Delete</a></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('category/getCategories')
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