import { combineReducers } from "redux";

import eStoreReducer from "./Ecommerce/eStore-reducers";
import loginReducer from "./Login/login-reducers";
import bookingReducer from "./Booking/booking-reducers";

const rootReducer = combineReducers({
  booking: bookingReducer,
  store: eStoreReducer,
  login: loginReducer,
});

export default rootReducer;
