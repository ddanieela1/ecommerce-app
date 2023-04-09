import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext('');

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const itemExists = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = itemExists
        ? state.cart.cartItems.map((item) =>
            item.name === itemExists.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;

    // case 'ADD_DUPLICATE': {
    //   const addDuplicate = action.payload;
    //   const duplicateItem = state.cart.cartItems.find(
    //     (item) => item._id === itemExists
    //   );

    //   const cartItems = duplicateItem
    //     ? state.cart.cartItems.map((item) =>
    //         item._id === duplicateItem._id ? addDuplicate : item
    //       )
    //     : [...state.cart.cartItems, addDuplicate];
    //   Cookies.set('cartItems', JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
