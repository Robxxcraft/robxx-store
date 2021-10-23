<template>
 <v-card flat>
    <v-card-title>
      Category
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
      <v-btn :to="{name:'CreateCategory'}" text style="text-decoration: none"><v-icon class="mx-4">mdi-plus-circle-outline</v-icon></v-btn>
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
                       <v-btn depressed class="red--text" text v-bind="attrs" v-on="on" style="text-transform: none;">Clear Category</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold red--text">Delete All Category</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure delete all category?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey--text font-weight-bold" outlined @click.native="dialog = false" depressed style="text-transform: none;">Cancel</v-btn>
                        <v-btn class="white--text font-weight-bold" color="red accent-2" @click="deleteAllCategory" depressed style="text-transform: none;">Delete</v-btn>
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
      :items="getCategories"
      :search="search">
    <template v-slot:[`item.date`]="{item}">
      {{item.created_at | timeformat}}
    </template>
    <template v-slot:[`item.action`]="{item}">
        <v-btn small depressed class="blue accent-2 white--text ma-1" router :to="{name: 'EditCategory', params: {id: item.id}}" style="text-decoration: none;" title="Edit"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn small depressed class="red accent-2 white--text ma-1" @click.prevent="deleteCategory(item.id)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      search: '',
      headers: [
          { text: '#',  value: 'id'},
          { text: 'Name', value: 'name' },
          { text: 'Slug', value: 'slug' },
          { text: 'Date', value: 'date' },
          { text: 'Action', value: 'action' },
      ],
      dialog: false
      }
  },
  mounted(){
    this.$store.dispatch('category/getCategories');
  },
  computed: {
      getCategories(){
        return this.$store.state.category.categories
      }
  },
  methods: {
    deleteCategory(id){
      this.$store.dispatch('category/deleteCategory', id).finally(()=>{
        this.$toasted.show("Category Deleted Successfully", {
          type: 'success',
          duration: '2000'
        })
      })
    },
    deleteAllCategory(){
      this.$store.dispatch('category/deleteAllCategory').finally(()=>{
        this.$toasted.show("Category Deleted Successfully", {
          type: 'success',
          duration: '2000'
        })
      })
    }
  }
}
</script>

<style>

</style>