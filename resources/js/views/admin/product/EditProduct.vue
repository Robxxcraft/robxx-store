<template>
  <div>
      <div class="card">
          <div class="card-header">Edit Product</div>
          <div class="card-body">
              <div class="container">
                  <form @submit.prevent="updateProduct" enctype="multipart/form-data">
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
                          </div>
                          
                      </div>
                       <div class="form-group">
                          <label for="stok">Stok</label>
                          <input type="number" name="stok" v-model="form.stok" class="form-control">
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
            previewImage: '',
            form: {
                title: '',
                description: '',
                category_id: 0,
                price: '',
                photo: null,
                stok: '',
            },
            photo: ''
        }
    },
    mounted(){
        this.$store.dispatch('category/getCategories')
        axios.get(`/api/product/${this.$route.params.id}`).then(res => {
           this.form.title = res.data.title;
           this.form.description = res.data.description;
           this.form.category_id = res.data.category_id;
           this.form.price = res.data.price;
           this.form.stok= res.data.stok;
       })
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
        updateProduct(){
            const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

            let formData = new FormData();
            formData.append('photo', this.photo)

            axios.put(`/api/product/${this.$route.params.id}`, this.form, formData).then(() => {
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