import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: [],
    category: {}
  },
  getters: {
    get_categories(state){
      return state.categories;
    }
  },
  mutations: {
    SET_CATEGORIES(state, data){
          state.categories = data
      }
  },
  actions: {
      getCategories({commit}){
          axios.get('/api/categories').then( res => {
              commit('SET_CATEGORIES', res.data)
          }).catch(error => console.log(error))
      }
  }
}