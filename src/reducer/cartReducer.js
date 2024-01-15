import { createSlice } from "@reduxjs/toolkit"

const initState = {
    cart: ''
}
const cartReducer = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        cartMethod: (state, action)=>{
            state.cart = action.payload;
        }
    }
});

export default cartReducer.reducer;
export const { cartMethod } = cartReducer.actions;