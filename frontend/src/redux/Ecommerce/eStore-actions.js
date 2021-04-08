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

export const addToCart = (itemID, value, userId) => async (dispatch) => {
  // axios.post("/bookProduct", (itemID, value, userId));
  // console.log(itemID);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      itemId: itemID,
      qty: value,
      userId: userId,
    },
  });
};

export const removeFromCart = (itemID) => {
  console.log(itemID);
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: { id: itemID },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const addProduct = (data) => async (dispatch) => {
  try {
    await axios.post("/addProducts", data);
    // const res = await axios.get("/addProducts");
    dispatch({
      type: actionTypes.ADD_PRODUCT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteProduct = (item) => async (dispatch) => {
  const id = item.product_id;
  await axios.post("/deleteProduct", { items: item });
  const res = await axios.get("/addProducts");
  dispatch({ type: actionTypes.DELETE_PRODUCT, payload: res.data.result });
};

export const updateProduct = (values, productId) => async (dispatch) => {
  console.log(values);
  await axios.post("/updateProduct", {
    id: productId,
    values: values,
  });
  const res = await axios.get("/addServices");
  dispatch({
    type: actionTypes.UPDATE_PRODUCT,
    payload: res.data.result,
  });
};

export const handleStorePayment = (itemId, userId, qty, price) => async (
  dispatch
) => {
  console.log(qty);
  dispatch({
    type: actionTypes.STORE_PAYMENT,
  });
};
