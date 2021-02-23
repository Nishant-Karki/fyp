import {
  AUTH_TOKEN,
  DELETE_ACCOUNT,
  LOGOUT,
  UPDATE_PROFILE,
  USER_DATA,
} from "./login-types";

const INITIAL_STATE = {
  userData: [],
  role: "",
  authToken: null,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
        role: action.payload.map((item) => item.role),
      };
    case AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        loggedIn: false,
        userData: [],
        role: "",
      };

    case DELETE_ACCOUNT:
      return {
        ...state,
        authToken: null,
        loggedIn: false,
        userData: [],
        role: "",
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
