import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/layout/Home";
import Login from "../components/pages/login";
import Rolling from "../components/pages/rolling";
import Share from "../components/pages/share";
import SignUp from "../components/pages/signUp";
import ShareAdd from "../components/pages/shareAdd";
// import { Header } from "../components/layout/Header";
import { Header } from "../components/layout/Header";
import ShareId from "../components/pages/shareid";
import RollingAdd from "../components/pages/RollingAdd";
// import Sidebar from "../components/pages/sidebar";

export default function Hompage() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/users/login" element={<Login />} />
        {/* <Route path="/api/rollingpapers" element={<Rolling />} />
        <Route path="/api/rollingpapers/:crewId" element={<RollingAdd />} />
        <Route path="/api/boards/main" element={<Share />} /> */}
        <Route path="/api/users/signup" element={<SignUp />} />
        {/* <Route path="/api/boards" element={<ShareAdd />} />
        <Route path="/api/boards/:id" element={<ShareId />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
