<template>
  <div>
      <div class="card">
          <div class="card-header">Add Product</div>
          <div class="card-body">
              <div class="container">
                  <form @submit.prevent="updateProduct">
                      <div class="form-group">
                          <label for="name">Title</label>
                          <input type="text" name="title" v-model="form.title" class="form-control">
                      </div>
                      <div class="form-group">
                          <label for="description">Description</label>
                          <textarea type="text" name="description" v-model="form.description" class="form-control"></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary">Update</button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                title: '',
                description: '',
            }
        }
    },
    mounted(){
       axios.get(`/api/product/${this.$route.params.id}`).then(res => {
           this.form.title = res.data.title
           this.form.description = res.data.description
       })
    },
    methods: {
        async updateProduct(){
            await axios.put(`/api/product/${this.$route.params.id}`, this.form).then(() => {
                this.$router.replace({name: 'Products'})
            }).catch((error) => {
                console.log(error)
            })
        }
    }

}
</script>

<style>

</style>