import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: "",
  id: 0,
  roleId: 0,
  walletAddress: "",
};

const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.roleId = action.payload.roleId;
      state.walletAddress = action.payload.walletAddress;
    },
    changeWallet(state, action) {
      state.walletAddress = action.payload.walletAddress;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { login, logout, changeWallet } = userSlice.actions;
export default userSlice.reducer;
