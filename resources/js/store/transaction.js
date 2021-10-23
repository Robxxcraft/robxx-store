import axios from 'axios'

export default {
  namespaced: true,
  state: {
    transaction: [],
    transactions: [],
  },
  mutations: {
    SET_TRANSACTION(state, data){
      state.transaction = data
    },
    SET_TRANSACTIONS(state, data){
      state.transactions = data
    },
    DELETE_TRANSACTION(state, id){
      let index = state.transactions.findIndex(tra => tra.id == id)
      state.transactions.splice(index, 1)
    },
    DELETE_ALL_TRANSACTION(state){
      state.transactions = []
    },
  },
  actions: {
      getTransactions({commit}){
          axios.get('/api/admintransactions').then( res => {
              commit('SET_TRANSACTIONS', res.data)
          }).catch(error => console.log(error))
      },
      getAdminShowTransaction({commit}, id){
        axios.get(`/api/transactions/${id}`).then( res => {
            commit('SET_TRANSACTION', res.data)
        }).catch(error => console.log(error))
    },
  }
}