import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __userLogin } from "../../redux/modules/LoginSlice";
// {}로 감싸주기(actions 함수 써야하니까)
const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  console.log("로그인", login);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const obj = {
      username: login.username,
      password: login.password,
      navigate: navigate,
    };
    dispatch(__userLogin(obj));
  };
  return (
    <>
      <StContainer>
        <StInnerContainer>
          <StText>
            안녕하세요 !
            <br />
            로그인해주세요
          </StText>
          <StInputBox>
            <div className="idBox">
              <StInput
                type="text"
                name="username"
                value={login.username}
                placeholder="아이디"
                onChange={onChangeHandler}
              />
            </div>
            <div className="pwBox">
              <StInput
                type="password"
                name="password"
                value={login.password}
                placeholder="비밀번호"
                onChange={onChangeHandler}
              />
            </div>
          </StInputBox>
          <StButtonBox>
            <StButton onClick={onSubmitHandler}>로그인</StButton>
            <StButton
              type="submit"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </StButton>
          </StButtonBox>
        </StInnerContainer>
      </StContainer>
    </>
  );
};
export default LogIn;
//메인 색 div
const StContainer = styled.div`
  background-color: #fc6868;
  border-radius: 32px;
  margin: auto;
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StText = styled.div`
  /* background-color: red; */
  align-self: flex-start;
  color: #ffcbc4;
  margin: 0 0 20px 50px;
  font-weight: 700;
  font-size: 20px;
`;
// input+button div
const StInnerContainer = styled.div`
  /* background-color: aliceblue; */
  margin: auto;
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// input 2개 묶인 div
const StInputBox = styled.div`
  /* background-color: antiquewhite; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// inputBox
const StInput = styled.input`
  width: 300px;
  min-height: 40px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  padding-left: 10px;
`;
const StButtonBox = styled.div`
  /* background-color: antiquewhite; */
  width: 80%;
  height: 13%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
const StButton = styled.button`
  background-color: #ffcbc4;
  /* color: white; */
  font-weight: 700;
  font-size: 14px;
  width: 150px;
  min-height: 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
