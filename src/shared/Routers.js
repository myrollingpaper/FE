import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/layout/Home";
import Login from "../components/pages/login";
import Rolling from "../components/pages/rolling";
import Share from "../components/pages/share";
import SignUp from "../components/pages/signUp";
// import { Header } from "../components/layout/Header";
import { Header } from "../components/layout/Header";
// import Sidebar from "../components/pages/sidebar";

export default function Hompage() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rolling" element={<Rolling />} />
        <Route path="/share" element={<Share />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
