import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import taskReducer from "./reducers/taskReducer.js";

const store = configureStore({
  reducer: taskReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;