import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        addModal: false,
        genModal: false,
        entModal: false
    },
    reducers: {
        setAddModal: (state, action) => {
            state.addModal = action.payload;
        },
        setGenModal: (state, action) => {
            state.genModal = action.payload;
        },
        setEntModal: (state, action) => {
            state.entModal = action.payload;
        }
    }
});

export const { setAddModal, setGenModal, setEntModal } = modalSlice.actions;
export default modalSlice.reducer;