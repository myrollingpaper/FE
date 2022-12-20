import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addRollings } from "../../redux/modules/RollingSlice";

export default function ShareAdd() {
  //값을 담을 두 공간 필요 1. 제목 2. 내용
  //따라서 2개의 useState가 필요 현재 상태를 저장하고
  //변경할 수 있다.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [fileImage, setFileImage] = useState("");
  const [rollings, setRollings] = useState({
    id: 0,
    title: "",
    content: "",
  });
  console.log(rollings);
  const obj = {
    id: rollings.id,
    title: rollings.title,
    content: rollings.content,
  };
  console.log(obj);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRollings({ ...rollings, [name]: value });
  };

  const onSumitHandler = () => {
    if (rollings.title.trim() === "" || rollings.content.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addRollings(obj));
    navigate(`/rolling`);
    setRollings({
      title: "",
      content: "",
      imgUrl: "",
    });
  };

  return (
    <Container>
      <P>공유 작성 페이지</P>
      <input
        type="text"
        name="title"
        value={rollings.title}
        onChange={onChangeHandler}
        placeholder="제목을 입력해주세요"
      />
      <input
        type="text"
        name="content"
        value={rollings.content}
        onChange={onChangeHandler}
        placeholder="내용을 입력해주세요"
      />
      <button
        onClick={(e) => {
          onSumitHandler();
        }}
      >
        추가하기
      </button>
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
