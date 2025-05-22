import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import api from "../api/apiSlice";
import track from"../state/trackSlice";

const rootReducer = combineReducers({
  authentication,
  api,
  track
});

export default rootReducer;
