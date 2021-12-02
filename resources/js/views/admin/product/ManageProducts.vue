<template>
  <v-card flat>
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
      <v-menu rounded="lg" offset-y>
            <template v-slot:activator="{attrs, on}">
              <v-btn fab text slot="activator" v-bind="attrs" v-on="on">
                <v-icon class="mx-2">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list flat>
              <template>
                <v-list-item>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{on, attrs}">
                       <v-btn depressed class="red--text" text v-bind="attrs" v-on="on" style="text-transform: none;">Clear Products</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold red--text">Delete All Products</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure delete all products?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey--text font-weight-bold" outlined @click.native="dialog = false" depressed style="text-transform: none;">Cancel</v-btn>
                        <v-btn class="white--text font-weight-bold" color="red accent-2" @click="deleteAllProduct" depressed style="text-transform: none;">Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-list-item>
              </template>
            </v-list>
                </v-menu>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="getProducts"
      :search="search"
    >
    
    <template v-slot:[`item.description`]="{item}" width="1000px;">
        <span v-html="item.description" class="caption"></span>
    </template>
    <template v-slot:[`item.price`]="{item}">
        <span class="font-weight-bold">${{item.price}}</span>
    </template>
    <template v-slot:[`item.photo`]="{item}">
        <v-img :src="item.photo ? item.photo : '/assets/images/blank.png'" width="120px" contain height="80px"></v-img>
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
        dialog: false,
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
        deleteAllProduct(){
        this.$store.dispatch('product/deleteAllProduct').finally(()=>{
          this.$toasted.show("All Products Deleted Successfully", {
            type: 'success',
            duration: '2000'
          })
        })
        },
  }
  }
</script>

<style>
.marker{
  background-color: yellow;
}
</style>