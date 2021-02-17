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

export const addToCart = (itemID, value) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      qty: value,
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
