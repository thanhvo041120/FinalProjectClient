import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: "dashboard",
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    change(state, action){
        state.option = action.payload.option;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { change, reset } = adminSlice.actions;
export default adminSlice.reducer;
