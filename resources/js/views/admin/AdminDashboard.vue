<template>
    <!-- <div class="container">
      <div class="card">
        <div class="card-header">Hello, <b>{{user.first_name}}</b> {{user.last_name}}</div>
        <div class="card-body">
          <p>email : {{user.email}}</p>
          <p>akun dibuat pada {{user.created_at}}</p>
          <div class="row">
            <div class="col-6">
              <router-link :to="{name: 'Categories'}">Manage Categories</router-link> | 
          <router-link :to="{name: 'CreateCategory'}">Add Category</router-link>
            </div>
            <div class="col-6">
              <router-link :to="{name: 'Products'}">Manage Products</router-link> | 
          <router-link :to="{name: 'CreateProduct'}">Add Product</router-link>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div> -->
    <v-app>
      <nav>
        <v-navigation-drawer v-model="drawer" dark app class="orange darken-0 py-0">
        <v-list-item class="px-2 py-5">
          <v-list-item-title class="text-capitalize" align="center">
            <v-icon x-large>mdi-lock</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list>
            <v-list-item router :to="{name: 'DashboardAdmin'}">
                <v-list-item-action>
                    <v-icon small>mdi-mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router :to="{name: 'Categories'}">
                <v-list-item-action>
                    <v-icon small>mdi-mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Manage Categories</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router :to="{name: 'Products'}">
                <v-list-item-action>
                    <v-icon small>mdi-cart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Manage Products</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-layout row style="position: absolute; bottom: 2%; right: 10%;" align-center>
            <v-flex class="md-10">
                <v-list-item dense>
                    <v-list-item-avatar class="ml-2">
                        
                    </v-list-item-avatar>
                    <v-list-item-action class="ml-8">
                        <a href="#" style="color: white" @click.prevent="logout">
                          <v-icon class="mr-2" color="tertiary">mdi-export</v-icon>Sign out
                        </a>
                    </v-list-item-action>
                </v-list-item>
            </v-flex>
        </v-layout>
    </v-navigation-drawer>
      </nav>
      
      <v-main>
        <v-toolbar color="orange" flat>
        <v-app-bar-nav-icon style="color: white;" @click.prevent="openClose"></v-app-bar-nav-icon>
        <v-toolbar-title></v-toolbar-title>
      </v-toolbar>
        <router-view></router-view>
      </v-main>
    </v-app>
</template>

<script>
// import {mapGetters} from 'vuex';
export default {
  data(){
       return {
           drawer: true
       }
  },
  methods: {
    openClose(){
      this.drawer = !this.drawer
    },
    async logout() {
      await axios.post("/logout").then(({ data }) => {
        this.signOut();
        this.$router.push({ name: "Login" });
      });
    },
  }
    // computed: {
    //   ...mapGetters({
    //     user: 'auth/user',
    //   })
    // },
}
</script>