import {
  ADD_TO_CART,
  CHECKOUT_FAILURE,
  CHECKOUT_SUCCESS,
  GET_PRODUCTS,
  REMOVE_FROM_CART,
  ShopAction,
} from '@actions/shop';
import { RootAction, RootState } from '@store';
import { Reducer } from 'redux';
import { createSelector } from 'reselect';

export interface ShopState {
  products: ProductsState;
  cart: CartState;
  error: string;
}
export interface ProductsState {
  [index: string]: ProductState;
}
export interface ProductState {
  id: number;
  title: string;
  price: number;
  inventory: number;
}
export interface CartState {
  [index: string]: number;
}
export interface CartItem {
  id: number;
  title: string;
  amount: number;
  price: number;
}

const INITIAL_STATE: ShopState = {
  cart: {},
  error: '',
  products: {},
};

const shop: Reducer<ShopState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        cart: cart(state.cart, action),
        error: '',
        products: products(state.products, action),
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        error: 'Checkout failed. Please try again',
      };
    default:
      return state;
  }
};

// Slice reducer: it only reduces the bit of the state it's concerned about.
const products = (state: ProductsState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      const productId = action.productId;
      return {
        ...state,
        [productId]: product(state[productId], action),
      };
    default:
      return state;
  }
};

const product = (state: ProductState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: state.inventory + 1,
      };
    default:
      return state;
  }
};

const cart = (state: CartState, action: ShopAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addId = action.productId;
      return {
        ...state,
        [addId]: (state[addId] || 0) + 1,
      };
    case REMOVE_FROM_CART:
      const removeId = action.productId;
      const quantity = (state[removeId] || 0) - 1;
      if (quantity <= 0) {
        const newState = { ...state };
        delete newState[removeId];
        return newState;
      }
      return {
        ...state,
        [removeId]: quantity,
      };
    case CHECKOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default shop;

// Per Redux best practices, the shop data in our store is structured
// for efficiency (small size and fast updates).
//
// The _selectors_ below transform store data into specific forms that
// are tailored for presentation. Putting this logic here keeps the
// layers of our app loosely coupled and easier to maintain, since
// views don't need to know about the store's internal data structures.
//
// We use a tiny library called `reselect` to create efficient
// selectors. More info: https://github.com/reduxjs/reselect.

const cartSelector = (state: RootState) => state.shop!.cart;
const productsSelector = (state: RootState) => state.shop!.products;

// Return a flattened array representation of the items in the cart
export const cartItemsSelector = createSelector(
  cartSelector,
  productsSelector,
  (cartVal, productsVal) => {
    return Object.keys(cartVal).map((id) => {
      const item = productsVal[id];
      return {
        amount: cartVal[id],
        id: item.id,
        price: item.price,
        title: item.title,
      };
    });
  },
);

// Return the total cost of the items in the cart
export const cartTotalSelector = createSelector(
  cartSelector,
  productsSelector,
  (cartVal, productsVal) => {
    let total = 0;
    Object.keys(cartVal).forEach((id) => {
      const item = productsVal[id];
      total += item.price * cartVal[id];
    });
    return Math.round(total * 100) / 100;
  },
);

// Return the number of items in the cart
export const cartQuantitySelector = createSelector(
  cartSelector,
  (cartVal) => {
    let num = 0;
    Object.keys(cartVal).forEach((id) => {
      num += cartVal[id];
    });
    return num;
  },
);
