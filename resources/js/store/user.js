import axios from 'axios'

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state, data){
      state.users = data
    },
    DELETE_USER(state, id){
      let index = state.users.findIndex(usr => usr.id == id)
      state.users.splice(index, 1)
    }
  },
  actions: {
      getUsers({commit}){
          axios.get('/api/allusers').then( res => {
              commit('SET_USERS', res.data)
          }).catch(error => console.log(error))
      },
      deleteUser({commit}, id){
        axios.delete(`/api/user/${id}`).then(() =>{
          commit('DELETE_USER', id)
        })
      }
  }
}