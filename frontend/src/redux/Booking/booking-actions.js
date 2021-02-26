import {
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_CURRENT_SERVICE,
  FETCH_SERVICES,
  DELETE_SERVICE,
  UPDATE_SERVICE,
  ADD_SERVICE,
} from "./booking-types";
import axios from "axios";

export const fetchServices = () => async (dispatch) => {
  try {
    const res = await axios.get("/addServices");
    dispatch({
      type: FETCH_SERVICES,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addService = (item, image) => async (dispatch) => {
  try {
    const res = await axios.get("/addServices");
    return {
      type: ADD_SERVICE,
      payload: res.data.result,
    };
  } catch (err) {
    console.log(err);
  }
};

export const bookAppointment = (itemID, value) => {
  return {
    type: BOOK_APPOINTMENT,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const deleteAppointment = (itemID) => {
  console.log(itemID);
  return { type: DELETE_APPOINTMENT, payload: { id: itemID } };
};

export const deleteService = (item) => async (dispatch) => {
  const id = item.service_id;
  axios.post("/deleteService", { items: item, id: id });
  // const res = await axios.get("/addServices");
  // console.log(res);
  // console.log(id);
  // return { type: DELETE_SERVICE, payload: id };
  return {
    type: DELETE_SERVICE,
    payload: { id: id },
  };
};

export const loadCurrentService = (item) => {
  return {
    type: LOAD_CURRENT_SERVICE,
    payload: item,
  };
};

export const updateService = (image, id) => {
  // axios.post("/updateService", );
  return {
    type: UPDATE_SERVICE,
    payload: { image: image, id: id },
  };
  // const res = await axios.get("/addServices");
  // console.log(res);
  // return{
  //   type:UPDATE_SERVICE,payload
  // }
  // dispatch({
  //   type: UPDATE_SERVICE,
  //   payload: res.data.result,
  // });
};
