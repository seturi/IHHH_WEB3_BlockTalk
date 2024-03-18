import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        index: null
    },
    reducers: {
        setIndex: (state, action) => {
            state.index = action.payload;
        }
    }
})

export const { setIndex } = chatSlice.actions;
export default chatSlice.reducer;