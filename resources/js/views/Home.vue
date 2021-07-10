<template>
  <div>
    Selamat Datang di robxx store
    <router-link :to="{name: 'Admin'}">Admin</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>