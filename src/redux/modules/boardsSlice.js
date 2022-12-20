// src/redux/modules/todosSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cooment: [],
    boards: [],
    isLoading: false,
    error: null,
    };

export const __addBoard = createAsyncThunk(
    "addBoard",

  async (payload, thunkAPI) => {
    await axios.post("http://localhost:3001/boards", payload);
    return thunkAPI.fulfillWithValue(payload);
  }
);
export const __addComment = createAsyncThunk(
  "addComment",

  async (payload, thunkAPI) => {
    await axios.post("http://localhost:3001/comments", payload);
    return thunkAPI.fulfillWithValue(payload);
  }
);

export const __getBoards = createAsyncThunk(
  "boards/getBoards",
  async (payload, thunkAPI) => {
    // const data는 Promise를 반환
    try {
      const data = await axios.get("http://localhost:3001/boards");

      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __getListBoards = createAsyncThunk(
//   "boards/getBoardsByList",
//   async (payload, thunkAPI) => {
//     console.log("payload", payload);
//     // const data는 Promise를 반환
//     try {
//       const data = await axios.get(
//         `http://localhost:3001/todos?category=${payload}`
//       );

//       console.log("data", data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const __getBoardById = createAsyncThunk(
  "boards/getBoardById",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    // const data는 Promise를 반환
    try {
      const data = await axios.get(`http://localhost:3001/boards?id=${payload}`);

      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const __getTodosByIsDone = createAsyncThunk(
//   "todos/getTodosByCategory",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get(`http://localhost:3001/todos?isDone=false`);

//       console.log("data", data.data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const boardsSlice = createSlice({
  name: "boards",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__getBoards.pending]: (state) => {
      state.isLoading = true;
    },
    [__getBoards.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    // [__getListBoards.fulfilled]: (state, action) => {
    //   console.log(action.payload);
    //   state.isLoading = false;
    //   state.boards = action.payload;
    // },
    [__getBoardById.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.boards = action.payload;
    },
    // [__getTodosByIsDone.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.boards = action.payload;
    // },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.comment.push(action.payload);
    },
    [__getBoards.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
