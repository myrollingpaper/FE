import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Share() {
  return (
    <Container>
      <P>공유 페이지</P>
      <Link to="/shareAdd">
        <button>작성하기</button>
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
