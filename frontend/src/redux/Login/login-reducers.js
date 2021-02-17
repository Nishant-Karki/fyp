import { LOGGED_IN, USER_DATA } from "./login-types";

const INITIAL_STATE = {
  loggedIn: false,
  userData: [
    {
      user_id: 1,
      name: "Kaizoku Nish",
      email: "karkinishant14@gmail.com",
      phone: "312312",
      gender: "Male",
      dob: "2000-08-03",
      contact: "9840209779",
    },
  ],
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED_IN:
      console.log(action.payload + "dasdsa");
      return {
        ...state,
        loggedIn: action.payload,
      };
    case USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
