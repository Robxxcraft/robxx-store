<template>
 <v-card>
    <v-card-title>
      Settings
    </v-card-title>
    <v-card-text>
      <div>
        <v-subheader class="subtitle-1">Banner</v-subheader>
      <v-row wrap>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img src="/assets/images/b-bg1.png" contain max-height="150" max-width="auto">
            <v-btn tile :to="{name: 'ChangeBanner', params: {id: 1}}" style="text-decoration: none;" class="rounded-br-lg" elevation="3"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-img>
        </v-col>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img src="/assets/images/b-bg2.jpg" contain max-height="150" max-width="auto">
            <v-btn tile :to="{name: 'ChangeBanner', params: {id: 2}}" class="rounded-br-lg" elevation="3"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-img>
        </v-col>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img src="/assets/images/b-bg3.jpg" contain max-height="150" max-width="auto">
            <v-btn tile :to="{name: 'ChangeBanner', params: {id: 3}}" class="rounded-br-lg" elevation="3"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-img>
        </v-col>
      </v-row>
      </div>
      <div class="my-5">
        <v-subheader class="subtitle-1">
          Logo 
        </v-subheader>
        <v-img src="/assets/images/logo1.jpg" contain max-height="150" max-width="auto"></v-img>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed dark color="orange darken-3" class="mb-2 mr-2" style="text-transform: none;">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      search: '',
        headers: [
          { text: '#', align: 'start', value: 'id'},
          { text: 'Name', value: 'name' },
          { text: 'Slug', value: 'slug' },
          { text: 'Date', value: 'date' },
          { text: 'Action', value: 'action' },
        ]
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
      this.$store.dispatch('category/deleteCategory', id)
    }
  }
}
</script>

<style>

</style>