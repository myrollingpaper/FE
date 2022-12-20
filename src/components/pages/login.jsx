import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __userLogin } from "../redux/modules/LoginSlice";
// {}로 감싸주기(actions 함수 써야하니까)

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    userid: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const obj = {
      id: 1,
      //임시
      userid: login.userid,
      password: login.password,
    };
    dispatch(__userLogin(obj));
  };

  return (
    <div>
      <div>
        <h2>DoDoong</h2>
        <p>로그인</p>
        <div>
          <div>
            <input
              type="text"
              name="userid"
              value={login.userid}
              placeholder="아이디"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={login.password}
              placeholder="비밀번호"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <button onClick={onSubmitHandler}>로그인</button>
        <button
          type="submit"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <span>회원이 아니신가요? &nbsp;&nbsp;</span>가입하기
        </button>
      </div>
    </div>
  );
};

export default LogIn;
