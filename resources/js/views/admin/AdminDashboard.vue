<template>
    <div>
      <v-app v-if="!isLoading">
      <nav>
        <v-app-bar color="orange darken-2" flat dark app class="line" height="60px">
          <v-icon   class="hidden-lg-and-up" @click="openClose()">mdi-view-grid</v-icon>
          <v-spacer></v-spacer>
          <v-menu rounded="lg" offset-y max-width="110">
            <template v-slot:activator="{attrs, on}">
              <v-btn text slot="activator" right style="text-transform: none; margin: 0; padding: 0;" color="orange" depressed v-bind="attrs" v-on="on">
                
                <span class="white--text mx-2 font-weight-bold">{{first_name}}</span>
                <v-avatar size="48px" color="grey lighten-4">
                  <template v-if="img">
                    <v-img :src="img" contain></v-img>
                  </template>
                  <template v-else>
                    <v-icon>mdi-account</v-icon>
                  </template>
                </v-avatar>
              </v-btn>
              
              
            </template>
            <v-list flat>
              <template>
                <v-list-item router :to="{name: 'Home'}" style="text-decoration: none;">  
                  <v-chip class="rounded-0 white" style="cursor: pointer;"><v-list-item-title class="grey--text">Public</v-list-item-title></v-chip>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{on, attrs}">
                       <v-chip class="rounded-0 white"><v-list-item-title class="red--text" v-bind="attrs" v-on="on" depressed>Logout</v-list-item-title></v-chip>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold grey red--text lighten-3">Sign Out</v-card-title>
                      <v-card-text>
                        <p class="mt-2 subheading">Are you sure logout this account?</p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey--text" outlined @click.native="dialog = false" depressed style="text-transform: none;">Cancel</v-btn>
                        <v-btn class="white--text" color="red lighten-1" @click="logout" depressed style="text-transform: none;">Logout</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-list-item>
              </template>
            </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" dark app mini-variant mini-variant-width="120" color="orange darken-2">
        
          <v-list class="mt-14">
            <v-list-item-group color="orange lighten-4">
              <v-list-item v-for="(item, index) in items" :key="index" :to="{name: item.route}" style="text-decoration: none;">
                <v-list-item-content align="center">
                  <v-icon v-text="item.icon" size="21px" class="mb-2" align="center"></v-icon>
                  <v-list-item-subtitle v-text="item.text" align="center" class="caption white--text font-weight-bold"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        
      </nav>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
    <div v-else>
       <loading-page></loading-page>
    </div>
    </div>
</template>

<script>
import LoadingPage from "../public/loading";
export default {
  components: {
    LoadingPage,
  },
  created(){
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
  },
  data(){
       return {
           isLoading: true,
           drawer: null,
           dialog: false,
           items: [
             {route: 'DashboardAdmin', text: 'Dashboard', icon: 'mdi-view-dashboard'},
             {route: 'Categories', text: 'Categories', icon: 'mdi-order-bool-ascending'},
             {route: 'Products', text: 'Products', icon: 'mdi-warehouse'},
             {route: 'AdminOrders', text: 'Orders', icon: 'mdi-truck'},
             {route: 'Transactions', text: 'Transactions', icon: 'mdi-credit-card-multiple'},
             {route: 'ManageUsers', text: 'Users', icon: 'mdi-account-group'},
             {route: 'Settings', text: 'Settings', icon: 'mdi-tune-variant'},
           ]
       }
  },
  methods: {
    openClose(){
      this.drawer = !this.drawer
    },
    logout() {
        this.$store.dispatch("auth/logout").then(() => {
          location.reload()
        })
    },
  },
  computed: {
    first_name(){
      return this.$store.state.auth.user.first_name;
    },
    img(){
      const details =  this.$store.state.auth.user.details 
      if (!details || !details.photo) {
        return;
      }
      
      return details.photo;
    },
  }
}
</script>