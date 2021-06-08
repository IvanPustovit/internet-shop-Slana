import { createReducer } from "@reduxjs/toolkit";
import { clearError, setError } from "./action";

export const errorReducer = createReducer(null, {
  [setError]: (state, { payload }) => ({ ...state, ...payload }),
  [clearError]: (state) => null,
});
