import React from 'react';
import styled from 'styled-components';


const Rolling = () => {

    const name = ['강민승', '강혜지', '권영문', '김규리', '김아영', '김인광', '김재영', '김현빈', '노현승', '박소연', '박영준', '서혁수', '신승호', '안은솔', '양승우', '이민규', '이상현', '이상훈', '이정민', '장신원', '정다솔', '조소영', '차이진', '최수빈', '홍윤재', '황미경', '황지성' ]

    return (
        <div>
            <StUlist>
                {name.map((item) => (
                    <StList>{item}</StList>
                ))}
            </StUlist>
        </div>
    );
};

export default Rolling;


const StList = styled.div`
    list-style: none;
`

const StUlist = styled.ul`
    display: flex;
    padding`