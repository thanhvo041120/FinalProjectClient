import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/user/HomePage";
import StaffHomePage from "pages/staff/StaffHomePage";
import ProtectRoute from "routes/protected.route";
import LandingPage from "pages/user/LandingPage";
import PrivateRoute from "routes/private.route";
import ProfilePage from "pages/ProfilePage/UserProfilePage";
import ProductPage from "pages/user/ProductPage";
import AdminHomePage from "pages/admin/AdminHomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<ProtectRoute role={1} />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/user" element={<ProtectRoute role={3} />}>
            <Route path="/user" element={<HomePage />} />
            <Route path="/user/detail/:bookId" element={<ProductPage />} />
            <Route path="/user/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/staff" element={<ProtectRoute role={2} />}>
            <Route path="/staff" element={<StaffHomePage />} />
            <Route path="/staff/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
