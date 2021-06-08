import { createReducer } from "@reduxjs/toolkit";
import { offLoader, onLoader } from "./action";

export const loadingReducer = createReducer(false, {
  [onLoader]: (state) => true,
  [offLoader]: (state) => false,
});
