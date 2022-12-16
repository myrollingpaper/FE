import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __addNewPost } from "../../redux/modules/todoSlice";

export default function ShareAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const onsumitHandler = () => {
    dispatch(
      __addNewPost({
        title,
        content,
      })
    );
  };
  return (
    <Container>
      <P>공유 작성 페이지</P>
      <input>title</input>
      <input>content</input>
      <button onClick={onsumitHandler}>추가하기</button>
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
