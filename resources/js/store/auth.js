import axios from "axios";

export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: {}
    },

    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        role(state) {
            if (!state.user) {
                return;
            }
            
            return state.user.role;
        },

        user(state) {
            return state.user;
        }
    },

    actions: {
        user({ commit }) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
            return axios
                .get("/api/user")
                .then(response => {
                    commit("SET_AUTHENTICATED", true);
                    commit("SET_USER", response.data);
                })
                .catch(() => {
                    commit("SET_AUTHENTICATED", false);
                    commit("SET_USER", null);
                });
        },

        logout({commit}){
            axios.post('/logout').then(() => {
                localStorage.removeItem('token')
                commit("SET_AUTHENTICATED", false);
                commit("SET_USER", null);
            })
        }
    },

    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },

        SET_USER(state, value) {
            state.user = value;
        },
    },
};