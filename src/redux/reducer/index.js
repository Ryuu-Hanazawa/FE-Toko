import { combineReducers } from "redux";

import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default reducer;
