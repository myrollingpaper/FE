import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Button from "../../elem/button";

const Div = styled.div`
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid silver;
  align-items: center;
  border-bottom: 1px solid #ececec;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
`;

const Button = styled.button`
  float: right;
`;

export function Header() {
  return (
    <Div>
      <Link to="/" title="집 아이콘">
        <Img src="img/free-icon-home-25694.png" alt="logo" />
      </Link>
      <Link to="/login">
        <Button>로그인</Button>
      </Link>
    </Div>
  );
}
