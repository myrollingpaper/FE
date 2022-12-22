import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/api";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  isLogin: false,
};

// 우리가 추가한 Thunk 함수
export const __getPost = createAsyncThunk(
  "posts/getposts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/boards`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "posts/addPost",
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();
      const json = JSON.stringify({
        title: payload.title,
        content: payload.content,
      });
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("requestDto", blob);
      formData.append("image", payload.image);
      const data = await instance.post(`/boards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return thunkAPI.fulfillWithValue(data.data, window.location.reload());
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload, thunkAPI) => {
    try {
      await instance.delete(`/boards/${payload}`);
      return window.location.reload();
      // "삭제 완료";
      // thunkAPI.fulfillWithValue({
      //   msg: payload.msg,
      //   navigate: payload.navigate,
      // });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//수정
export const __editPost = createAsyncThunk(
  "posts/editPost",
  async (payload, thunkAPI) => {
    try {
      const json = JSON.stringify({
        title: payload.title,
        content: payload.content,
      });
      // const config = {
      //   "Content-Type": "application/json",
      // };
      console.log("payload", payload);
      console.log("payload.id", payload.id);
      const data = await instance.patch(`/boards/${payload.id}`, json, {
        headers: {
          "Content-Type": "application/json",
        }, //headers에 직접 명시를 해줘야된다(중괄호에 담기)
      });
      return thunkAPI.fulfillWithValue(data.data, window.location.reload());
    } catch (error) {
      alert("로그인이 필요합니다.");
      window.location.replace("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //받기
    [__getPost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //삭제
    [__deletePost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload;
      state.isLogin = true; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
      alert("삭제 완료!");
      // action.payload.navigate("/");
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      // state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //수정
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.posts = action.payload;
      alert("수정 완료!");
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { editPost, deletePost, getPost, addPost } = postsSlice.actions;
export default postsSlice.reducer;
