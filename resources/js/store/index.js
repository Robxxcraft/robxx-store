import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import category from "./category";
import product from "./product";
import cart from "./cart";
import order from "./order";
import tag from "./tag";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        category,
        product,
        cart,
        order,
        tag
    }
});
