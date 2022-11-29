import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successState: "",
};
const flagSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    reset(state) {
      state.successState = "";
    },
    successful(state, action) {
      state.successState = action.payload.success;
    },
    failed(state, action) {
      state.successState = action.payload.fail;
    },
  },
});


export const {reset,successful,failed} = flagSlice.actions;
export default flagSlice.reducer;