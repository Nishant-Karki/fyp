import { combineReducers } from "redux";

import eStoreReducer from "./Ecommerce/eStore-reducers";
import loginReducer from "./Login/login-reducers";

const rootReducer = combineReducers({
  store: eStoreReducer,
  login: loginReducer,
});

export default rootReducer;
