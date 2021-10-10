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
  },
  actions: {
      getSearches({commit}, searchtext){
          axios.post('/api/search', {searchtext}).then( res => {
              commit('SET_SEARCHES', res.data)
          }).catch(error => console.log(error))
      },
  }
}