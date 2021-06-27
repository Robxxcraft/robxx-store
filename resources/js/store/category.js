import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    get_categories(state){
      return state.categories;
    }
  },
  mutations: {
    SET_CATEGORIES(state, data){
      state.categories = data
    },
    DELETE_CATEGORY(state, id){
      let index = state.categories.findIndex(cat => cat.id == id)
      state.categories.splice(index, 1)
    }
  },
  actions: {
      getCategories({commit}){
          axios.get('/api/category').then( res => {
              commit('SET_CATEGORIES', res.data)
          }).catch(error => console.log(error))
      },
      deleteCategory({commit}, id){
        axios.delete(`/api/category/${id}`).then(() =>{
          commit('DELETE_CATEGORY', id)
        })
      }
  }
}