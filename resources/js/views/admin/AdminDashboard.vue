<template>
    <div class="container">
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
    </div>    
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
      ...mapGetters({
        user: 'auth/user',
      })
    },
}
</script>