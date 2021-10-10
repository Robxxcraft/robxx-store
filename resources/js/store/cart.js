import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: [],
    cart_page: [],
    index: null,
    last_page: null,
    total_cart: null,
  },
  getters: {
    cartItemCount(state){
        return state.cart.length;
    },

    cartTotalPrice(state){
        let total = 0;
    
        state.cart.forEach(item => {
            total += item.product.price * item.quantity;
        })
    
        return total
    },

    cartTotalQuantity(state){
        let total = 0;
    
        state.cart.forEach(item => {
            total += item.quantity;
        })
    
        return total
    }
  },
  mutations: {
    ADD_TO_CART(state, {product, quantity}){

        let cartExitst = state.cart.find(item => {
            return item.product.id === product.id;
        });

        if(cartExitst){
            cartExitst.quantity += quantity;
            return;
        }
    
        return state.cart.push({product, quantity})
    },
    
    SET_CART(state, cartItems){
        state.cart = cartItems;
    },

    SET_CART_PAGE(state, cart){
        state.cart_page = cart.cart.data;
        state.last_page = cart.cart.last_page;
        state.total_cart = cart.cart.total;
        state.index = cart.index;
    },
    
    REMOVE_CART(state, product){
        let index_page = state.cart_page.findIndex(pro => pro.id == product.id)
        state.cart_page.splice(index_page, 1);

        let index = state.cart.findIndex(pro => pro.id == product.id)
        state.cart.splice(index, 1)
    },
    
    CLEAR_CART(state){
        state.cart = [];
    }
  },
  actions: {
    addProductToCart({commit}, {product, quantity}){
        commit('ADD_TO_CART', {product, quantity});
        axios.post('/api/cart', {
            product_id : product.id,
            quantity
        });
    },
    
    getCartItems({commit}){
        axios.get('/api/cart').then(response => {
            commit('SET_CART', response.data);
        })
    },

    getCartPageItems({commit}, page){
        axios.get(`/api/cart_page?page=${page}`).then(response => {
            commit('SET_CART_PAGE', response.data);
        })
    },
    
    removeCart({commit}, product){
        commit('REMOVE_CART', product);
    
        axios.delete(`/api/cart/${product.id}`)
    },
    
    clearCart({commit}){
        commit('CLEAR_CART');
    
        axios.delete('/api/cart-clear/');
    }
  }
}