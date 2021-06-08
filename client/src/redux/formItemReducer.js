import { createReducer } from "@reduxjs/toolkit";
import { setFormItem } from "./action";

export const formItemReducer = createReducer(
  {},
  {
    [setFormItem]: (state, { payload }) => ({ ...state, ...payload }),
  }
);
