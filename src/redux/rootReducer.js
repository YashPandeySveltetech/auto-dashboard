/** @format */

import { combineReducers } from "redux";
import UserReducer from "./reducers/userReducer";
import CommonReducer from "./reducers/commonReducer";


const rootReducer = combineReducers({
  user: UserReducer,
  common:CommonReducer
});

export default rootReducer;
