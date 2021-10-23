import axios from 'axios'

export default {
  namespaced: true,
  state: {
    settings: [],
  },
  mutations: {
    SET_SETTINGS(state, data){
      state.settings = data
    },
  },
  actions: {
      getSettings({commit}){
          axios.get('/api/settings').then( res => {
              commit('SET_SETTINGS', res.data)
          }).catch(error => console.log(error))
      },
  }
}