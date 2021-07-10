<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getProducts"
      :search="search"
    >
    <template v-slot:[`item.tags`]="{item}">
        <li v-for="tg in item.tag">
            {{tg.name}}
        </li>
    </template>
    <template v-slot:[`item.action`]="{item}">
        <router-link :to="{name: 'EditProduct', params: {id: item.id}}">Edit</router-link>
        <a href="#" @click.prevent="deleteProduct(item.id)">Delete</a>
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
          { text: '#', align: 'start', value: 'id'},
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Category', value: 'category.name' },
          { text: 'Price', value: 'price' },
          { text: 'Photo', value: 'photo' },
          { text: 'User', value: 'user.first_name' },
          { text: 'Tag', value: "tags" },
          { text: 'Action', value: "action" },
        ]
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
        this.$store.dispatch('product/deleteProduct', id)
        }
  }
  }
</script>