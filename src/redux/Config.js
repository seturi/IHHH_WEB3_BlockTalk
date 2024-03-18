import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import modalReducer from "./states/Modals";
import toastReducer from "./states/Toast";
import chatReducer from "./states/Chat";

const rootReducer = combineReducers({ modal: modalReducer, toast: toastReducer, chat: chatReducer });
const store = configureStore({ reducer: rootReducer });

export default store;