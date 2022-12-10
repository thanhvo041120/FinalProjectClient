import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";

const ProtectRoute = ({ role }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isLogin);
  const roleUser = useAppSelector((state) => state.auth.roleId);
  if (isAuthenticated && role === roleUser) {
    return <Outlet />;
  }
  if (isAuthenticated && role !== roleUser) {
    if (roleUser === 2) {
      return <Navigate to="/staff" />;
    }
    if (roleUser === 3) {
      return <Navigate to="/user" />;
    }
    if (roleUser === 1) {
      return <Navigate to="/admin" />;
    }
  }
  
  return <Navigate to="/" />;
};

export default ProtectRoute;
