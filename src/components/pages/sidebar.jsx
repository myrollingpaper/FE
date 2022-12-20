import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <Link to="/rolling">
        <button>롤링페이지</button>
      </Link>
      <Link to="/api/boards/main">
        <button>정보공유</button>
      </Link>
    </div>
  );
}
