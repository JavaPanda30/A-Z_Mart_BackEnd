import { combineReducers } from "redux"; // Correctly importing combineReducers
import { configureStore } from "@reduxjs/toolkit"; // Correctly importing configureStore
import { thunk } from "redux-thunk";

// Define your root reducer using combineReducers
const rootReducer = combineReducers({});

const initialState = {};
const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
