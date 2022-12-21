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
  // const { admin, idCheck, nameCheck } = useSelector((state) => state.admin);
  // console.log("admin", admin);
  const initialState = {
    userid: "",
    nickname: "",
    password: "",
  };
  const [join, setJoin] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setJoin({ ...join, [name]: value });
  };
  const obj = {
    userid: join.userid,
    nickname: join.nickname,
    password: join.password,
  };

  const useridCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
  const usernicknameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
  const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  const onCheckId = () => {
    // 수정 필요(true, false로만 받으면 됨. if 필요 없음. dispatch로 받으면 됨)
    dispatch(__checkId(obj.userid));
  };

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
    if (!useridCheck.test(obj.userid)) {
      return alert("아이디 양식에 맞춰주세요");
    }
    if (!usernicknameCheck.test(obj.nickname)) {
      return alert("닉네임 양식에 맞춰주세요");
    }
    if (!passwordCheck.test(obj.password)) {
      return alert("비밀번호 양식에 맞춰주세요");
    }
    if (obj.userid === "" || obj.userid === undefined) {
      return alert("빈칸을 입력해주세요.");
    }

    if (obj.nickname === "" || obj.nickname === undefined) {
      return alert("빈칸을 입력해주세요.");
    }
    dispatch(__userSignUp(obj));
  };
  // useEffect(() => {
  //   if (admin !== undefined) {
  //     if (admin.success === true) {
  //       alert("회원가입이 완료되었습니다.");
  //       setJoin({
  //         userid: "",
  //         nickname: "",
  //         password: "",
  //       });
  //       window.location.replace("/");
  //     } else {
  //       if (admin.error !== undefined) {
  //         alert(admin.error);
  //       }
  //     }
  //   }
  // }, [admin]);
  console.log("obj", obj);
  return (
    <div>
      <div>
        <h2>회원가입</h2>
        <div>
          <span>ID:</span>
          <input
            type="text"
            name="userid"
            onChange={onChangeHandler}
            placeholder="아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자"
          />{" "}
          <button type="button" onClick={onCheckId}>
            중복확인
          </button>
        </div>
        <p>아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자</p>
        <div>
          <span>NickName:</span>
          <input
            type="text"
            name="nickname"
            onChange={onChangeHandler}
            placeholder="닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자"
          />{" "}
          {/* <button type="button" onClick={onCheckname}>
            중복확인
          </button> */}
        </div>
        <p>닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자</p>
        <div>
          <span>password:</span>
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            placeholder="비밀번호는 8 ~ 16자 영문, 숫자 조합"
          />
        </div>
        <p>비밀번호는 8 ~ 16자 영문, 숫자 조합</p>
        <div>
          <button onClick={onSubmitHandler}>회원가입</button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
