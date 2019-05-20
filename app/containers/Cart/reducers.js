
import { fromJS } from 'immutable';


export const initialState = fromJS({
  locale: {},
});

function cartStoreReducer(state = initialState, action) {
  switch (action.type) {
    case "STORE_CART":
      return state.set('cartItems', action.cartData);
    default:
      return state;
  }
}

export default cartStoreReducer;
