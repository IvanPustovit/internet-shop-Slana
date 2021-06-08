import { createReducer } from "@reduxjs/toolkit";
import { addUser, deleteUser, setUser } from "./action";

export const userReducer = createReducer(null, {
  [setUser]: (state, { payload }) => ({ ...state, ...payload }),
  [deleteUser]: (state) => null,
});
