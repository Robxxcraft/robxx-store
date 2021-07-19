<template>
  <!-- <div>
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
  </div> -->


            <v-form @submit.prevent="updateProduct">
                <v-container>
                    <h3>Update Product</h3>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="form.title" :counter="25" label="Title"  hint="Enter Title Product" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-textarea name="input-7-1" v-model="form.description" :counter="200" label="Description" hint="Enter Description Product"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-select :items="getCategories" item-value="id" item-text="name" v-model="form.category_id" label="Category" hint="Enter Category Product"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field  v-model="form.price" :counter="10" label="Price" hint="Enter Price Product"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-file-input  accept="image/png, image/jpg, image/jpeg"  prepend-icon="mdi-camera" label="Photo" @change="onImageUpload" hint="Enter Photo Product"></v-file-input>
                            <v-img :src="img"></v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" v-model="form.stock" :counter="3" label="Stock" hint="Enter Stock Product"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <template>
                                <v-text-field v-if="this.form.tags.length <= 4" v-model="tag" :counter="25" label="Tag" hint="Enter Tag Product" append-icon="mdi-tag-plus" @click:append="addTag"></v-text-field>
                                <h3 v-else><v-icon left>mdi-tag-multiple</v-icon> Tags</h3>
                            </template>
                            <v-chip-group><v-chip color="brown" style="color: white;" v-for="(tag, index) in form.tags" :key="tag" close @click:close="deleteTag(index)"><v-icon left>mdi-tag</v-icon> {{tag}}</v-chip></v-chip-group>
                        </v-col>
                    </v-row>
                    <v-btn type="submit" color="teal" style="color: white;">Update</v-btn>
                </v-container>
        </v-form>
</template>

<script>
export default {
    data(){
        return {
            form: {
                title: '',
                description: '',
                category_id: 0,
                price: '',
                stock: 1,
                tags: []
            },
            image: null,
            img: null,
            tag: '',
        }
    },
    mounted(){
        this.$store.dispatch('category/getCategories')
        axios.get(`/api/product/${this.$route.params.id}`).then(res => {
           this.form.title = res.data.title;
           this.form.description = res.data.description;
           this.form.category_id = res.data.category_id;
           this.form.price = res.data.price;
           this.getTag(res.data.tag)
       })
    },
    computed: {
        getCategories(){
        return this.$store.state.category.categories
      }
    },
    methods: {
        getTag(tags){
            for (let index = 0; index < tags.length; index++) {
                this.form.tags.push(tags[index].name);
            }
        },
        onImageUpload(files){
            this.img = URL.createObjectURL(files)
            this.image = files
        },
        addTag(){
            this.form.tags.push(this.tag)
            this.tag = ''
        },
        deleteTag(id){
            let tags = this.form.tags
            tags.splice(id, 1)
        },
        updateProduct(){
            const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

            let formData = new FormData();
            formData.append('_method', 'PUT')
            formData.append('title', this.form.title)
            formData.append('description', this.form.description)
            formData.append('category_id', this.form.category_id)
            formData.append('photo', this.image)
            formData.append('price', this.form.price)
            formData.append('stok', this.form.stock)

            for (let index = 0; index < this.form.tags.length; index++) {
                formData.append('tags[]', this.form.tags[index]);
            }

            axios.post(`/api/product/${this.$route.params.id}`, formData, config).then(() => {
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