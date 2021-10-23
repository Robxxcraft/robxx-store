import axios from 'axios'

export default {
  namespaced: true,
  state: {
    product: [],
    products: [],
    sale: [],
    allproducts: [],
    products_by_category: [],
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
    get_last_page_all_products(state){
      return state.allproducts.last_page;
    },
    get_total_all_products(state){
      return state.allproducts.total;
    },
    get_last_page_prodbycat(state){
      return state.products_by_category.last_page;
    },
  },
  mutations: {
    SET_PRODUCT(state, data){
      state.product = data
    },
    SET_PRODUCTS(state, data){
      state.products = data
    },
    SET_SALE(state, data){
      state.sale = data
    },
    SET_ALL_PRODUCTS(state, data){
      state.allproducts = data
    },
    SET_PRODUCTS_BY_CATEGORY(state, data){
      state.products_by_category = data
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
        state.product.favourite_count++
      }
    },
    UNFAVOURITE(state, id){
      let product = state.product;
      if(product.id == id){
        product.favourited_count = false
        product.favourite_count--
      }
    },
    DELETE_PRODUCT(state, id){
      let index = state.products.findIndex(pro => pro.id == id)
      state.products.splice(index, 1)
    },
    DELETE_ALL_PRODUCT(state){
      state.products = []
    },
    FAVOURITE_ALLPRODUCTS(state, id){
      let product = state.allproducts.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== true) {
        product.favourite_count++
        product.favourited_count = true
      }
    },
    UNFAVOURITE_ALLPRODUCTS(state, id){
      let product = state.allproducts.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== false) {
        product.favourite_count--
        product.favourited_count = false
      }
    },
    FAVOURITE_PRODUCTSBYCATEGORY(state, id){
      let product = state.products_by_category.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== true) {
        product.favourite_count++
        product.favourited_count = true
      }
    },
    UNFAVOURITE_PRODUCTSBYCATEGORY(state, id){
      let product = state.products_by_category.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== false) {
        product.favourite_count--
        product.favourited_count = false
      }
    },
  },
  actions: {
      getProduct({commit}, slug){
        axios.get(`/api/product/${slug}`).then( res => {
            commit('SET_PRODUCT', res.data)
        }).catch(error => console.log(error))
      },
      getProducts({commit}){
          axios.get('/api/product').then( res => {
              commit('SET_PRODUCTS', res.data)
          }).catch(error => console.log(error))
      },
      getSale({commit}){
          axios.get('/api/sale').then( res => {
              commit('SET_SALE', res.data)
          }).catch(error => console.log(error))
      },
      getAllProducts({commit}, page){
          axios.get(`/api/allproducts?page=${page}`).then( res => {
              commit('SET_ALL_PRODUCTS', res.data)
          }).catch(error => console.log(error))
      },
      getProductsByCategory({commit}, {slug, page}){
        axios.get(`/api/products_by_category/${slug}/page?page=${page}`).then( res => {
            commit('SET_PRODUCTS_BY_CATEGORY', res.data)
        }).catch(error => console.log(error))
      },
      getRecentProducts({commit}){
        axios.get('/api/recentproducts').then( res => {
            commit('SET_RECENT_PRODUCTS', res.data)
        }).catch(error => console.log(error))
      },
      getRelatedProducts({commit}, id){
        axios.get(`/api/relatedproducts/${id}`).then( res => {
            console.log(res.data)
            commit('SET_RELATED_PRODUCTS', res.data)
        }).catch(error => console.log(error))
      },
      deleteProduct({commit}, id){
        axios.delete(`/api/product/${id}`).then(() =>{
          commit('DELETE_PRODUCT', id)
        })
      },
      deleteAllProduct({commit}){
        axios.get('/api/product/all').then(() =>{
          commit('DELETE_ALL_PRODUCT')
        })
      }
  }
}