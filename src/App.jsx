import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/user/HomePage";
import UserProfilePage from "pages/user/UserProfilePage";
import ProductPage from "pages/user/ProductPage";
import StaffHomePage from "pages/staff/StaffHomePage";
import ProtectRoute from "routes/protected.route";
import LandingPage from "pages/user/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<ProtectRoute role={3} />}>
            <Route path="/user" element={<HomePage />} />
            <Route path="/user/detail/:bookId" element={<ProductPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Route>
          <Route path="/staff" element={<ProtectRoute role={2} />}>
            <Route path="/staff" element={<StaffHomePage />} />
          </Route>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
