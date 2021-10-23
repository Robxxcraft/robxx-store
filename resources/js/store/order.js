import axios from 'axios'

export default {
  namespaced: true,
  state: {
    order: [],
    orders: [],
    order_detail: [],
    admin_order: [],
    admin_orders: []
  },
  mutations: {
    SET_ORDER(state, data){
      state.order = data
    },
    SET_ORDERS(state, data){
      state.orders = data
    },
    SET_ADMIN_ORDER(state, data){
      state.admin_order = data
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
    CANCEL_ORDER_DETAIL(state, id){
      if(state.order.id == id){
        return state.order.order_status = 'Cancelled'
      }
    },
    DELETE_ORDER(state, id){
      let index = state.orders.findIndex(ord => ord.id == id)
      state.orders.splice(index, 1)
    },
    DELETE_ALL_ORDER(state){
      state.orders = []
    },
  },
  actions: {
      getOrder({commit}, id){
        axios.get(`/api/order/${id}`).then( res => {
            commit('SET_ORDER', res.data)
        }).catch(error => console.log(error))
      },
      getOrders({commit}){
          axios.get('/api/orders').then( res => {
              commit('SET_ORDERS', res.data)
          }).catch(error => console.log(error))
      },
      getAdminShowOrder({commit}, id){
        axios.get(`/api/admin-show-order/${id}`).then( res => {
            commit('SET_ADMIN_ORDER', res.data)
        }).catch(error => console.log(error))
    },
      getAdminOrders({commit}){
        axios.get('/api/adminorders').then( res => {
            commit('SET_ADMIN_ORDERS', res.data)
        }).catch(error => console.log(error))
    },
  }
}