import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "../components/layout/Home";
import { Header } from "../components/layout/Header";
=======
// import Home from "../components/layout/Home";
import LogIn from "../components/pages/login";
import Share from "../components/pages/share";
import SignUp from "../components/pages/signUp";
import ShareAdd from "../components/pages/shareAdd";
import Navbar from "../components/layout/Navbar";
import ShareId from "../components/pages/shareid";
>>>>>>> feature/share

export default function Hompage() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<Share />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<ShareAdd />} />
        <Route path="/:id" element={<ShareId />} />
>>>>>>> feature/share
      </Routes>
    </BrowserRouter>
  );
}
