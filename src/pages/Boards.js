import React, {useEffect, useState} from 'react';
import {ListGroup, Badge, ToggleButton} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Link } from "react-router-dom";


const Board = () => {
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [checked, setChecked] = useState(false);

    const getBoards= async() => {
        let url = `http://localhost:3001/boards`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        setBoardList(data);
    }

    useEffect(() => {
        getBoards();
    },[]);

    const goTowrite = () => {
        navigate('/board-create')
      }


    return (
    <>
        <ButtonArea>
            <ToggleButton
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-danger"
                checked={checked}
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
                onClick={goTowrite}
            >
                작성하기
            </ToggleButton>
        </ButtonArea>
        <ListGroup as="ol" numbered>
            {boardList.map((list)=> (
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold flex " >
                            <EachLink to = {`/boards/${list.id}`}>
                            {list.title}
                            </EachLink>
                        </div>
                    </div>
                        
                    <Badge bg="light" text="dark">
                            {list.user}
                    </Badge>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </>
    );
};

export default Board;


const ButtonArea = styled.div`
    display: flex;
        justify-content: flex-end;
        margin: 40px 0 20px 0;
`

const EachLink = styled(Link)`
    text-decoration: none;
    color: black;
`



// api 호출은 useEffect
// useEffect 매개변수 1. 함수 2. 배열
// console이 아닌 UI에 보여주려면 useState에 넣어주어야한다.  
// const[boardList, setBoardList] = useState()
// 데이터의 값을 받아서 더해주는 것이기 때문에 setBoardList가 data가 된다. 