const { createReducer } = require("@reduxjs/toolkit");
const { addFilterAdmin } = require("./adminAction");

const initialState = {
  filterAdmin: "",
};
export const adminReducer = createReducer(initialState, {
  [addFilterAdmin]: (state) => state,
});
