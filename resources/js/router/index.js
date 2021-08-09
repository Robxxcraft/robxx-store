import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";

import AdminDashboard from "../views/admin/AdminDashboard.vue";
import IndexDashboard from "../views/admin/IndexDashboard.vue";

import ManageCategories from "../views/admin/category/ManageCategories.vue";
import CreateCategory from "../views/admin/category/CreateCategory.vue";
import EditCategory from "../views/admin/category/EditCategory.vue";

import ManageProducts from "../views/admin/product/ManageProducts.vue";
import CreateProduct from "../views/admin/product/CreateProduct.vue";
import EditProduct from "../views/admin/product/EditProduct.vue";

import ManageOrders from "../views/admin/order/ManageOrders.vue";
import ShowOrder from "../views/admin/order/ShowOrder.vue";
import Transactions from "../views/admin/order/Transactions.vue";
import ManageUsers from "../views/admin/order/ManageUsers.vue";

import PublicDashboard from "../views/public/PublicDashboard.vue";
import ProductDetails from "../views/public/ProductDetails.vue";
import Products from "../views/public/AllProducts.vue";
import Categories from "../views/public/AllCategories.vue";
import CategoryProducts from "../views/public/CategoryProducts.vue";
import Profile from "../views/public/Profile.vue";
import EditProfile from "../views/public/EditProfile.vue";
import About from "../views/public/About.vue";

import Cart from "../views/public/cart.vue";
import Checkout from "../views/public/Checkout.vue";
import Orders from "../views/public/Orders.vue";
import OrderDetails from "../views/public/OrderDetails.vue";

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
        path: "/forgot",
        name: "ForgotPassword",
        component: ForgotPassword,
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
            {
                path: "orders",
                name: "AdminOrders",
                component: ManageOrders,
                meta: { requiresAuth: true },
            },
            {
                path: "orders/:id",
                name: "ShowOrder",
                component: ShowOrder,
                meta: { requiresAuth: true },
            },
            {
                path: "transactions",
                name: "Transactions",
                component: Transactions,
                meta: { requiresAuth: true },
            },
            {
                path: "users",
                name: "ManageUsers",
                component: ManageUsers,
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
        path: "/product/:slug/details",
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
        component: Categories,
        children: [
            {
                path: ":slug",
                name: "CategoryProducts",
                component: CategoryProducts,
            } 
        ]
    },
    {
        path: "/orders",
        name: "Orders",
        component: Orders,
        meta: { requiresAuth: true },
    },
    {
        path: "/orders/:id/details",
        name: "OrderDetails",
        component: OrderDetails,
        meta: { requiresAuth: true },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true },
    },

    {
        path: "/profile/edit",
        name: "EditProfile",
        component: EditProfile,
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
