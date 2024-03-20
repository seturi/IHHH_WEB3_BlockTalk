import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        myName: null,
        myPublicKey: null,
        myProvider: null,
        myContract: null,
        isLoggedIn: false
    },
    reducers: {
        setMyName: (state, action) => {
            state.myName = action.payload;
        },
        setMyPublicKey: (state, action) => {
            state.myPublicKey = action.payload;
        },
        setMyProvider: (state, action) => {
            state.myProvider = action.payload;
        },
        setMyContract: (state, action) => {
            state.myContract = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { setMyName, setMyPublicKey, setMyProvider, setMyContract, setIsLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;