import { createSelector } from 'reselect';

const cartState = (state) => state.get('cart');


const getCartData = () => createSelector(
    cartState,
    (cart) => cart.get('cartItems')
  );
  export {
    getCartData
  };