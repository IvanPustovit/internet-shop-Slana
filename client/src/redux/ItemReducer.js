import { createReducer } from "@reduxjs/toolkit";
import { addItems } from "./action";

export const itemReducer = createReducer(
  {},
  {
    [addItems]: (state, { payload }) => ({ ...state, ...payload }),
  }
);
