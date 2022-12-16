import React from "react";
import styled from "styled-components";

export default function Rolling() {
  return (
    <Container>
      <P>롤링 페이지</P>
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
