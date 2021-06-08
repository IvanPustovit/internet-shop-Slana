import { createReducer } from "@reduxjs/toolkit";
import {
  addToShop,
  getItems,
  deleteItem,
  updateItem,
  sortItem,
} from "./action";

const initialState = [];

export const listItemReducer = createReducer(initialState, {
  [addToShop]: (state, { payload }) => [...state, payload],
  [getItems]: (state, action) => [...action.payload],
  [deleteItem]: (state, action) =>
    state.filter((doc) => doc._id !== action.payload),
  [updateItem]: (state, action) =>
    state.map((item) =>
      item._id === action.payload._id ? action.payload : item
    ),
  [sortItem]: (state, action) => {
    state.sort((a, b) => {
      let newState;
      switch (action.payload) {
        case "за збільшенням ціни":
          newState = b.price - a.price;
          return newState;
        case "за зменшенням ціни":
          newState = a.price - b.price;
          return newState;

        default:
          return state;
      }
    });
  },
});
