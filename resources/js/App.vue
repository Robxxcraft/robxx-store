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
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

.v-application{
  font-family: 'Outfit', sans-serif !important;
}
</style>
