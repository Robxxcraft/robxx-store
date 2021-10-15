import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    order_detail: [],
    admin_orders: []
  },
  getters: {
    order_detail(state){
      return state.orders.order_detail;
    },
  },
  mutations: {
    SET_ORDERS(state, data){
      state.orders = data
    },
    SET_ADMIN_ORDERS(state, data){
      state.admin_orders = data
    },
    CANCEL_ORDER(state, id){
      let order = state.orders.find(item => {
        return item.id === id
      });

      order.order_status = 'Cancelled'
    },
    DELETE_ORDER(state, id){
      let index = state.orders.findIndex(cat => cat.id == id)
      state.orders.splice(index, 1)
    }
  },
  actions: {
      getOrders({commit}){
          axios.get('/api/orders').then( res => {
              commit('SET_ORDERS', res.data)
          }).catch(error => console.log(error))
      },
      getAdminOrders({commit}){
        axios.get('/api/adminorders').then( res => {
            commit('SET_ADMIN_ORDERS', res.data)
        }).catch(error => console.log(error))
    },
  }
}