import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: [],
    homecategories: []
  },
  getters: {
    get_categories(state){
      return state.categories;
    },
  },
  mutations: {
    SET_CATEGORIES(state, data){
      state.categories = data
    },
    SET_CATEGORIES_HOME(state, data){
      state.homecategories = data
    },
    DELETE_CATEGORY(state, id){
      let index = state.categories.findIndex(cat => cat.id == id)
      state.categories.splice(index, 1)
    },
    DELETE_ALL_CATEGORY(state){
      state.categories = []
    }
  },
  actions: {
      getCategories({commit}){
          axios.get('/api/category').then( res => {
              commit('SET_CATEGORIES', res.data)
          }).catch(error => console.log(error))
      },
      getCategoriesHome({commit}){
        axios.get('/api/homecategory').then( res => {
            commit('SET_CATEGORIES_HOME', res.data)
        }).catch(error => console.log(error))
      },
      deleteCategory({commit}, id){
        axios.delete(`/api/category/${id}`).then(() =>{
          
          commit('DELETE_CATEGORY', id)
        })
      },
      deleteAllCategory({commit}){
        axios.post('/api/category/delete-all').then(res =>{
          console.log(res.data)
          commit('DELETE_ALL_CATEGORY')
        })
      }
  }
}