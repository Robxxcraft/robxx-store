<template>
 <v-card flat>
    <v-card-title>
      Settings
    </v-card-title>
    <v-card-text>
      <div>
        <v-subheader class="subtitle-1">Banner</v-subheader>
      <v-row wrap>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img :src="prevbanner1" height="auto" max-width="auto">
            <v-btn small dark color="orange" tile class="rounded-br-xl">
              <v-container><v-file-input hide-input class="mt-n3 mr-n2" v-model="form.banner1" prepend-icon="mdi-pencil"></v-file-input></v-container>
            </v-btn>
            </v-img>
            
        </v-col>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img :src="prevbanner2" height="auto" max-width="auto">
            <v-btn small dark color="orange" tile class="rounded-br-xl">
              <v-container><v-file-input hide-input class="mt-n3 mr-n2" v-model="form.banner2" prepend-icon="mdi-pencil"></v-file-input></v-container>
            </v-btn>
            </v-img>
            
        </v-col>
        <v-col sm="12" md="6" lg="4" xl="4">
            <v-img :src="prevbanner3" height="auto" width="auto">
            <v-btn small dark tile elevation="5" class="rounded-br-xl" color="orange">
              <v-container><v-file-input hide-input class="mt-n3 mr-n2" v-model="form.banner3" prepend-icon="mdi-pencil"></v-file-input></v-container>
            </v-btn>
            </v-img>
            
        </v-col>
      </v-row>
      </div>
      <div class="my-6">
        <v-subheader class="subtitle-1">
          Logo 
        </v-subheader>
        <v-row>
          <v-col cols="12" md="4" lg="4" xl="4">
          <v-img :src="prevlogo" contain max-height="150" max-width="auto">
            <v-btn small dark tile elevation="5" class="rounded-br-xl" color="orange">
              <v-container><v-file-input hide-input class="mt-n3 mr-n2" v-model="form.logo" prepend-icon="mdi-pencil"></v-file-input></v-container>
            </v-btn>
          </v-img>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed dark color="orange darken-3" class="mb-2 mr-2" @click.prevent="updateSetting" style="text-transform: none;">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
        form: {
          banner1: null,
          banner2: null,
          banner3: null,
          logo: null
        },
        ban1: null,
        ban2: null,
        ban3: null,
        log: null,
    }
  },
  mounted(){
    axios.get('/api/settings').then(res => {
      let data = res.data;
      this.ban1 = data.find(i => i.type == 'banner-1') ? data.find(i => i.type == 'banner-1').image : 'example/banner-1.jpg'
      this.ban2 = data.find(i => i.type == 'banner-2') ? data.find(i => i.type == 'banner-2').image : 'example/banner-2.jpg'
      this.ban3 = data.find(i => i.type == 'banner-3') ? data.find(i => i.type == 'banner-3').image : 'example/banner-3.png'
      this.log = data.find(i => i.type == 'logo') ? data.find(i => i.type == 'logo').image : 'example/logo.png'
    })
  },
  computed:{
    prevbanner1(){
      if (!this.form.banner1) {
        return `/assets/images/banner/${this.ban1}`;
      }
      return URL.createObjectURL(this.form.banner1);
    },
    prevbanner2(){
       if (!this.form.banner2) {
        return `/assets/images/banner/${this.ban2}`;
      }
      return URL.createObjectURL(this.form.banner2);
    },
    prevbanner3(){
       if (!this.form.banner3) {
        return `/assets/images/banner/${this.ban3}`;
      }
      return URL.createObjectURL(this.form.banner3);
    },
    prevlogo(){
       if (!this.form.logo) {
         if (this.log == null) {
           return '/assets/images/notfound.jpg';
         }
        return `/assets/images/${this.log}`;
      }

      return URL.createObjectURL(this.form.logo);
    }
  },
  methods: {
    updateSetting(){
      this.loading = true
      const config = {
                headers: { 'content-type' : 'multipart/form-data'}
            }

      let formData = new FormData();
      formData.append('_method', 'PUT')
      formData.append('banner1', this.form.banner1)
      formData.append('banner2', this.form.banner2)
      formData.append('banner3', this.form.banner3)
      formData.append('logo', this.form.logo)

      axios.post('/api/update-setting', formData, config).then(res => {

        this.loading = false
        this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
      }).catch(() => {
        this.loading = false
        this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                });
      })
    }
  }
}
</script>

<style>

</style>