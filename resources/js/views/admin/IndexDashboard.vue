<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
      <v-container fluid>
         <v-row class="my-5">
                <v-col cols="12" sm="4" class="my-auto">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-card color="purple darken-3" :elevation="hover ? 16 : 2">
                          <v-list-item three-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline mb-1 white--text my-auto mt-8">${{cod}}</v-list-item-title>
                              <v-list-item-subtitle class="white--text font-weight-bold my-auto">COD</v-list-item-subtitle>
                            </v-list-item-content>

                          <v-avatar size="100" class="mt-6" tile>
                            <v-icon x-large color="white">mdi-cash-usd-outline</v-icon>
                          </v-avatar>
                          </v-list-item>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col cols="12" sm="4" class="my-auto">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-card color="blue darken-3" :elevation="hover ? 16 : 2">
                          <v-list-item three-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline mb-1 white--text my-auto mt-8">${{midtrans}}</v-list-item-title>
                              <v-list-item-subtitle class="white--text font-weight-bold my-auto">Midtrans</v-list-item-subtitle>
                            </v-list-item-content>

                          <v-avatar size="100" class="mt-6" tile>
                            <v-icon x-large color="white">mdi-credit-card-multiple-outline</v-icon>
                          </v-avatar>
                          </v-list-item>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col cols="12" sm="4" class="my-auto">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-card color="red darken-3" :elevation="hover ? 16 : 2">
                          <v-list-item three-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline mb-1 white--text my-auto mt-8">{{user}}</v-list-item-title>
                              <v-list-item-subtitle class="white--text font-weight-bold my-auto">Users</v-list-item-subtitle>
                            </v-list-item-content>

                          <v-avatar size="100" class="mt-6" tile>
                            <v-icon x-large color="white">mdi-account-group-outline</v-icon>
                          </v-avatar>
                          </v-list-item>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
        <v-row>
          <v-col cols="12" sm="8">
            <v-card dark color="teal" class="rounded-lg" flat>
              <template>
                
                <v-sheet
                  class="rounded-t-lg"
                  color="orange"
                  elevation="12"
                >
                <v-app-bar flat class="rounded-t-lg" color="orange">
                  <span class="text-h6">Monthly Transactions</span>
                </v-app-bar>
                  <v-sparkline
                    :labels="chart.months"
                    :value="chart.counts"
                    color="white"
                    line-width="2"
                    padding="16"
                  ></v-sparkline>
                </v-sheet>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card flat>
              <v-date-picker no-title flat full-width color="orange">
              
            </v-date-picker>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
 const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
export default {
    data(){
      return {
      cod: 0,
      midtrans: 0,
      user: 0,
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      chart: [],
      }
    },
    mounted(){
      axios.get('/api/count').then(res => { 
        this.cod = res.data.cod; 
        this.midtrans = res.data.midtrans; 
        this.user = res.data.user;
       })
      axios.get('/api/chart').then(res => { this.chart = res.data; })
    }
}
</script>

<style>
  .datatab {
    background: #23262D !important;
  }
</style>