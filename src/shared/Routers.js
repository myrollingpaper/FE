import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/layout/Home";
import LogIn from "../components/pages/login";
// import Share from "../components/pages/share";
import SignUp from "../components/pages/signUp";
// import ShareAdd from "../components/pages/shareAdd";
// import { Header } from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
// import ShareId from "../components/pages/shareid";
// import Sidebar from "../components/pages/sidebar";

export default function Hompage() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/api/boards/main" element={<Share />} />
        <Route path="/api/boards" element={<ShareAdd />} />
        <Route path="/api/boards/:id" element={<ShareId />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
