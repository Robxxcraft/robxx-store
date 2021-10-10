<template>
  <div>
      <router-view v-if="!isLoading" />
      <div v-else><loading-page></loading-page></div>
  </div>
</template>

<script>
import LoadingPage from "./views/public/loading";

export default {
  components: {
    LoadingPage
  },
  data(){ 
    return {
      isLoading: true
    }
  },
  created(){
    setTimeout(()=>{
      this.isLoading = false
    }, 1000)
  }
};
</script>

<style>
</style>
