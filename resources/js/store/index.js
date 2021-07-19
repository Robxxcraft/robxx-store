import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import category from "./category";
import product from "./product";
import tag from "./tag";
import cart from "./cart"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        category,
        product,
        tag,
        cart
    }
});
