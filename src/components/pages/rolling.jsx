import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { __getRollings } from "../../redux/modules/RollingSlice";
import RollCard from "./RollCard";
export default function Rolling() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, rollings } = useSelector((state) => state.rollings);
  console.log(rollings);
  console.log(rollings.id);
  useEffect(() => {
    dispatch(__getRollings());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const locationHandler = (id) => {
    navigate(`/rollingAdd/${id}`);
  };

  return (
    <Container>
      <P>공유 페이지</P>
      <StUploadContainer>
        <Link to="/shareAdd">
          <button>작성하기</button>
        </Link>
        <div className="upload_list_container">
          {rollings?.map((rolling) => {
            return (
              <div key={rolling.id}>
                <RollCard rolling={rolling} locationHandler={locationHandler} />
              </div>
            );
          })}
        </div>
      </StUploadContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const P = styled.p`
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin: 0;
  text-align: center;
  letter-spacing: 0.1px;
  line-height: 1.5;
  color: black;
`;

const StUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  .upload_list_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }
`;
