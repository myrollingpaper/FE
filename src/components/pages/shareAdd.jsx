import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __addPost } from "../../redux/modules/todosSlice";
import { Link } from "react-router-dom";

export default function ShareAdd() {
  //값을 담을 두 공간 필요 1. 제목 2. 내용
  //따라서 2개의 useState가 필요 현재 상태를 저장하고
  //변경할 수 있다.
  const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [fileImage, setFileImage] = useState("");
  const [todos, setTodos] = useState({
    title: "",
    content: "",
    id: 0,
    imgUrl: "",
  });
  const [prevImg, setPrevImg] = useState("");
  const obj = {
    title: todos.title,
    content: todos.content,
    imgUrl: todos.imgUrl,
    id: Date.now(),
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTodos({ ...todos, [name]: value });
  };

  const onSumitHandler = (event) => {
    event.preventDefault();
    if (todos.content.trim() === "" || todos.title.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addPost(obj));
    setTodos({
      title: "",
      content: "",
      imgUrl: "",
    });
  };
  // 사진 등록 및 미리보기
  const postUrl = () => {
    if (obj.imgUrl === "" || obj.imgUrl === undefined) {
      return alert("URL을 입력해주세요!");
    } else {
      setPrevImg(obj.imgUrl);
      alert("등록이 완료되었습니다.");
    }
  };

  return (
    <Container
      onClick={(e) => {
        onSumitHandler();
      }}
    >
      <P>공유 작성 페이지</P>
      <div>
        <div>
          <img src={prevImg} />
        </div>
        <div>
          <div>
            <img src="/show.jpg" alt="" />
          </div>
          <p>구글에서 원하시는 이미지 검색후 우클릭하여 주소를 복사해주세요</p>
          <div>
            <input
              type="text"
              value={todos.imgUrl}
              name="imgUrl"
              placeholder="사진 URL을 등록해주세요!"
              onChange={onChangeHandler}
            />
            <button onClick={postUrl}>등록완료</button>
          </div>
        </div>
      </div>
      <input
        type="text"
        name="title"
        value={todos.title}
        onChange={onChangeHandler}
        placeholder="제목을 입력해주세요"
      />
      <input
        type="text"
        name="content"
        value={todos.content}
        onChange={onChangeHandler}
        placeholder="내용을 입력해주세요"
      />
      <Link to="/share">
        <button>추가하기</button>
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
