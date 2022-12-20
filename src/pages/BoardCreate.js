import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __addBoard } from "../redux/modules/boardsSlice";
import ImageUpload from '../components/ImageUpload';



const BoardCreate = () => {
    const dispatch = useDispatch();
    const [boards, setBoards] = useState(null);
    const [id,setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState("");
    const boardStore = useSelector((state) => state.boards.boards);

const board = {
    id: id,
    title: title,
    content: content,
};

const fetchBoards = () => {
    dispatch(__addBoard());
};

const onSubmitHandler = async (board) => {
    await axios.post("http://localhost:3001/boards", board);
};
useEffect(() => {
    fetchBoards();
}, []);

  return (
    <div>
      <div>
        <h1>게시글 작성</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(board);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="title"
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="content"
            onChange={(ev) => {
              setContent(ev.target.value);
            }}
          />
          <ImageUpload/>
        </div>
        <div>
          <button>추가하기</button>
        </div>
      </form>
    </div>
  );
};
export default BoardCreate;


//https://react-bootstrap.netlify.app/forms/form-control/