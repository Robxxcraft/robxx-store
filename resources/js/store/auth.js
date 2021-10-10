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

        user(state) {
            return state.user;
        }
    },

    actions: {
        async login({ dispatch }, credentials) {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", credentials).then(() => {
                return dispatch("user");
            })
        },


        user({ commit }) {
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

        async logout({commit}){
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/logout").then(() => {
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