<template>
  <div>
      <table class="table table-bordered">
        <thead class="text-center">
          <th>No</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Photo</th>
          <th>Created</th>
          <th>User</th>
          <th colspan="2">Action</th>
        </thead>
        <tbody>
          <tr v-for="product in getProducts" :key="product.id">
            <td>{{product.id}}</td>
            <td>{{product.title}}</td>
            <td>{{product.slug}}</td>
            <td>{{product.description}}</td>
            <td>{{product.category.name}}
            <td>{{product.price}}</td>
            <td><img :src="'/images/'+product.photo" :alt="product.title" width="100" height="100"></td>
            <td>{{product.created_at}}</td>
            <td>{{product.user.first_name}}</td>
            <td><router-link :to="{name: 'EditProduct', params: {id: product.id}}">Edit</router-link></td>
            <td><a href="#" @click.prevent="deleteProduct(product.id)">Delete</a></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('product/getProducts')
  },
  computed: {
      getProducts(){
        return this.$store.state.product.products
      }
  },
  methods: {
    deleteProduct(id){
      this.$store.dispatch('product/deleteProduct', id)
    }
  }
}
</script>