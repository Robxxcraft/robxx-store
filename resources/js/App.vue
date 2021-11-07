<template>
  <div>
    <template v-if="!isLoading">
      <router-view  />
    </template>
    <template v-else>
      <loading-page></loading-page>
    </template>
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
