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
  const [comment, setComment] = useState({
    id: 1,
    content: "",
    // createdAt: "",
    // modifiedAt: "",
    // nickname: "",
  });
  const [toggle, setToggle] = useState(false);
  console.log(",sss", props);
  const dispatch = useDispatch("");
  const commentList = useSelector((state) => state.commentList.commentList);
  const obj = {
    id: comment.id,
    content: comment.content,
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
    if (comment.comment.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ id, comment }));

    setComment({
      comment: "",
    });
  };
  console.log(commentList);
  console.log(comment);

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
    dispatch(__editComment(comment));
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
          value={comment.comment}
          onChange={(event) => {
            setComment({
              ...comment,
              comment: event.target.value,
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
        {props.comment?.map((comment) => {
          return (
            <div key={comment.id}>
              <span>{comment.content}</span>
              <button onClick={() => onDeleteButton(comment.id)}>
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
            value={comment.comment}
            onChange={(event) => {
              setComment({
                ...comment,
                comment: event.target.value,
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
