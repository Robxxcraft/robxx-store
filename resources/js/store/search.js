import axios from 'axios'

export default {
  namespaced: true,
  state: {
    search: [],
  },
  mutations: {
    SET_SEARCHES(state, data){
      state.search = data
    },
    FAVOURITE_SEARCH(state, id){
      let product = state.search.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== true) {
        product.favourite_count++
        product.favourited_count = true
      }
    },
    UNFAVOURITE_SEARCH(state, id){
      let product = state.search.data.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== false) {
        product.favourite_count--
        product.favourited_count = false
      }
    }
  },
  actions: {
      getSearches({commit}, {searchText, page}){
          axios.get(`/api/search/${searchText}/page?page=${page}`).then( res => {
              commit('SET_SEARCHES', res.data)
          }).catch(error => console.log(error))
      },
  }
}