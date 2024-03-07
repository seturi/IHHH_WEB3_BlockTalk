import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        type: null,
        message: "",
        isOpen: false
    },
    reducers: {
        open: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.isOpen = true;
        },
        close: (state) => {
            state.type = null;
            state.message = "";
            state.isOpen = false;
        }
    }
});

export const toastType = {
    INFO: "informational",
    SUCC: "success",
    FAIL: "fail"
};

export const { open, close } = toastSlice.actions;
export default toastSlice.reducer;