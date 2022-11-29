import { createSlice } from "@reduxjs/toolkit"


const initialState= {
    isLogin: false,
    email: "",
    id: 0,
    roleId: 0,
}

const userSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action){
            state.isLogin = action.payload.isLogin;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.roleId = action.payload.roleId;
        },
        logout(state){
            Object.assign(state, initialState);
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;