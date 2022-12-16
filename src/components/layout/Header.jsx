import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Header() {
  return (
    <div>
      <Link to="/" title="집 아이콘">
        <img src="img/free-icon-home-25694.png" alt="logo" />
        <button>로그인</button>
      </Link>
    </div>
  );
}
