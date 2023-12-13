/** @format */

import { combineReducers } from "redux";
import UserReducer from "./reducers/userReducer";


const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
