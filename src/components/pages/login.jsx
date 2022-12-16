import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <Container>
      <P>로그인 페이지</P>
      <span>
        <text>로그인:</text>
        <input></input>
      </span>
      <span>
        <text>회원가입:</text>
        <input></input>
      </span>
      <button>로그인</button>
      <Link to="/about">
        <button>회원가입</button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const P = styled.p`
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin: 0;
  text-align: center;
  letter-spacing: 0.1px;
  line-height: 1.5;
  color: black;
`;
