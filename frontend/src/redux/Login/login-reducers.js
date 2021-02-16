import { IS_AUTH, LOGGED_IN } from "./login-types";

const INITIAL_STATE = {
  isAuth: false,
  loggedIn: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_AUTH:
      console.log(action.payload);
      return {
        ...state,
        isAuth: action.payload,
      };
    case LOGGED_IN:
      return {
        isAuth: true,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
