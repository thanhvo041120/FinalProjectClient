import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isContainData: false,
    categoryId: 0,
    categoryName: "All",
}

const viewDataSlice = createSlice({
    name: 'view_book',
    initialState: initialState,
    reducers: {
        containData(state, action){
            state.isContainData = action.payload.isContainData;
        },
        setCategory(state, action){
            state.categoryId = action.payload.categoryId;
            state.categoryName = action.payload.categoryName;
        },
        reset(state){
            Object.assign(state, initialState);
        }
    }
})

export const {containData, reset, setCategory} = viewDataSlice.actions;
export default viewDataSlice.reducer;