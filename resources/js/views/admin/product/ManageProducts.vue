<template>
  <v-card>
    <v-card-title>
      Products
    </v-card-title>
    <v-card-actions class="mb-3">
      <v-spacer></v-spacer>
      <v-text-field filled rounded
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mx-2 rounded-0"
        color="orange"
      ></v-text-field>
      <v-btn :to="{name:'CreateProduct'}" text style="text-decoration: none"><v-icon class="mx-4">mdi-plus-circle-outline</v-icon></v-btn>
      <v-btn fab text><v-icon  class="mx-2">mdi-dots-vertical</v-icon></v-btn>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getProducts"
      :search="search"
    >
    
    <template v-slot:[`item.description`]="{item}" width="1000px;">
        {{item.description | sortlength("...")}}
    </template>
    <template v-slot:[`item.tags`]="{item}" width="20px;">
        <v-chip small class="ma-1" v-for="(tg, index) in item.tag" :key="index">
            {{tg.name}}
        </v-chip>
    </template>
    <template v-slot:[`item.date`]="{item}">
        {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
        <v-btn small depressed class="blue accent-2 white--text ma-1" :to="{name: 'EditProduct', params: {id: item.id}}" style="text-decoration: none;" title="Edit"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteProduct(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
        <v-btn small depressed class="amber darken-1 white--text ma-1" :to="{name: 'Sale', params: {id: item.id}}" title="Sale"><v-icon>mdi-sale</v-icon></v-btn>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: '#', align: 'start', value: 'id', width: "5%"},
          { text: 'Title', value: 'title',width: "10%"},
          { text: 'Description', value: 'description', width: "15%" },
          { text: 'Category', value: 'category.name', width: "10%" },
          { text: 'Price', value: 'price', width: "10%" },
          { text: 'Photo', value: 'photo', sortable: false, width: "5%" },
          { text: 'User', value: 'user.first_name', width: "10%" },
          { text: 'Tag', value: "tags", sortable: false, width: "10%" },
          { text: 'Date', value: 'date', sortable: false ,width: "10%"},
          { text: 'Action', value: "action", sortable: false, width: "15%" },
        ],
        dialogs: false,
      }
    },
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
        this.$store.dispatch('product/deleteProduct', id).finally(()=>{
          this.$toasted.show("Product Deleted Successfully", {
            type: 'success',
            duration: '2000'
          })
        })
        },
        sale(id){
          axios.post('/')
        }
  }
  }
</script>