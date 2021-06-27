<template>
  <div>
      <div class="card">
          <div class="card-header">Add Product</div>
          <div class="card-body">
              <div class="container">
                  <form @submit.prevent="saveProduct" enctype="multipart/form-data">
                      <div class="form-group">
                          <label for="title">Title</label>
                          <input type="text" name="title" v-model="form.title" class="form-control">
                      </div>
                      <div class="form-group">
                          <label for="description">Description</label>
                          <textarea type="text" name="description" v-model="form.description" class="form-control"></textarea>
                      </div>
                      <div class="form-group">
                          <label for="description">Category</label>
                          <select name="category_id" v-model="form.category_id" class="form-control">
                              <option value="0" disabled>Choose Category</option>
                              <option v-for="(category, index) in getCategories" :key="index" :value="category.id">{{category.name}}</option>
                          </select>
                      </div>
                       <div class="form-group">
                          <label for="price">Price</label>
                          <input type="number" name="price" v-model="form.price" class="form-control">
                      </div>
                       <div class="form-group">
                          <label for="photo">Photo</label>
                          <div class="row">
                              <div class="col-8">
                                  <input type="file" name="photo" id="photo" class="form-control-file" @change="upload">
                              </div>
                              <div class="col-4">
                                  <img :src="previewImage" width="200" height="200">
                              </div>
                          </div>
                          
                      </div>
                       <div class="form-group">
                          <label for="stok">Stok</label>
                          <input type="number" name="stok" v-model="form.stok" class="form-control">
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
            previewImage: null,
            form: {
                title: '',
                description: '',
                category_id: 0,
                price: '',
                stok: '',
            },
            photo: null,
        }
    },
    mounted(){
        this.$store.dispatch('category/getCategories')
    },
    computed: {
        getCategories(){
        return this.$store.state.category.categories
      }
    },
    methods: {
        upload(event){
            let files = event.target.files[0]
            this.previewImage = URL.createObjectURL(files)
            this.photo = files
            },
        saveProduct(){
            const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

            let formData = new FormData();
            formData.append('title', this.form.title)
            formData.append('description', this.form.description)
            formData.append('category_id', this.form.category_id)
            formData.append('price', this.form.price)
            formData.append('photo', this.photo)
            formData.append('stok', this.form.stok)

            axios.post('/api/product/add', formData, config).then(() => {
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