import axios from 'axios'

export default {
  namespaced: true,
  state: {
    tags: [],
    tag_products: []
  },
  mutations: {
    SET_TAGS(state, data){
      state.tags = data
    },
    SET_TAG_PRODUCTS(state, data){
      state.tag_products = data
    },
    FAVOURITE_TAG(state, id){
      let product = state.tag_products.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== true) {
        product.favourite_count++
        product.favourited_count = true
      }
    },
    UNFAVOURITE_TAG(state, id){
      let product = state.tag_products.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== false) {
        product.favourite_count--
        product.favourited_count = false
      }
    }
  },
  actions: {
      getTags({commit}){
          axios.get('/api/tags').then( res => {
              commit('SET_TAGS', res.data)
          }).catch(error => console.log(error))
      },
      getTagProducts({commit}, {slug, page}){
        axios.get(`/api/tag_products/${slug}/page?page=${page}`).then( res => {
            commit('SET_TAG_PRODUCTS', res.data)
        }).catch(error => console.log(error))
    },
  }
}