import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  __userSignUp,
  __checkId,
  __checkName,
} from "../../redux/modules/LoginSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { account } = useSelector((state) => state.data.data);
  // console.log("account", account);
  const [join, setJoin] = useState({
    username: "",
    nickname: "",
    password: "",
  });
  const obj = {
    username: join.username,
    nickname: join.nickname,
    password: join.password,
  };
  // const useridCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
  // const usernicknameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
  // const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  // const onCheckId = () => {
  //   console.log("id", obj.userid);
  //   // 수정 필요(true, false로만 받으면 됨. if 필요 없음. dispatch로 받으면 됨)
  //   dispatch(__checkId(obj.userid));
  // };
  // useEffect(() => {
  //   if (idCheck !== undefined) {
  //     if (idCheck.success === true) {
  //       return alert("사용 가능한 ID입니다.");
  //     } else {
  //       return alert("이미 사용중인 ID가 있습니다.");
  //     }
  //   }
  // }, [dispatch, idCheck]);
  // const onCheckname = () => {
  //   dispatch(__checkName(obj.nickname));
  // };
  // useEffect(() => {
  //   if (nameCheck !== undefined) {
  //     if (nameCheck.success === true) {
  //       return alert("사용 가능한 닉네임입니다.");
  //     } else {
  //       return alert("이미 사용중인 닉네임이 있습니다.");
  //     }
  //   }
  // }, [dispatch, nameCheck]);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(__userSignUp({ obj, navigate }));
  };
  // useEffect(() => {
  //   if (account !== undefined) {
  //     if (account.success === true) {
  //       alert("회원가입이 완료되었습니다.");
  //       setJoin({
  //         userid: "",
  //         nickname: "",
  //         password: "",
  //       });
  //       window.location.replace("/");
  //     } else {
  //       if (account.error !== undefined) {
  //         alert(account.error);
  //       }
  //     }
  //   }
  // }, [account]);
  console.log("obj", obj);
  return (
    <>
      <StContainer>
        <StInnerContainer>
          <StText>
            회원가입을
            <br />
            완료해주세요
          </StText>
          <StInputBox>
            <div className="idBox">
              <StInput
                type="text"
                name="username"
                onChange={(event) => {
                  setJoin({
                    ...join,
                    username: event.target.value,
                  });
                }}
                placeholder="아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자"
              />
            </div>
            <div className="nicknameBox">
              <StInput
                type="text"
                name="nickname"
                onChange={(event) => {
                  setJoin({
                    ...join,
                    nickname: event.target.value,
                  });
                }}
                placeholder="닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자"
              />
            </div>
            <div className="pwBox">
              <StInput
                type="password"
                name="password"
                onChange={(event) => {
                  setJoin({
                    ...join,
                    password: event.target.value,
                  });
                }}
                placeholder="비밀번호는 8 ~ 16자 영문, 숫자 조합"
              />
            </div>
          </StInputBox>
          <StButtonBox>
            <StButton onClick={onSubmitHandler}>회원가입</StButton>
            <StButton
              onClick={() => {
                navigate("/Login");
              }}
            >
              뒤로가기
            </StButton>
          </StButtonBox>
        </StInnerContainer>
      </StContainer>
    </>
  );
};
export default SignUp;
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
// input 3개 묶인 div
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
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 40px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  padding-left: 10px;
  font-size: 12px;
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
  height: 38px;
  min-height: 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
