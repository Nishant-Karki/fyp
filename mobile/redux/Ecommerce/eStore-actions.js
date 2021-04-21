import * as actionTypes from "./eStore-types";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://192.168.0.103:3001/addProducts");
    dispatch({
      type: actionTypes.FETCH_PRODUCTS,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (itemID, value, userId) => {
  console.log(value);
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      itemId: itemID,
      qty: value,
      userId: userId,
    },
  };
};

export const removeFromCart = (itemID) => {
  console.log(itemID);
  return { type: actionTypes.REMOVE_FROM_CART, payload: { id: itemID } };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const deleteProduct = (item) => {
  const id = item.product_id;
  axios.post("http://192.168.0.103:3001/deleteProduct", { items: item });
  return { type: actionTypes.DELETE_PRODUCT, payload: { id: id } };
};

export const updateProduct = (values, productId) => async (dispatch) => {
  console.log(values);
  axios.post("http://192.168.0.103:3001/updateProduct", {
    id: productId,
    values: values,
  });
  const res = await axios.get("http://192.168.0.103:3001/addServices");
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: res.data.result,
  };
};

export const handleStorePayment = (cart) => async (dispatch) => {
  axios.post("http://192.168.0.103:3001/productBooking", { cart: cart });
  dispatch({
    type: actionTypes.STORE_PAYMENT,
  });
};

export const fetchOrder = () => async (dispatch) => {
  try {
    const res = await axios.get("http://192.168.0.103:3001/productBooking");
    dispatch({
      type: actionTypes.FETCH_ORDER,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserOrder = (id) => async (dispatch) => {
  try {
    if (id !== undefined) {
      const res = await axios.post("http://192.168.0.103:3001/orderDetails", {
        id: id,
      });
      console.log(res);
      dispatch({
        type: actionTypes.FETCH_USER_ORDER,
        payload: res.data.result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
