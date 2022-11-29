import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phoneNumber: "",
    bookName: "",
    category: "",
    expiredDate: "",
    SA: "",
}
const borrowSlice = createSlice({
    name: 'borrow',
    initialState: initialState,
    reducers: {
        setIndividualInformation(state, action){
            state.firstName = action.payload.firstname;
            state.lastName = action.payload.lastname;
            state.email = action.payload.email;
            state.address = action.payload.address;
            state.city = action.payload.city;
            state.phoneNumber = action.payload.phonenumber;
        },
        setBookInformation(state, action){
            state.bookName = action.payload.bookName;
            state.category = action.payload.bookCategory;
            state.expiredDate = action.payload.stringDate;
            state.SA = action.payload.SA;
        },
        reset(state){
            Object.assign(state, initialState);
        }
    }
})

export const {setIndividualInformation,setBookInformation,reset} = borrowSlice.actions;
export default borrowSlice.reducer;