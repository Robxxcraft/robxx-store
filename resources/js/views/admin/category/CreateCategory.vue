<template>
  <div>
      <div class="card">
          <div class="card-header">Add Category</div>
          <div class="card-body">
              <div class="container">
                  <form @submit.prevent="saveCategory">
                      <div class="form-group">
                          <label for="name">Name</label>
                          <input type="text" name="name" v-model="form.name" class="form-control">
                      </div>
                      <button type="submit" class="btn btn-primary">Save</button>
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
                name: ''
            }
        }
    },
    methods: {
        async saveCategory(){
            await axios.post('/api/category/add', this.form).then(response => {
                this.$router.replace({name: 'Categories', props: {success: response.data.success}})
            }).catch((error) => {
                console.log(error)
            })
        }
    }

}
</script>

<style>

</style>