// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const __addNewPost = createAsyncThunk(
//   "ADD_POST",
//   async (payload, ThunkAPI) => {
//     try {
//       const { data } = await axios.post("http://localhost:3001/todos", payload);
//       return ThunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return ThunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   todos: [],
//   isLoading: false,
//   error: null,
// };

// export const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [__addNewPost.pending]: (state) => {
//       state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
//     },
//     [__addNewPost.fulfilled]: (state, action) => {
//       state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.todos = action.payload; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
//     },
//     [__addNewPost.rejected]: (state, action) => {
//       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
//     },
//   },
// });

// export default todoSlice.reducer;
