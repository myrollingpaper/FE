import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  rollings: [
    {
      id: 1,
      title: "react ",
      content: "내가 했다",
    },
  ],
  isLoading: false,
  error: null,
};

// 우리가 추가한 Thunk 함수
export const __getRollings = createAsyncThunk(
  "rollings/getRollings",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/rollings");
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addRollings = createAsyncThunk(
  "rollings/getRollings",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post("http://localhost:3001/rollings", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteRollings = createAsyncThunk(
  "rollings/deleteRollings",
  async (payload, ThunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/rollings/${payload}`);
      return "삭제 완료";
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//수정
export const __editRollings = createAsyncThunk(
  "rollings/editRollings",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/rollings/${payload.id}`, {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      });
      const data = await axios.get(
        `http://localhost:3001/rollings/show/${payload.id}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("로그인이 필요합니다.");
      window.location.replace("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RollingSlice = createSlice({
  name: "rollings",
  initialState,
  reducers: {},
  extraReducers: {
    //받기
    [__getRollings.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getRollings.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getRollings.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //삭제
    [__deleteRollings.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteRollings.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
    },
    [__deleteRollings.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //수정
    [__editRollings.pending]: (state) => {
      state.isLoading = true;
    },
    [__editRollings.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },

    [__editRollings.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getRollings, deleteRollings, addRollings, editRollings } =
  RollingSlice.actions;
export default RollingSlice.reducer;
