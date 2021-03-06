import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import category from "./category";
import product from "./product";
import cart from "./cart";
import order from "./order";
import tag from "./tag";
import search from "./search";
import user from "./user";
import setting from "./setting";
import transaction from "./transaction";
import favourite from "./favourite";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        category,
        product,
        cart,
        order,
        tag,
        search,
        user,
        setting,
        transaction,
        favourite
    }
});
