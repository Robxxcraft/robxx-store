import axios from 'axios'
import { toSafeInteger } from 'lodash';

export default {
  namespaced: true,
  state: {
    tags: []
  },
  getters: {
    get_tags(state){
      return state.tags;
    }
  },
  mutations: {
    SET_TAGS(state, data){
      state.tags = data
    },
    DELETE_TAG(state, id){
      let index = state.tags.findIndex(tag => toSafeInteger.id == id)
      state.tags.splice(index, 1)
    }
  },
  actions: {
      getTags({commit}){
          axios.get('/api/tag').then( res => {
              commit('SET_TAGS', res.data)
          }).catch(error => console.log(error))
      },
      deleteTag({commit}, id){
        axios.delete(`/api/tag/${id}`).then(() =>{
          commit('DELETE_TAG', id)
        })
      }
  }
}