import { IS_AUTH, LOGGED_IN } from "./login-types";

export const isAuth = (auth = false) => {
  console.log(auth + "auth");
  return {
    type: IS_AUTH,
    payload: auth,
  };
};

export const isLoggedIn = (value) => {
  return {
    type: LOGGED_IN,
    payload: value,
  };
};
