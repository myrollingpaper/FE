import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { __addComment, __getBoardById } from "../redux/modules/boardsSlice";
import axios from "axios"; 
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Comment() {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const param = useParams();
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards.boards);
    const fetchBoards = async () => {
    const { data } = await axios.get(`http://localhost:3001/comments?boardId=${param.id}`);
    setComments(data);
    };

    useEffect(() => {
        dispatch(__getBoardById(param.id));
        fetchBoards();
    }, []);

    const comment = {
        id: nanoid(), //댓글 고유 아이디
        boardId: param.id,
        content: content,
    };


    //댓글
    function writeCommentHandler() {
        alert("작성완료");
        dispatch(__addComment(comment));
        setContent("");
    }

    const commentDeleteHandler = (commentId) => {
        alert("댓글이 삭제되었습니다.");
        axios.delete(`http://localhost:3001/comments/${commentId}`);
    };


return (
    <div>       
        <input
        type=" dtext"
        value={content}
        placeholder="comment"
        onChange={(event) => {
            setContent(event.target.value);
        }}/>   
        <button 
                type="button"
                onClick={() => {
                    writeCommentHandler();
                }}
            >
                작성
        </button>
        <button 
        type="button"
        onClick={() => {
            commentDeleteHandler(comment.id);
        }}
        >
            삭제
        </button>
    </div>

);
}

export default Comment;

