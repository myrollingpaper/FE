import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//초기값 설정
const initialState = {
  comment: [
    {
      id: 1,
      nickname: "jisung",
      content: "hello",
      createdAt: "2022-12-19T18:05:33.177063",
      modifiedAt: "2022-12-19T20:05:33.177063",
    },
  ],
  isLoading: false,
  error: null,
};
//가져오기
export const __getComment = createAsyncThunk(
  "commentList/getcomment",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.get(
        `http://localhost:3001/boards/${payload.id}/comments/${payload.commentid}`
      );
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//서버에 보내서 추가하기
export const __addComment = createAsyncThunk(
  "commentList/addcomment",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const data = await axios.post(
        `http://localhost:3001/commentList`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      // alert("");
      // window.location.replace("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//삭제하기
export const __deleteComment = createAsyncThunk(
  "comments/deletecomment",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/commentList/${payload.id}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // alert("로그인이 필요합니다.");
      // window.location.replace("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//extraRecucers
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //추가
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //삭제
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (item) => item.commentid !== action.payload.id
      );
      // 아이디값이 두개가 들어갔으므로 (payload에 두 개) 특정 아이디값을 지칭해줘야한다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { getComment, addComment, deleteComment } = commentSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentSlice.reducer;
