import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { __addComment, __getBoardById } from "../redux/modules/boardsSlice";
import axios from "axios"; 
import { Link } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import Comment from '../components/comment';



function BoardDetail() {
    const [content, setContent] = useState("");
    const [list, setList] = useState({});
    const param = useParams();
    const dispatch = useDispatch();
    const fetchBoards = async () => {
    const boardId = param.id;
    const { data } = await axios.get(`http://localhost:3001/boards/${boardId}`);
    setList(data);
    };

    const comment = {
        id: nanoid(), //댓글 고유 아이디
        todoId: param.id,
        content: content,
    };


    const onClickEditButtonHandler = (boardId, edit) => {
        alert("수정완료🧸🎈");
        axios.patch(`http://localhost:3001/boards/${boardId}`, edit);
    };

    const onClickDeleteButtonHandler = (boardId) => {
        axios.delete(`http://localhost:3001/boards/${boardId}`);
    };

    function writeCommentHandler() {
        alert("작성완료");
        dispatch(__addComment(comment));
        setContent("");
    }

    const commentDeleteHandler = (commentId) => {
        alert("댓글이 삭제되었습니다.");
        axios.delete(`http://localhost:3001/comments/${commentId}`);
    };

    useEffect(() => {
        fetchBoards();
    }, []);
    return (
    <div>
        <ContentArea>
            <TitleArea>
                <div><span>Title: </span>{list.title}</div>
                <div><UserName>{list.user}</UserName></div>
            </TitleArea>
            <TextArea
                type="text"
                placeholder="content"
                onChange={(event) => {
                    setContent(event.target.value);
                }}>
                    {list.content}
            </TextArea>
        </ContentArea>
        <ButtonArea>
            <Stbutton 
                type="button"
                onClick={() => onClickEditButtonHandler(list.id)}>
                    수정하기
            </Stbutton>
            <Stbutton 
                type='button'
                onClick={() => onClickDeleteButtonHandler(list.id, true)}
            >
                삭제하기
            </Stbutton>
        </ButtonArea>
        <Comment/>
    </div>
  );
}

export default BoardDetail;


const ContentArea = styled.div`
  border: 2px solid #0000002d;
  border-radius: 5px;
  
`

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0000002d;
`


const UserName = styled.p`
    font-size: 11px;
    margin-bottom: 0;
    
`

const TextArea = styled.textarea`
    min-height: 100px;
    width: 100%;
    border: none;
    `

const ButtonArea = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`

const Stbutton = styled.button`
    margin-left: 10px;

`
