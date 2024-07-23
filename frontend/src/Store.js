import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
