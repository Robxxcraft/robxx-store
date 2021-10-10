import axios from 'axios'

export default {
  namespaced: true,
  state: {
    transactions: [],
  },
  mutations: {
    SET_TRANSACTIONS(state, data){
      state.transactions = data
    },
  },
  actions: {
      getTransactions({commit}){
          axios.get('/api/admintransactions').then( res => {
              commit('SET_TRANSACTIONS', res.data)
          }).catch(error => console.log(error))
      },
  }
}