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
  HANDLE_PAYMENT,
} from "./booking-types";
import axios from "axios";

export const fetchServices = () => async (dispatch) => {
  try {
    const res = await axios.get("http://192.168.0.104:3001/addServices");
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
    const res = await axios.get("http://192.168.0.104:3001/getStaffs");

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
    await axios.post("http://192.168.0.104:3001/demoteStaff", { id: id });
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
    const res = await axios.get("http://192.168.0.104:3001/getAdmin");
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
    await axios.post("http://192.168.0.104:3001/demoteAdmin", { id: id });
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
    const res = await axios.get("http://192.168.0.104:3001/getAppointment");
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
      const res = await axios.post("http://192.168.0.104:3001/getAppointment", {
        id: id,
      });
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
    const res = await axios.get("http://192.168.0.104:3001/addServices");
    return {
      type: ADD_SERVICE,
      payload: res.data.result,
    };
  } catch (err) {
    console.log(err);
  }
};

export const bookAppointment = (
  serviceId,
  name,
  image,
  price,
  userId,
  time,
  date,
  specialist
) => {
  // axios.post("/bookAppointment", {
  //   serviceId: serviceId,
  //   userId: userId,
  //   time: time,
  //   specialist: specialist,
  // });
  return {
    type: BOOK_APPOINTMENT,
    payload: {
      serviceId: serviceId,
      name: name,
      image: image,
      price: price,
      userId: userId,
      time: time,
      date: date,
      specialist: specialist,
    },
  };
};

export const deleteAppointment = (itemID, userId) => async (dispatch) => {
  await axios.post("http://192.168.0.104:3001/cancelAppointment", {
    service: itemID,
    user: userId,
  });
  dispatch({
    type: DELETE_APPOINTMENT,
    payload: { id: itemID },
  });
};

export const deleteService = (item) => async (dispatch) => {
  const id = item.service_id;
  axios.post("http://192.168.0.104:3001/deleteService", {
    items: item,
    id: id,
  });
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

export const updateService = (values, serviceId) => async (dispatch) => {
  // console.log(data);

  await axios.post("http://192.168.0.104:3001/updateService", {
    values: values,
    id: serviceId,
  });

  const res = await axios.get("http://192.168.0.104:3001/addServices");
  return {
    type: UPDATE_SERVICE,
    // payload: { values: values, id: serviceId },
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

export const handlePayment = (id, option) => async (dispatch) => {
  console.log(id);
  await axios.post("http://192.168.0.104:3001/payment", {
    id: id,
    option: option,
  });
  return { type: HANDLE_PAYMENT };
};
