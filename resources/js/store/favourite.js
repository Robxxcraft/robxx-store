import axios from 'axios'

export default {
  namespaced: true,
  state: {
    favourited: [],
  },
  mutations: {
    SET_FAVOURITED(state, data){
      state.favourited = data
    },
    FAVOURITE_PAGE(state, id){
      let product = state.favourited.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== true) {
        product.favourite_count++
        product.favourited_count = true
      }
    },
    UNFAVOURITE_PAGE(state, id){
      let product = state.favourited.find(item => {
        return item.id === id
      });

      if (product.favourited_count !== false) {
        product.favourite_count--
        product.favourited_count = false
      }
    }
  },
  actions: {
      getFavouritedLists({commit}){
          axios.get('/api/favourited-list').then( res => {
              commit('SET_FAVOURITED', res.data)
          }).catch(error => console.log(error))
      },
  }
}