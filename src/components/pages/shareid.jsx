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
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  console.log("sadf", posts);
  const propsParam = useParams();
  // 수정하기
  const [edit, setEdit] = useState({
    id: propsParam.id,
    title: "",
    content: "",
  });
  //수정 토글 관련 use
  const [toggle, setToggle] = useState(false);
  //수정 핸들러
  const onClickEditHandler = () => {
    dispatch(__editPost(edit));
  };
  //수정 토글 delete
  const postsDelete = () => {
    dispatch(__deletePost(id));
    navigate(`/`);
  };
  //id 지정
  const id = propsParam.id;
  //포스트 고유 값 아이디가 같을때 필터
  const detailData = posts.filter((obj) => obj.id == id);
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
  //수정시 핸들러로 true일때 수정하는 부분 출력
  const editToggleHandler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <div>
        <div>
          <span>{detailData[0].title}</span>
          <span>{detailData[0].content}</span>
          <button onClick={() => postsDelete(id)}>삭제하기</button>
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
          <button onClick={onClickEditHandler}>수정완료</button>
        </div>
      ) : null}
      <Comments comment={detailData[0].comment} />
    </>
  );
}
