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
    },
    ADD_ADMIN(state, id){
      let user = state.users.find(i => i.id == id);
      user.role = 'Admin'
    },
    DELETE_ADMIN(state, id){
      let user = state.users.find(i => i.id == id);
      user.role = 'User'
    },
  },
  actions: {
      getUsers({commit}){
          axios.get('/api/allusers').then( res => {
              commit('SET_USERS', res.data)
          }).catch(error => console.log(error))
      },
  }
}