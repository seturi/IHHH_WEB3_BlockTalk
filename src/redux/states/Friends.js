import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name: "friends",
    initialState: {
        list: []
    },
    reducers: {
        addFriend: {
            prepare(name, publicKey) {
                return { payload: { name, publicKey } };
            },
            reducer(state, action) {
                state.list.push(...action.payload);
            }
        }
    }
});

export const { addFriend } = friendSlice.actions;
export default friendSlice.reducer;