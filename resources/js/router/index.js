import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

import AdminDashboard from "../views/admin/AdminDashboard.vue";
import IndexDashboard from "../views/admin/IndexDashboard.vue";

import ManageCategories from "../views/admin/category/ManageCategories.vue";
import CreateCategory from "../views/admin/category/CreateCategory.vue";
import EditCategory from "../views/admin/category/EditCategory.vue";

import ManageProducts from "../views/admin/product/ManageProducts.vue";
import CreateProduct from "../views/admin/product/CreateProduct.vue";
import EditProduct from "../views/admin/product/EditProduct.vue";

import PublicDashboard from "../views/public/PublicDashboard.vue";
import ProductDetails from "../views/public/ProductDetails.vue";
import Products from "../views/public/AllProducts.vue";
import Categories from "../views/public/AllCategories.vue";
import CategoryProducts from "../views/public/CategoryProducts.vue";
import Profile from "../views/public/Profile.vue";
import About from "../views/public/About.vue";

import Cart from "../views/public/cart.vue";
import Checkout from "../views/public/Checkout.vue";

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
        meta: { requiresAuth: true },
        component: AdminDashboard,
        children: [
            {
                path: "dashboard",
                name: "DashboardAdmin",
                meta: { requiresAuth: true },
                component: IndexDashboard,
            },
            {
                path: "category",
                name: "Categories",
                component: ManageCategories,
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: "category/create",
                name: "CreateCategory",
                component: CreateCategory,
                meta: { requiresAuth: true },
            },
            {
                path: "category/:id/edit",
                name: "EditCategory",
                component: EditCategory,
                meta: { requiresAuth: true },
            },
            {
                path: "product",
                name: "Products",
                component: ManageProducts,
                meta: { requiresAuth: true },
            },
            {
                path: "product/create",
                name: "CreateProduct",
                component: CreateProduct,
                meta: { requiresAuth: true },
            },
            {
                path: "product/:id/edit",
                name: "EditProduct",
                component: EditProduct,
                meta: { requiresAuth: true },
            },

        ]
    },
    {
        path: "/dashboard",
        name: "PublicDashboard",
        component: PublicDashboard,
    },
    {
        path: "/product/:id/details",
        name: "ProductDetails",
        component: ProductDetails,
    },
    {
        path: "/products",
        name: "AllProducts",
        component: Products,
    },
    {
        path: "/categories",
        name: "AllCategories",
        component: Categories
    },
    {
        path: "/categories/:slug",
        name: "CategoryProducts",
        component: CategoryProducts,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: { requiresAuth: true },
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
        meta: { requiresAuth: true },
    },

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
