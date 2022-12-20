import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  __getRollings,
  __deleteRollings,
  __editRollings,
} from "../../redux/modules/RollingSlice";

export default function RollingId(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, rollings } = useSelector((state) => state.rollings);
  const propsParam = useParams();
  const id = propsParam.id;
  // 수정하기
  const [edit, setEdit] = useState({
    id: propsParam.id,
    title: "",
    content: "",
  });
  //수정하기 토글
  const [toggle, setToggle] = useState(false);
  //수정하기 핸들러
  const onClickEditHandler = () => {
    dispatch(__editRollings(edit));
  };
  // delete
  const rollingsDelete = () => {
    dispatch(__deleteRollings(id));
    navigate(`/share`);
  };
  const detailData = rollings.filter((obj) => obj.id == id);

  useEffect(() => {
    dispatch(__getRollings());
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
          <span>{detailData[0].title}</span>
          <span>{detailData[0].content}</span>
          <button onClick={() => rollingsDelete(id)}>삭제하기</button>
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
    </>
  );
}
