import { createAction, createReducer } from "@reduxjs/toolkit";

export const addToShop = createAction("ADD_TO_SHOP");
export const getItems = createAction("GET_ITEM");
export const deleteItem = createAction("DELETE_ITEM");
export const updateItem = createAction("UPDATE_ITEM");
// export const getItem = createAction("GET_ITEM");

export const addFilter = createAction("ADD_FILTER");
export const resetFilter = createAction("RESET_FILTER");

export const sortItem = createAction("SORT_ITEM");

export const addToCart = createAction("ADD_TO_CART");
export const deleteToCart = createAction("DELETE_TO_CART");
export const plusAmountItem = createAction("PLUS_AMOUNT_ITEM");
export const minusAmountItem = createAction("MINUS_AMOUNT_ITEM");
export const clearCart = createAction("CLEAR_CART");

export const totalAmount = createAction("TOTAL_AMOUNT");
export const totalPrice = createAction("TOTAL_PRICE");

export const setUser = createAction("SET_USER");
export const deleteUser = createAction("DELETE_USER");
export const addUser = createAction("ADD_USER");

export const addContacts = createAction("ADD_CONTACTS");
export const getContacts = createAction("GET_CONTACTS");
export const addOperatingMode = createAction("ADD_OPERATION_MODE");

export const setError = createAction("ADD_ERROR");
export const clearError = createAction("CLEAR_ERROR");

export const onLoader = createAction("ON_LOADER");
export const offLoader = createAction("OFF_LOADER");

export const setFormItem = createAction("SET_FORM_ITEM");

export const addItems = createAction("ADD_ITEMS");
