require('./bootstrap')

import Vue from 'vue'
import router from './router'
import store from './store'
// import moment from "moment";

// import '@mdi/font/css/materialdesignicons.css';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
// import colors from 'vuetify/lib/util/colors';

import Toasted from "vue-toasted";

// Vue.use(Vuetify);
Vue.use(Toasted);

// const opts = {
//     theme: {
//         themes: {
//             light: {
//                 background: colors.grey.lighten3,
//                 background2: colors.grey.lighten4,
//             }
//         }
//     }
// }

Vue.filter('timeformat', (arg) => {
    return moment(arg).format('MMMM Do, YYYY');
});


Vue.filter('titlelength', (text, suffix) => {
    if(text.length > 20){
        return text.substring(0, 20)+suffix;
    }
    return text
});

Vue.component('main-app', require('./App.vue').default);

store.dispatch('auth/user').then(() => {
    const app = new Vue({
        el: '#app',
        router,
        store,
        // vuetify: new Vuetify(opts)
    });
});