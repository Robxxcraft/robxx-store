import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
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
  },
  actions: {
      getOrders({commit}){
          axios.get('/api/orders').then( res => {
              commit('SET_ORDERS', res.data)
          }).catch(error => console.log(error))
      },
  }
}