import React from 'react';
import styled from 'styled-components';
;

const Main = () => {
    return (
        <IntroDiv>
            4조 프로젝트 소개 공간입니다.
        </IntroDiv>
    );
};

export default Main;

const IntroDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`