import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comments from "../layout/Comment";
import {
  __getPost,
  __deletePost,
  __editPost,
} from "../../redux/modules/todosSlice";

export default function ShareId(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  console.log("sadf", todos);
  const propsParam = useParams();
  // 수정하기
  const [edit, setEdit] = useState({
    id: propsParam.id,
    title: "",
    content: "",
    imgUrl: "",
    createAt: "",
  });
  //수정 토글 관련 use
  const [toggle, setToggle] = useState(false);
  //수정 핸들러
  const onClickEditHandler = () => {
    dispatch(__editPost(edit));
  };
  //수정 토글 delete
  const todosDelete = () => {
    dispatch(__deletePost(id));
    navigate(`/api/boards/main`);
  };

  const id = propsParam.id;

  const detailData = todos.filter((obj) => obj.id == id);
  console.log("ddd", detailData);
  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const editToggleHandler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <div>
        <div>
          <div>
            <img src={detailData[0].imgUrl} />
          </div>
          <span>{detailData[0].title}</span>
          <span>{detailData[0].content}</span>
          <span>{detailData[0].imgUrl}</span>
          <button onClick={() => todosDelete(id)}>삭제하기</button>
          <button onClick={editToggleHandler}>수정하기</button>
        </div>
      </div>
      {toggle ? (
        <div>
          <input
            type="text"
            name="title"
            onChange={(event) => {
              setEdit({
                ...edit,
                title: event.target.value,
              });
            }}
            placeholder="제목을 입력해주세요"
          />
          <input
            type="text"
            name="content"
            onChange={(event) => {
              setEdit({
                ...edit,
                content: event.target.value,
              });
            }}
            placeholder="내용을 입력해주세요"
          />
          <input
            type="text"
            name="imgUrl"
            onChange={(event) => {
              setEdit({
                ...edit,
                imgUrl: event.target.value,
              });
            }}
            placeholder="imgUrl을 입력해주세요"
          />
          <button onClick={onClickEditHandler}>수정완료</button>
        </div>
      ) : null}
      <Comments comment={detailData[0].comment} />
    </>
  );
}
