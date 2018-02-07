import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { qbankReducer } from "./qbankReducer";

export default combineReducers({
  user: authReducer,
  qbank: qbankReducer
});
