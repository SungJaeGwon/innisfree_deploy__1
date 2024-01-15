import { createSlice } from "@reduxjs/toolkit";

const initState = {
    signOutData: null
}

const signOutDataReducer = createSlice({
    name: 'signOutData',
    initialState: initState,
    reducers: {
        signUpData: (state, action)=>{
            state.signOutData = action.payload
        }
    }
});

export default signOutDataReducer.reducer;
export const { signOutData } = signOutDataReducer.actions;