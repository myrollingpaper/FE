import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "instance";

//초기값 설정
const initialState = {
  comments: [
    {
      content: "hello",
    },
  ],
  isLoading: false,
  error: null,
};
//가져오기
export const __getComment = createAsyncThunk(
  "comments/getcomment",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await instance.get(`/boards`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//서버에 보내서 추가하기
export const __addComment = createAsyncThunk(
  "comments/addcomment",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const data = await instance.post(`/boards`, payload);
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
      await instance.delete(
        `/boards/${payload.id}/comments/${payload.commentid}`
      );
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
  name: "comments",
  initialState,
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      alert(action.payload.msg);
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload.msg);
    },

    //추가
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      alert(action.payload.msg);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload.msg);
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
      alert(action.payload.msg);
      // 아이디값이 두개가 들어갔으므로 (payload에 두 개) 특정 아이디값을 지칭해줘야한다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload.msg);
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { getComment, addComment, deleteComment } = commentSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentSlice.reducer;
