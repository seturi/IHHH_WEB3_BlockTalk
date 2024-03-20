import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/Config";
import { ContractProvider } from './ContractContext';

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ContractProvider>
            <App />
        </ContractProvider>
    </Provider>
);