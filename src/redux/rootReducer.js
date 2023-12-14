/** @format */

import { combineReducers } from "redux";
import UserReducer from "./reducers/userReducer";
import CommonReducer from "./reducers/commonReducer";
import ModalsReducer from "./reducers/modalsReducer";


const rootReducer = combineReducers({
  user: UserReducer,
  common:CommonReducer,
  modal:ModalsReducer
});

export default rootReducer;
