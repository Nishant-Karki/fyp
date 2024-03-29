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

export const handleStorePayment = (cart) => async (dispatch) => {
  await axios.post("/productBooking", { cart: cart });

  dispatch({
    type: actionTypes.STORE_PAYMENT,
  });
};

export const fetchOrder = () => async (dispatch) => {
  try {
    const res = await axios.get("/productBooking");
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
      const res = await axios.post("/orderDetails", { id: id });
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
