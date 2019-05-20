export function storeCartData(cartData) {
    return {
      type: "STORE_CART",
      cartData: cartData,
    };
  }