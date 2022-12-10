import userReducer from './slices/auth.slice';
import borrowReducer from './slices/borrow.slice';
import drawerReducer from './slices/drawer.slice';
import flagReducer from './slices/flag.slice';
import viewDataReducer from './slices/view-book.slice';
import adminOption from './slices/admin-option.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    auth: userReducer,
    drawer: drawerReducer,
    bookBorrow: borrowReducer,
    flag: flagReducer,
    viewData: viewDataReducer,
    admin: adminOption,
});
