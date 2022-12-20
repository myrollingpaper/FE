import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const instance = axios.create({
//   baseURL: `http://jisung.shop:8080`,
//   Bearer: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNjcxMDgxMTEzLCJpYXQiOjE2NzEwNzc1MTN9.IpXI8Re_VkJ0N8zhrzjdJZ1x1C3TYrC_xZkcLgdQl3I`,
// });
const initialState = {
  todos: [
    {
      id: 1,
      nickname: "jaeyeong",
      title: "ㅁㄴㅇㅁㄴㅇ",
      content: "ㅁㄴㅇㅁㄴㅇ",
      imgUrl:
        "https://modo-phinf.pstatic.net/20160601_1/1464753900299CUs6Q_JPEG/mosaMJbhKd.jpeg?type=w1100",
      createdAt: "2022-12-16T18:05:33.177063",
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
    },
  ],
};

// 우리가 추가한 Thunk 함수
export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/boards");
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "todos/addPost",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post("http://localhost:3001/boards", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload, ThunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/boards/${payload}`);
      return "삭제 완료";
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
//수정
export const __editPost = createAsyncThunk(
  "posts/editPost",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/boards/${payload.id}`, {
        id: payload.id,
        title: payload.title,
        content: payload.content,
        imgUrl: payload.imgUrl,
      });
      const data = await axios.get(
        `http://localhost:3001/boards/show/${payload.id}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("로그인이 필요합니다.");
      window.location.replace("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    //받기
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //삭제
    [__deletePost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //수정
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },

    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { editPost, deletePost, getTodos, addPost } = todosSlice.actions;
export default todosSlice.reducer;
