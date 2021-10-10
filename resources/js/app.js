/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

import Vue from 'vue'
import router from './router'
import store from './store'
import moment from "moment";
import CKEditor from "ckeditor4-vue";

import '@mdi/font/css/materialdesignicons.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

import Toasted from "vue-toasted";

Vue.use(Vuetify);
Vue.use(CKEditor);
Vue.use(Toasted);

const opts = {
    theme: {
        themes: {
            light: {
                background: colors.grey.lighten3,
                background2: colors.grey.lighten4,
            }
        }
    }
}

Vue.filter('timeformat', (arg) => {
    return moment(arg).format('MMMM Do, YYYY');
});

Vue.filter('sortlength', (text, length, suffix) => {
    if(text.length >= 50){
        return text.substring(0, length)+suffix;
    }
    return text
});

Vue.filter('sortlength', (text, suffix) => {
    if(text.length >= 50){
        return text.substring(0, 50)+suffix;
    }
    return text
});

Vue.filter('titlelength', (text, suffix) => {
    if(text.length >= 25){
        return text.substring(0, 25)+suffix;
    }
    return text
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('main-app', require('./App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

store.dispatch('auth/user').then(() => {
    const app = new Vue({
        el: '#app',
        router,
        store,
        vuetify: new Vuetify(opts)
    });
});