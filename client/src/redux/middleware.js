import axios from "axios";
import {
  addItems,
  addToShop,
  clearError,
  deleteItem,
  getItems,
  setError,
  setFormItem,
  setUser,
  updateItem,
} from "./action";

axios.create({
  //   baseURL: "https://randomuser.me/api/",
  responseType: "json",
});

const initialState = {
  _id: "",
  article: "",
  category: "",
  img: "",
  info: "",
  name: "",
  price: "",
  size: "",
  sizeImg: "",
  species: "",
  styleImg: "",
  MadeIn: "",
};

export const getListItem = (payload) => async (dispatch) => {
  try {
    const data = await axios.get("/api/get");
    dispatch(getItems(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (payload) => async (dispatch) => {
  try {
    const data = await axios.post("/api/auth/login", payload);
    dispatch(setUser(data.data));
    dispatch(setError(null));
  } catch (error) {
    console.log(error.response.data);
    dispatch(setError(error.response.data));
    throw error;
  }
};

export const addUser = (payload) => async (dispatch) => {
  try {
    const data = await axios.post("/api/auth/register", payload);
    dispatch(setError(null));
    return data.data;
  } catch (error) {
    console.log(error.response);
    dispatch(setError(error.response.data));
  }
};

export const getIdItem = (payload) => async (dispatch) => {
  try {
    const data = await axios.get(`/api/goods/${payload}`);
    dispatch(addItems(data.data));
  } catch (error) {
    console.log(error.response);
  }
};

export const addItem = (payload) => async (dispatch) => {
  try {
    const data = await axios.post("/admin/add", payload);
    if (data.data.newItem) {
      dispatch(addToShop(data.data.newItem));
    }
    if (data.data.updateItem) {
      dispatch(updateItem(data.data.updateItem));
    }

    dispatch(setFormItem(initialState));
    dispatch(setError(data.data));
    dispatch(clearError());
  } catch (error) {
    console.log(error.response);
    dispatch(setError(error.response.data));
  }
};

export const deleteItems = (payload) => async (dispatch) => {
  try {
    const data = await axios.delete(`/admin/delete/${payload}`);
    dispatch(deleteItem(payload));
    dispatch(setError(data.data));
    dispatch(clearError());
  } catch (error) {
    console.log(error);
    console.log(error.response);
    dispatch(setError(error.response.data));
  }
};

export const filterItems = (payload) => async (dispatch) => {
  try {
    const data = await axios.get(`/api/shop/${payload}`);
    dispatch(getItems(data.data));
  } catch (error) {
    console.log(error);
    console.log(error.response);
    dispatch(setError(error.response.data));
  }
};
