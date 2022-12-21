import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addPost } from "../../redux/modules/todosSlice";
import { format } from "date-fns";
import ImageUpload from "../ImageUpload";

export default function ShareAdd() {
  //값을 담을 두 공간 필요 1. 제목 2. 내용
  //따라서 2개의 useState가 필요 현재 상태를 저장하고
  //변경할 수 있다.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todos, setTodos] = useState({
    title: "",
    content: "",
    // path: "",
  });
  const [prevImg, setPrevImg] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(image);
  }, [image])

  //input값
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTodos({ ...todos, [name]: value });
  };
  //추가하기 버튼
  const onSumitHandler = () => {
    if (todos.title.trim() === "" || todos.content.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }

    console.log(todos, image);

    dispatch(__addPost({
      title: todos.title,
      content: todos.content,
      image: image
    }));
    // navigate(`/boards`);
    // setTodos({
    //   title: "",
    //   content: "",
    //   // path: "",
    // });
  };

  return (
    <>
      <Container>
        <P>공유 작성 페이지</P>
        {/* <form> */}
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
          <ImageUpload setImage={setImage}/>
          {/* <ImageUpload /> */}
          <button
            onClick={(e) => {
              onSumitHandler();
            }}
          >
            추가하기
          </button>
        {/* </form> */}
      </Container>
    </>
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
