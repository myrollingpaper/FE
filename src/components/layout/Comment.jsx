import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __addComment,
  __deleteComment,
  __getComment,
  __editComment,
} from "../../redux/modules/CommentSlice";
import styled from "styled-components";

export default function Comment(props) {
  //아이디 값 새로 배정
  const { id } = useParams();
  console.log(id);
  const [commentList, setCommentList] = useState({
    id: 1,
    content: "",
    // createdAt: "",
    // modifiedAt: "",
    // nickname: "",
  });
  const [toggle, setToggle] = useState(false);
  console.log(",sss", props);
  const dispatch = useDispatch("");
  const List = useSelector((state) => state.commentList.commentList);
  const obj = {
    id: List.id,
    content: List.content,
    // createdAt: comment.createdAt,
    // modifiedAt: comment.modifiedAt,
    // nickname: comment.nickname,
  };
  // const onChangeInputHandler = (event) => {
  //   const { name, value } = event.target;
  //   setComment({
  //     ...comment,
  //     [name]: value,
  //   });
  // };

  //추가하기
  const onAddCommentHandler = (event) => {
    event.preventDefault();
    if (commentList.content.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ id, commentList }));

    setCommentList({
      comment: "",
    });
  };
  console.log("commentList", commentList);
  console.log(commentList);

  //삭제하기
  const onDeleteButton = (id) => {
    dispatch(__deleteComment({ id }));
    alert("삭제하시겠습니까?");
  };

  // 리스트로 디스패치
  useEffect(() => {
    dispatch(__getComment());
  }, [dispatch]);

  const onClickEditHandler = () => {
    dispatch(__editComment(commentList));
  };
  //수정하기 누르면 댓글 수정 창 출력
  const editToggleHandler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <>
      <div>
        <input
          placeholder="(100자 이내로 입력해주세요)"
          type="text"
          name="comment"
          value={commentList.content}
          onChange={(event) => {
            setCommentList({
              ...commentList,
              content: event.target.value,
            });
          }}
          maxLength={100}
        />
        <button onClick={onAddCommentHandler}>추가하기</button>
        {/* <div>
          <span>{comment.comment}</span>
          <span>{commentList[0].comment}</span>
        </div> */}
      </div>
      <div>
        {props.commentList?.map((commentList) => {
          return (
            <div key={commentList.id}>
              <span>{commentList.content}</span>
              <button onClick={() => onDeleteButton(commentList.id)}>
                삭제하기
              </button>
              <button onClick={editToggleHandler}>수정하기</button>
            </div>
          );
        })}
      </div>
      {toggle ? (
        <div>
          <input
            placeholder="(100자 이내로 입력해주세요)"
            type="text"
            name="comment"
            value={commentList.content}
            onChange={(event) => {
              setCommentList({
                ...commentList,
                content: event.target.value,
              });
            }}
            maxLength={100}
          />
          <button onClick={onClickEditHandler}>수정완료</button>
        </div>
      ) : null}
    </>
  );
}
