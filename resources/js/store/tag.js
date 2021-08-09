import axios from 'axios'

export default {
  namespaced: true,
  state: {
    tags: [],
  },
  mutations: {
    SET_TAGS(state, data){
      state.tags = data
    },
  },
  actions: {
      getTags({commit}){
          axios.get('/api/tags').then( res => {
              commit('SET_TAGS', res.data)
          }).catch(error => console.log(error))
      },
  }
}