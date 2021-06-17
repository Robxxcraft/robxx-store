<template>
    <div>
      <div class="card">
        <div class="card-header">Hello, <b>{{user.name}}</b></div>
        <div class="card-body">
          <p>email : {{user.email}}</p>
          <p>akun dibuat pada {{user.created_at}}</p>
        </div>
      </div>
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