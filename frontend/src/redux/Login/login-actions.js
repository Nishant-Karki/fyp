import { LOGGED_IN, USER_DATA } from "./login-types";

export const userData = (data) => {
  console.log(data);
  return {
    type: USER_DATA,
    payload: data,
  };
};

export const isLoggedIn = (value) => {
  return {
    type: LOGGED_IN,
    payload: value,
  };
};
