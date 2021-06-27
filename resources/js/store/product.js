import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    get_products(state){
      return state.products;
    }
  },
  mutations: {
    SET_PRODUCTS(state, data){
      state.products = data
    },
    DELETE_PRODUCT(state, id){
      let index = state.products.findIndex(pro => pro.id == id)
      state.products.splice(index, 1)
    }
  },
  actions: {
      getProducts({commit}){
          axios.get('/api/product').then( res => {
              commit('SET_PRODUCTS', res.data)
          }).catch(error => console.log(error))
      },
      deleteProduct({commit}, id){
        axios.delete(`/api/product/${id}`).then(() =>{
          commit('DELETE_PRODUCT', id)
        })
      }
  }
}