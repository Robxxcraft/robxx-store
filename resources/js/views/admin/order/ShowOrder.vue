<template>
 <v-card flat><v-btn @click="$router.go(-1)" class="rounded-lg mt-2 ml-2" elevation="3"><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
    <v-card-title>
      Order Details - {{this.$route.params.id}}
      <v-spacer></v-spacer>
      <span class="subtitle-2 grey--text">{{getOrder.created_at | timeformat}}</span>
    </v-card-title>
    <v-card-subtitle><span :class="`${getOrder.order_status} font-weight-bold subtitle-2`">{{getOrder.order_status}}</span></v-card-subtitle>
    <v-card-text>
      <v-row class="my-5">
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Payment With</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">{{getOrder.payment}}</span>
        </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4" xl="4">
        <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Total Quantity</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">{{getOrder.total_quantity}}</span>
        </v-card-text>
      </v-card>
      </v-col>
       <v-col cols="12" md="4" lg="4" xl="4">
         <v-card class="rounded-lg" elevation="5">
        <v-card-subtitle><span class="subtitle-1 font-weight-bold">Total Amount</span></v-card-subtitle>
        <v-card-text>
          <span class="font-weight-bold orange--text">${{getOrder.total_amount}}</span>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-subheader class="subtitle-1 font-weight-bold">Product List</v-subheader>
      <v-list-item v-for="(orderdetail, index) in getOrder.orderdetails" :key="index">
                    <v-list-item-avatar color="grey" size="90" tile>
                      <v-img :src="`/assets/images/${orderdetail.product.photo}`" contain height="auto" width="auto" />
                    </v-list-item-avatar>
                    
                    <v-list-item-content>

                      <v-list-item-title>
                          {{orderdetail.product.title}}
                      </v-list-item-title>

                      <v-list-item-subtitle class="my-1">
                          Category -
                          <span class="orange--text text--darken-3">{{orderdetail.product.category.name}}</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Quantity 
                          <span class="orange--text text--darken-3">
                            {{orderdetail.quantity}}
                          </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="my-1">
                          Price 
                          <span class="orange--text text--darken-3">
                            {{orderdetail.product.price}}
                          </span>
                      </v-list-item-subtitle>

                    </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-map-marker</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Address
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getOrder.address}}, {{getOrder.city}}, {{getOrder.province}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-post</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Post Code
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{getOrder.zipcode}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item three-line>
                      <v-list-item-icon>
                        <v-icon>mdi-phone</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>

                      <v-list-item-title>
                        Phone Number
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        +{{getOrder.phone_number}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions class="text-right">
            <v-spacer></v-spacer>
            
            <template v-if="getOrder.order_status == 'Cancelled'">
                            <v-btn depressed large dark color="red accent-2" style="text-transform: none;" @click="deletes(getOrder.id)" plain>
                            <v-icon class="mr-1">mdi-delete</v-icon>
                            <span class="caption hidden-sm-and-down">Delete Order</span>
                          </v-btn>
                          </template>
                          <template v-else>
                            <v-btn depressed large dark color="red accent-2" style="text-transform: none;" @click="cancels(getOrder.id)" plain>
                            <v-icon class="mr-1">mdi-close-circle-outline</v-icon>
                            <span class="caption hidden-sm-and-down">Cancel Order</span>
                          </v-btn>
                          </template>
          </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    this.$store.dispatch('order/getAdminShowOrder', this.$route.params.id);
  },
  computed: {
      getOrder(){
        return this.$store.state.order.admin_order
      }
  },
  methods: {
      deletes(id){
      axios.get(`/api/orders/${id}/delete`).then(res => {
        this.$router.push({name: 'AdminOrders'});
        this.$toasted.show(res.data, {
                    type: 'success',
                    duration: '2000'
                });
      }).catch(() => {
        this.$toasted.show("Some Error Occured", {
                    type: 'error',
                    duration: '2000'
                })
      });
    },
    
  }
}
</script>
<style>
  .Accepted {
    color: #4CAF50;
  }

  .Pending {
    color: #FF9800;
  }

  .Cancelled {
    color: #e21818e8;
  }
  
</style>