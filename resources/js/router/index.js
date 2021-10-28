import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";

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
import ShowTransaction from "../views/admin/order/ShowTransaction.vue";
import ManageUsers from "../views/admin/order/ManageUsers.vue";
import ShowUser from "../views/admin/order/ShowUser.vue";

import Settings from "../views/admin/Settings.vue";

import PublicDashboard from "../views/public/PublicDashboard.vue";
import ProductDetails from "../views/public/ProductDetails.vue";
import Products from "../views/public/AllProducts.vue";
import Categories from "../views/public/AllCategories.vue";
import ProductsByCategory from "../views/public/ProductsByCategory.vue";

import Profile from "../views/public/profile/Profile.vue";
import ChangePassword from "../views/public/profile/ChangePassword.vue";
import ProfileSettings from "../views/public/profile/ProfileSettings.vue";

import About from "../views/public/About.vue";

import Cart from "../views/public/cart.vue";
import Favourited from "../views/public/Favourited.vue";
import Checkout from "../views/public/Checkout.vue";
import Orders from "../views/public/Orders.vue";
import OrderDetails from "../views/public/OrderDetails.vue";

import Finished from "../views/public/payment/Finished.vue";
import Unfinished from "../views/public/payment/Unfinished.vue";
import Errors from "../views/public/payment/Errors.vue";
import NotFound from "../views/public/NotFound.vue";

import Search from "../views/public/Search.vue";
import TagProducts from "../views/public/Tag.vue";

import store from '../store/';

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "*",
        component: NotFound,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { guest: true },
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
        path: "/reset-password/:token",
        name: "ResetPassword",
        component: ResetPassword,
        meta: { guest: true },
    },
    {
        path: "/admin",
        name: "Admin",
        meta: { requiresAuth: true },
        meta: { isAdmin: true },
        component: AdminDashboard,
        children: [
            {
                path: "dashboard",
                name: "DashboardAdmin",
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
                component: IndexDashboard,
            },
            {
                path: "category",
                name: "Categories",
                component: ManageCategories,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "category/create",
                name: "CreateCategory",
                component: CreateCategory,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "category/:id/edit",
                name: "EditCategory",
                component: EditCategory,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "product",
                name: "Products",
                component: ManageProducts,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "product/create",
                name: "CreateProduct",
                component: CreateProduct,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "product/:id/edit",
                name: "EditProduct",
                component: EditProduct,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "orders",
                name: "AdminOrders",
                component: ManageOrders,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "orders/:id",
                name: "ShowOrder",
                component: ShowOrder,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "transactions",
                name: "Transactions",
                component: Transactions,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "transaction/:id",
                name: "ShowTransaction",
                component: ShowTransaction,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "users",
                name: "ManageUsers",
                component: ManageUsers,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "user/:id",
                name: "ShowUser",
                component: ShowUser,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
            },
            {
                path: "settings",
                name: "Settings",
                component: Settings,
                meta: { requiresAuth: true },
                meta: { isAdmin: true },
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
                name: "ProductsByCategory",
                component: ProductsByCategory,
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
        path: "/change-password",
        name: "ChangePassword",
        component: ChangePassword,
        meta: { requiresAuth: true },
    },

    {
        path: "/profile-settings",
        name: "ProfileSettings",
        component: ProfileSettings,
        meta: { requiresAuth: true },
    },

    {
        path: "/orders/finished",
        name: "Finished",
        component: Finished,
        meta: { requiresAuth: true },
    },

    {
        path: "/orders/unfinished",
        name: "Unfinished",
        component: Unfinished,
        meta: { requiresAuth: true },
    },

    {
        path: "/orders/error",
        name: "Errors",
        component: Errors,
        meta: { requiresAuth: true },
    },

    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: { requiresAuth: true },
    },
    
    {
        path: "/favourited",
        name: "Favourited",
        component: Favourited,
        meta: { requiresAuth: true },
    },

    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
        meta: { requiresAuth: true },
    },
    {
        path: "/search/:slug",
        name: "Search",
        component: Search,
    },
    {
        path: "/tag/:slug",
        name: "TagProducts",
        component: TagProducts,
    },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];


const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(){
        window.scrollTo(0,0);
    }
});


function loggedIn() {
  return store.getters['auth/authenticated']
}

function isAdmin() {
    const role = store.getters["auth/role"];
     if(role == 'Admin' || role == 'Superadmin' ){
        return true;
     }
  }
  
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
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
            next({
                path: "/admin/dashboard",
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.isAdmin)) {
        if (isAdmin()) {
            next();
        } else{
            next({
                path: "/",
            })
        }
    } else {
        next(); //make sure to always call next()!
    }
});

export default router;
