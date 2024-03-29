import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';
export const USER_LOGOUT = 'USER_LOGOUT';

export const Store = createContext('');

const userInfoCookie = Cookies.get('userInfo');
let userInfo;

try {
  userInfo = userInfoCookie ? JSON.parse(userInfoCookie) : null;
} catch (error) {
  console.error("Error parsing 'userInfo' cookie:", error);
  userInfo = null;
}

// const shippingAddressCookie = Cookies.get('shippingAddressCookie');
// let shippingAddress;

// shippingAddress = Cookies.get('shippingAddressCookie')
//   ? JSON.parse(shippingAddressCookie)
//   : null;

const shippingAddressCookie = Cookies.get('shippingAddressCookie');
let shippingAddress;

try {
  shippingAddress = shippingAddressCookie
    ? JSON.parse(shippingAddressCookie)
    : null;
} catch (error) {
  console.error("Error parsing 'saveShippingAddress' cookie:", error);
  shippingAddress = null;
}

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
  paymentMethod: Cookies.get('paymentMethod')
    ? Cookies.get('paymentMethod')
    : {},
  // saveShippingAddress: Cookies.get('saveShippingAddress')
  //   ? JSON.parse(Cookies.get('saveShippingAddress'))
  //   : '',

  userInfo: userInfo,

  shippingAddress: shippingAddress,
  // userInfo: Cookies.get('userInfo')
  //   ? JSON.parse(Cookies.get('userInfo'))
  //   : null,
};

// function parseUserData() {
//   // userInfo: Cookies.get('userInfo')
//   try {
//     const jsonData = JSON.parse(Cookies.get('userInfo')) || null;
//     console.log(jsonData);
//   } catch (error) {
//     console.error('Error parsing JSON:', error);
//   }
// }

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

    case 'REMOVE_FROM_CART': {
      // const itemToDelete = action.payload._id;
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    }
    case 'USER_REGISTER': {
      return { ...state, userInfo: [], cart: { cartItems: [] } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
