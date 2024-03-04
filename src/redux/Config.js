import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import modalReducer from "./states/Modals";
import toastReducer from "./states/Toast";

const rootReducer = combineReducers({ modal: modalReducer, toast: toastReducer });
const store = configureStore({ reducer: rootReducer });

export default store;