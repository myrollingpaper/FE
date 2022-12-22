import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../layout/Comment";
import ImageUpload from "../ImageUpload";
import {
  __getPost,
  __deletePost,
  __editPost,
} from "../../redux/modules/todosSlice";

export default function ShareId(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  console.log("posts", posts);
  const propsParam = useParams();
  // 수정하기
  const [edit, setEdit] = useState({
    title: "",
    content: "",
    // path: "",
    // createdAt: "",
    // modifiedAt: "",
  });
  //이미지 관련
  // const [image, setImage] = useState(null);
  // useEffect(() => {
  //   console.log(image);
  // }, [image]);
  //수정 토글 관련 use
  const [toggle, setToggle] = useState(false);
  //수정 핸들러
  const onClickEditHandler = () => {
    // if (edit.title.trim() === "" || edit.content.trim() === "") {
    //   return alert("모든 항목을 입력해주세요.");
    // }
    dispatch(
      __editPost({
        id: id,
        title: edit.title,
        content: edit.content,
        // image: image,
      })
    );
    setEdit({
      title: "",
      content: "",
      // path: "",
    });
    navigate(`/`);
  };
  // delete
  const postsDelete = () => {
    dispatch(__deletePost(id));
    navigate(`/`);
  };
  //id 지정
  const id = propsParam.id;
  //포스트 고유 값 아이디가 같을때 필터
  const detailData = posts.filter((obj) => obj.id == id);
  console.log("detailData", detailData[0].content);
  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);
  //수정시 핸들러로 true일때 수정하는 부분 출력
  const editToggleHandler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  console.log(edit);

  return (
    <>
      <STContainer>
        <StUploadContainer>
          <div>
            <span>{detailData[0].title}</span>
            <span>{detailData[0].content}</span>
          </div>
        </StUploadContainer>
        <StButton onClick={() => postsDelete(id)}>삭제하기</StButton>
        <StButton onClick={editToggleHandler}>수정하기</StButton>
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
            {/* <ImageUpload setImage={setImage} /> */}
            <button onClick={onClickEditHandler}>수정완료</button>
          </div>
        ) : null}
        {/* <CommentList comment={detailData[0].commentList} /> */}
      </STContainer>
    </>
  );
}

const STContainer = styled.div`
  background-color: #ffcbc4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  margin: auto;
  width: 100%;
  min-height: 700px;
`;
// 작성하기 버튼
const StButton = styled.button`
  background-color: #fc6868;
  color: white;
  font-weight: 700;
  font-size: 10px;
  width: 50%;
  min-height: 50px;
  margin-bottom: 50px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
`;
const StUploadContainer = styled.div`
  background-color: #ffffff;
  width: 80%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .upload_list_container {
    /* background-color: antiquewhite; */
    height: 300px;
    display: grid;
    padding: 10%;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    overflow: auto;
    div:last-child {
      margin-bottom: 50px;
    }
  }
`;
