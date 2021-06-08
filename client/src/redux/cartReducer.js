import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteToCart,
  plusAmountItem,
  minusAmountItem,
  clearCart,
} from "./action";

export const cartReducer = createReducer([], {
  [addToCart]: (state, { payload }) => [...state, payload],

  [deleteToCart]: (state, { payload }) => {
    state.splice(payload, 1);
  },

  [plusAmountItem]: (state, { payload }) => {
    state[payload] = {
      ...state[payload],
      amountInCart: state[payload].amountInCart + 1,
    };
  },
  [minusAmountItem]: (state, { payload }) => {
    state[payload] = {
      ...state[payload],
      amountInCart:
        state[payload].amountInCart > 1 ? state[payload].amountInCart - 1 : 0,
    };
  },
  [clearCart]: (state) => [],
});
