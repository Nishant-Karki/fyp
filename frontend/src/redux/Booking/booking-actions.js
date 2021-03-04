import {
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_CURRENT_SERVICE,
  FETCH_SERVICES,
  DELETE_SERVICE,
  UPDATE_SERVICE,
  ADD_SERVICE,
  FETCH_STAFFS,
  DEMOTE_STAFFS,
  FETCH_ADMIN,
  DEMOTE_ADMIN,
  FETCH_APPOINTMENT,
  FETCH_USER_APPOINTMENTS,
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

export const fetchStaffs = () => async (dispatch) => {
  try {
    const res = await axios.get("/getStaffs");

    dispatch({
      type: FETCH_STAFFS,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const demoteStaff = (id) => async (dispatch) => {
  try {
    await axios.post("/demoteStaff", { id: id });
    dispatch({
      type: DEMOTE_STAFFS,
      payload: id,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get("/getAdmin");
    dispatch({
      type: FETCH_ADMIN,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const demoteAdmin = (id) => async (dispatch) => {
  try {
    await axios.post("/demoteAdmin", { id: id });
    dispatch({
      type: DEMOTE_ADMIN,
      payload: id,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
export const fetchAppointment = () => async (dispatch) => {
  try {
    const res = await axios.get("/getAppointment");
    dispatch({
      type: FETCH_APPOINTMENT,
      payload: res.data.result,
      // payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserAppointment = (id) => async (dispatch) => {
  try {
    if (id !== undefined) {
      const res = await axios.post("/getAppointment", { id: id });
      console.log(res);
      dispatch({
        type: FETCH_USER_APPOINTMENTS,
        payload: res.data.result,
      });
    }
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

export const bookAppointment = (serviceId, userId, time, specialist) => {
  // axios.post("/bookAppointment", {
  //   serviceId: serviceId,
  //   userId: userId,
  //   time: time,
  //   specialist: specialist,
  // });
  return {
    type: BOOK_APPOINTMENT,
    payload: {},
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

export const updateService = () => async (dispatch) => {
  const res = await axios.get("/addServices");
  return {
    type: UPDATE_SERVICE,
    payload: res.data.result,
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
