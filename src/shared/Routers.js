import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/layout/Home";
// import { Header } from "../components/layout/Header";
import { Header } from "../components/layout/Header";

export default function Hompage() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
