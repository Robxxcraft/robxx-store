import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

import AdminDashboard from "../views/admin/AdminDashboard.vue";

import ManageCategories from "../views/admin/category/Manages.vue";
import CreateCategory from "../views/admin/category/Create.vue";
import EditCategory from "../views/admin/category/Edit.vue";

import ManageProducts from "../views/admin/product/ManageProducts.vue";
import CreateProduct from "../views/admin/product/CreateProduct.vue";
import EditProduct from "../views/admin/product/EditProduct.vue";

import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guest: true },
    },
    {
        path: "/admin",
        name: "Admin",
        component: AdminDashboard,
        meta: { requiresAuth: true },
        children: [
            {
                path: "category",
                name: "Categories",
                components: ManageCategories,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "create",
                        name: "CreateCategory",
                        components: CreateCategory,
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "edit",
                        name: "EditCategory",
                        components: EditCategory,
                        meta: { requiresAuth: true }
                    }
                ]
            },
            {
                path: "/product",
                name: "Products",
                components: ManageProducts,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "create",
                        name: "CreateProduct",
                        components: CreateProduct,
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "edit",
                        name: "EditProduct",
                        components: EditProduct,
                        meta: { requiresAuth: true },
                    }
                ]
            }
        ]
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];




const router = new VueRouter({
    mode: "history",
    routes
});

function loggedIn() {
  return store.getters['auth/authenticated']
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //this router require auth, check if logged in
        //if not, redirect to login page
        if (!loggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (loggedIn()) {
            //so if user loggedIn true -> redirect to dashboard
            next({
                path: "/admin",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); //make sure to always call next()!
    }
});

export default router;
