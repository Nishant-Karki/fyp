import {
  AUTH_TOKEN,
  DELETE_ACCOUNT,
  LOGOUT,
  USER_DATA,
  UPDATE_PROFILE,
} from "./login-types";
import axios from "axios";

export const userData = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

export const authToken = (value) => {
  return {
    type: AUTH_TOKEN,
    payload: value,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const deleteAccount = (id) => {
  axios.post("/deleteAccount", { id: id });
  return {
    type: DELETE_ACCOUNT,
  };
};

export const updateProfile = (data) => async (dispatch) => {
  const res = await axios.post(`/profileImage`, data);
  console.log(res);
  return {
    type: UPDATE_PROFILE,
    payload: res.data.result,
  };
};
