import { useReducer } from "react";
import {
  UPDATE_GIFTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GIFTS:
      return {
        ...state,
        gifts: [...action.gifts],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.gift],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.gifts],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(gift => {
          if (action._id === gift._id) {
            gift.purchaseQuantity = action.purchaseQuantity
          }
          return gift
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(gift => {
        return gift._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    default:
      return state;
  }
};

export function useGiftReducer(initialState) {
  return useReducer(reducer, initialState)
}