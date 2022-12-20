import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getTodos } from "../../redux/modules/todosSlice";

export default function ShareId(props) {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const propsParam = useParams();
  const [Page, setPage] = useState({
    id: "",
    title: "",
    content: "",
  });

  const id = propsParam.id;
  // const obj = todos.find((data) => {
  //   if (Number(params.id) === data.id) {
  //     return data;
  //   }
  //   return "";
  // });
  // console.log(obj);

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <span>{todos.title}</span>
      <span>{todos.content}</span>
    </div>
  );
}
