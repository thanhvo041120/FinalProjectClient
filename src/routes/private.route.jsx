import jwt_decode from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "redux/slices/auth.slice";
import * as DrawerStore from "redux/slices/drawer.slice";
import * as BorrowStore from "redux/slices/borrow.slice";
import * as FlagStore from "redux/slices/flag.slice";
import * as ViewStore from "redux/slices/view-book.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isLogin);
  const roleUser = useAppSelector((state) => state.auth.roleId);
  if (!isAuthenticated) return <Outlet />;
  if (isAuthenticated) {
    const refreshToken = localStorage.getItem("refresh_token");
    const rfTokenDecoded = jwt_decode(refreshToken);
    if (Date.now() > rfTokenDecoded.exp * 1000) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(logout());
      dispatch(DrawerStore.reset());
      dispatch(BorrowStore.reset());
      dispatch(FlagStore.reset());
      dispatch(ViewStore.reset());
      return <Navigate to="/" />;
    }
    if (isAuthenticated && roleUser === 2) return <Navigate to="/staff" />;
    if (isAuthenticated && roleUser === 3) return <Navigate to="/user" />;
    if (isAuthenticated && roleUser === 1) return <Navigate to="/admin" />;
  }
};

export default PrivateRoute;
