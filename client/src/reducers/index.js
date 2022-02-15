import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer} from './cartReducer'
import { drawertReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODreducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawertReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
