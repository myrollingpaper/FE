import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { __getPost } from "../../redux/modules/todosSlice";
import Card from "./Card";
//조회 할려면 dispatch get을 가져와서 id를 map을 돌려서
//뿌려줘야된다.
export default function Share() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  const { isLogin } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);
  const locationHandler = (id) => {
    navigate(`/${id}`);
  };
  const routeToWrite = () => {
    if (isLogin === true) navigate("/write");
    else alert("로그인을해야 작성이 가능합니다.");
  };
  return (
    <STContainer>
      <StButton onClick={routeToWrite}>정보공유 작성하기</StButton>
      <StUploadContainer>
        <div className="upload_list_container">
          {posts?.map((todo) => {
            return (
              <div key={todo.id}>
                <Card todo={todo} locationHandler={locationHandler} />
              </div>
            );
          })}
        </div>
      </StUploadContainer>
    </STContainer>
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
  font-size: 25px;
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
