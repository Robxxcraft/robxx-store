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
  },
  actions: {
      getTags({commit}){
          axios.get('/api/tags').then( res => {
              commit('SET_TAGS', res.data)
          }).catch(error => console.log(error))
      },
      getTagProducts({commit}, slug){
        axios.get(`/api/tag_products/${slug}`).then( res => {
            commit('SET_TAG_PRODUCTS', res.data)
        }).catch(error => console.log(error))
    },
  }
}