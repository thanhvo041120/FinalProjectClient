import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: initialState,
    reducers: {
        changeVisibility(state, action){
            state.isOpen = action.payload;
        },
        reset(state){
            Object.assign(state, initialState);
        }
    }
})

export const {changeVisibility, reset} = drawerSlice.actions;
export default drawerSlice.reducer;