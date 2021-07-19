import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: [],
    cart_page: []
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
    }
  },
  mutations: {
    ADD_TO_CART(state, {product, quantity}){

        let productInCart = state.cart.find(item => {
            return item.product.id === product.id;
        });
    
        if(productInCart){
            productInCart.quantity += quantity;
            return;
        }
    
        state.cart.push({
            product,
            quantity
        })
    },
    
    SET_CART(state, cartItems){
        state.cart = cartItems;
    },

    SET_CART_PAGE(state, cart){
        state.cart_page = cart;
    },
    
    REMOVE_PRODUCT_FROM_CART(state, product){
        state.cart = state.cart.filter(item => {
            return item.product.id !== product.id;
        })
    },
    
    CLEAR_CART_ITEM(state){
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
    
    removeProductFromCart({commit}, product){
        commit('REMOVE_PRODUCT_FROM_CART', product);
    
        axios.delete(`/api/cart/${product.id}`)
    },
    
    clearCartItem({commit}){
        commit('CLEAR_CART_ITEM');
    
        axios.delete('/api/cart/');
    }
  }
}