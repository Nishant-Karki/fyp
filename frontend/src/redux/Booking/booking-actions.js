import {
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_CURRENT_SERVICE,
  FETCH_SERVICES,
} from "./booking-types";
import axios from "axios";

export const fetchServices = () => async (dispatch) => {
  try {
    const res = await axios.get("/addServices");
    console.log(res + "sdasd");
    dispatch({
      type: FETCH_SERVICES,
      payload: [{ s: "asdas", a: "sadsad" }],
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
fetchServices();

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

export const loadCurrentService = (item) => {
  return {
    type: LOAD_CURRENT_SERVICE,
    payload: item,
  };
};
