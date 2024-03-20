import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        addModal: false,
        genModal: false,
        entModal: false,
        conModal: false,
        namModal: false
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
        },
        setConModal: (state, action) => {
            state.conModal = action.payload;
        },
        setNamModal:(state, action) => {
            state.namModal = action.payload;
        }
    }
});

export const { setAddModal, setGenModal, setEntModal, setConModal, setNamModal } = modalSlice.actions;
export default modalSlice.reducer;