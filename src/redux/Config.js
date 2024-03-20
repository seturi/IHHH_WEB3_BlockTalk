import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import modalReducer from "./states/Modals";
import toastReducer from "./states/Toast";
import chatReducer from "./states/Chat";
import accountReducer from "./states/Account";

const rootReducer = combineReducers({ modal: modalReducer, toast: toastReducer, chat: chatReducer, account: accountReducer });
const store = configureStore({ reducer: rootReducer });

export default store;