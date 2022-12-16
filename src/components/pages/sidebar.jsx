import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <StSidebar>
      <div className="sidebar_inner">
        <div className="logo_container">
          <StLogo className="logo">Rolling</StLogo>
        </div>
        <div className="add_button_container"></div>
        <StCategory>
          <span className="category_title">
            <StCategoryTitle>커뮤니티 리스트</StCategoryTitle>
          </span>
          <StCategoryInner>
            <Link to="/rolling">
              <StButton>롤링페이지</StButton>
            </Link>
            <Link to="/share">
              <StButton>정보공유</StButton>
            </Link>
          </StCategoryInner>
        </StCategory>
      </div>
    </StSidebar>
  );
}

const StSidebar = styled.div`
  width: 100%;
  max-width: 270px;
  border: 1px solid #ececec;
  left: 0;
  top: 0;
  background: #fff;
  .sidebar_inner {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 30px 0;
  }
  .logo_container {
    display: flex;
    justify-content: center;
  }
`;
const StCategoryTitle = styled.span`
  margin-top: 3px;
`;
const StCategoryInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 0 30px;
  .category_list {
    font-size: 0.9rem;
    cursor: pointer;
    width: fit-content;
    background: none;
    border: none;
  }
  .clicked {
    color: #eceaea;
    text-shadow: 0 0 6px #e6618f, 0 0 18px #e6618f;
  }
`;
const StCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  margin-top: 30px;
  .category_title {
    display: flex;
    align-items: center;
    gap: 0 10px;
  }
`;

const StButton = styled.button`
  width: 100%;
  height: 35px;
  border-radius: 3px;
  background: linear-gradient(180deg, #c5a7fb, #7492f2);
  font-size: 1rem;
  cursor: pointer;
  border: none;
  box-shadow: 2px 2px 6px 1px rgb(0 0 0 / 20%);
  font-size: 0.9rem;
  color: #212121;
  &:active {
    box-shadow: none;
  }
`;

const StLogo = styled.span`
  font-size: 2rem;
  font-weight: 600;
  font-family: "Corinthia", cursive;
`;

const StTitle = styled.span`
  min-width: 25%;
`;
