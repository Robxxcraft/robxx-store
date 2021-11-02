<template> 
        <section class="ma-4">
         <v-card flat>
             <v-card-title>
                 Edit Product - {{this.$route.params.id}}
             </v-card-title>
             <v-card-subtitle><v-divider></v-divider></v-card-subtitle>
             <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.title" color="orange" label="Title"  filled rounded class="rounded-0" hint="Enter Title Product" :error-messages="errors.title" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span v-if="errors.description" class="red--text text-h6">{{errors.description[0]}}</span>
                            <quill-editor ref="myQuillEditor" v-model="form.description" :options="editorOption"></quill-editor>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select :items="getCategories" item-value="id" item-text="name" v-model="form.category_id" color="orange" label="Category" filled rounded class="rounded-0" hint="Enter Category Product" :error-messages="errors.category_id"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field  v-model="form.price" color="orange" label="Price" filled rounded class="rounded-0" hint="Enter Price Product" :error-messages="errors.price"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-file-input  accept="image/png, image/jpg, image/jpeg"  prepend-icon="mdi-camera" color="orange" label="Photo" filled rounded class="rounded-0" @change="onImageUpload" hint="Enter Photo Product" :error-messages="errors.photo" style="cursor: pointer;"></v-file-input>
                        </v-col>
                        <v-col cols="6">
                            <v-img :src="img" max-width="auto" contain height="150"></v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field type="number" v-model="form.stock" color="orange" label="Stock" filled rounded class="rounded-0" hint="Enter Stock Product" :error-messages="errors.stock"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <template v-if="this.form.tags.length <= 4">
                                <v-text-field v-model="tag" color="orange" label="Tag" filled rounded class="rounded-0" hint="Enter Tag Product" append-outer-icon="mdi-tag-plus" @click:append-outer="addTag"></v-text-field>
                            </template>
                            <template v-else>
                                <h3><v-icon left>mdi-tag-multiple</v-icon> Tags</h3>
                            </template>
                            <v-chip-group><v-chip color="orange" style="color: white;" v-for="(tag, index) in form.tags" :key="tag" close @click:close="deleteTag(index)"><v-icon left>mdi-tag</v-icon> {{tag}}</v-chip></v-chip-group>
                        </v-col>
                    </v-row>
                    <v-card-actions class="my-5">
                        <v-spacer></v-spacer>
                        <v-btn right type="submit" :disabled="loading" class="mx-2" dark depressed color="orange darken-3" large style="text-transform: none;" @click="updateProduct">Update</v-btn>
                        <template v-if="loading">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <rect x="19" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
                                        </rect>
                                    </svg>
                                </template>
                    </v-card-actions>
                    
                </v-container>
             </v-card-text>
              </v-card>
    </section>
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
                tags: [],
            },
            errors: {},
            loading: false,
            image: null,
            prev: null,
            tag: '',
        }
    },
    mounted(){
        this.$store.dispatch('category/getCategories')
        axios.get(`/api/product/${this.$route.params.id}/edit`).then(res => {
           this.form.title = res.data.title;
           this.form.description = res.data.description;
           this.form.category_id = res.data.category_id;
           this.form.price = res.data.price;
           this.prev = res.data.photo
           this.getTag(res.data.tag)
       })
    },
    computed: {
        getCategories(){
        return this.$store.state.category.categories
      },
      img(){
            if (!this.image) {
                return `/images/${this.prev}`;
            }

            return URL.createObjectURL(this.image);
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
            this.loading = true
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

            axios.post(`/api/product/${this.$route.params.id}`, formData, config).then(response => {
                this.loading = false
                this.$router.replace({name: 'Products'})
                this.$toasted.show(response.data, {
                    type: 'success',
                    duration: '2000'
                })
            }).catch(errors => {
                this.loading = false
                this.errors = errors.response.data.errors;
                this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                })
                
            }).finally(()=>{
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>