import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import api from "../api/apiSlice";
import track from "../state/trackSlice";
import theme from "../state/themeSlice";

const rootReducer = combineReducers({
  authentication,
  api,
  track,
  theme
});

export default rootReducer;
