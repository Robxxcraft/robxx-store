<template>
    <section class="ma-4">
         <v-card flat>
             <v-card-title>
                 Create Product
             </v-card-title>
             <v-card-subtitle><v-divider></v-divider></v-card-subtitle>
             <v-card-text>
                 <v-form @submit.prevent="saveProduct">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.title" color="orange" :counter="25" label="Title"  hint="Enter Title Product" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea name="input-7-1" v-model="form.description" color="orange" :counter="500" label="Description" hint="Enter Description Product"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select :items="getCategories" item-value="id" item-text="name" v-model="form.category_id" color="orange" label="Category" hint="Enter Category Product"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field  v-model="form.price" color="orange" :counter="10" label="Price" hint="Enter Price Product"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-file-input  accept="image/png, image/jpg, image/jpeg"  prepend-icon="mdi-camera" color="orange" label="Photo" @change="onImageUpload" hint="Enter Photo Product"></v-file-input>
                            <v-img :src="img"></v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field type="number" v-model="form.stock" color="orange" :counter="3" label="Stock" hint="Enter Stock Product"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <template>
                                <v-text-field v-if="this.form.tags.length <= 4" v-model="tag" color="orange" :counter="25" label="Tag" hint="Enter Tag Product" append-icon="mdi-tag-plus" @click:append="addTag"></v-text-field>
                                <h3 v-else><v-icon left>mdi-tag-multiple</v-icon> Tags</h3>
                            </template>
                            <v-chip-group><v-chip color="brown" style="color: white;" v-for="(tag, index) in form.tags" :key="tag" close @click:close="deleteTag(index)"><v-icon left>mdi-tag</v-icon> {{tag}}</v-chip></v-chip-group>
                        </v-col>
                    </v-row>
                    <v-card-actions class="my-5">
                        <v-spacer></v-spacer>
                        <v-btn right type="submit" :disabled="loading == true" class="rounded-0 mx-2" dark depressed color="orange darken-2" large>Save</v-btn>
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
        </v-form>
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
                tags: []
            },
            loading: false,
            image: null,
            img: null,
            tag: '',
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
        onImageUpload(files){
            this.img = URL.createObjectURL(files)
            this.image = files
        },
        addTag(){
            if (this.form.tags.indexOf(this.tag) === -1) {
                this.form.tags.push(this.tag)
                this.tag = ''
            } else {
                this.tag = ''
            }
        },
        deleteTag(id){
            let tags = this.form.tags
            tags.splice(id, 1)
        },
        saveProduct(){
            this.loading = true
            const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

            let formData = new FormData();
            formData.append('title', this.form.title)
            formData.append('description', this.form.description)
            formData.append('category_id', this.form.category_id)
            formData.append('photo', this.image)
            formData.append('price', this.form.price)
            formData.append('stok', this.form.stock)

            for (let index = 0; index < this.form.tags.length; index++) {
                formData.append('tags[]', this.form.tags[index]);
            }

            axios.post('/api/product/add', formData, config).then(() => {
                this.loading = false
                this.$router.replace({name: 'Products'})
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>