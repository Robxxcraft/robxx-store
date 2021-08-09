import axios from 'axios'

export default {
  namespaced: true,
  state: {
    product: [],
    products: [],
    category_products: [],
    recentProducts: [],
    relatedProducts: [],
  },
  getters: {
    get_product(state){
      return state.product;
    },
    get_products(state){
      return state.products;
    },
    get_recent_products(state){
      return state.recentProducts;
    },
    get_related_products(state){
      return state.relatedProducts;
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
    SET_RECENT_PRODUCTS(state, data){
      state.recentProducts = data
    },
    SET_RELATED_PRODUCTS(state, data){
      state.relatedProducts = data
    },
    FAVOURITE(state, id){
      if(state.product.id == id){
        state.product.favourited_count = true
      }
    },
    UNFAVOURITE(state, id){
      if(state.product.id == id){
        state.product.favourited_count = false
      }
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
      getRecentProducts({commit}){
        axios.get('/api/recentproducts').then( res => {
            commit('SET_RECENT_PRODUCTS', res.data)
        }).catch(error => console.log(error))
      },
      getRelatedProducts({commit}, id){
        axios.get(`api/relatedproducts/${id}`).then( res => {
            commit('SET_RELATED_PRODUCTS', res.data)
        }).catch(error => console.log(error))
      },
      deleteProduct({commit}, id){
        axios.delete(`/api/product/${id}`).then(() =>{
          commit('DELETE_PRODUCT', id)
        })
      }
  }
}