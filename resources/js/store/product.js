import axios from 'axios'

export default {
  namespaced: true,
  state: {
    product: [],
    products: [],
    category_products: [],
    homeProducts: []
  },
  getters: {
    get_product(state){
      return state.product;
    },
    get_products(state){
      return state.products;
    },
    get_products_home(state){
      return state.homeProducts;
    }
  },
  mutations: {
    SET_PRODUCT(state, data){
      state.product = data
    },
    SET_PRODUCTS(state, data){
      state.products = data
    },
    SET_CATEGORY_PRODUCTS(state, data){
      state.category_products = data
    },
    SET_PRODUCTS_HOME(state, data){
      state.homeProducts = data
    },
    DELETE_PRODUCT(state, id){
      let index = state.products.findIndex(pro => pro.id == id)
      state.products.splice(index, 1)
    }
  },
  actions: {
      getProduct({commit}, id){
        axios.get(`/api/product/${id}`).then( res => {
            commit('SET_PRODUCT', res.data)
        }).catch(error => console.log(error))
      },
      getProducts({commit}){
          axios.get('/api/product').then( res => {
              commit('SET_PRODUCTS', res.data)
          }).catch(error => console.log(error))
      },
      getCategoryProducts({commit}, slug){
        axios.get(`/api/category_products/${slug}`).then( res => {
            commit('SET_CATEGORY_PRODUCTS', res.data)
        }).catch(error => console.log(error))
      },
      getProductsHome({commit}){
        axios.get('/api/homeproducts').then( res => {
            commit('SET_PRODUCTS_HOME', res.data)
        }).catch(error => console.log(error))
      },
      deleteProduct({commit}, id){
        axios.delete(`/api/product/${id}`).then(() =>{
          commit('DELETE_PRODUCT', id)
        })
      }
  }
}