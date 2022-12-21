import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../components/layout/Home";
import LogIn from "../components/pages/login";
import Share from "../components/pages/share";
import SignUp from "../components/pages/signUp";
import ShareAdd from "../components/pages/shareAdd";
import Navbar from "../components/layout/Navbar";
import ShareId from "../components/pages/shareid";

export default function Hompage() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Share />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<ShareAdd />} />
        <Route path="/:id" element={<ShareId />} />
      </Routes>
    </BrowserRouter>
  );
}
