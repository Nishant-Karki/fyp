import * as actionTypes from "./eStore-types";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/addProducts");
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
  axios.post("/deleteProduct", { items: item });
  return { type: actionTypes.DELETE_PRODUCT, payload: { id: id } };
};

export const updateProduct = (values, productId) => async (dispatch) => {
  console.log(values);
  axios.post("/updateProduct", {
    id: productId,
    values: values,
  });
  const res = await axios.get("/addServices");
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: res.data.result,
  };
};
