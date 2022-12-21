import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie, delCookie } from "../../cookie/cookie";
import instance from "../../shared/api";

const initialState = {
  account: [
    {
      username: "abcd1234",
      password: "abcd1234",
      nickname: "abcd1234",
    },
  ],
  isLoading: false,
  error: null,
};

export const __userLogin = createAsyncThunk(
  "account/userLogin",
  // login : reducer name, 경로 정해줘야
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/users/login`, payload);
      const Access_Token = data.headers.authorization;
      localStorage.setItem("token", Access_Token);
      window.location.replace('/');
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      if (400 < error.data.status && error.data.status < 500) {
        window.location.reload();
        alert("로그인 실패");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __userLogout = createAsyncThunk(
//   "account/userLogout",
//   async (payload, thunkAPI) => {
//     try {
//       await instance.delete(`http://localhost:3001/logout`, { headers: headers });
//       delCookie("Access_Token");
//       delCookie("nickname");
//       return thunkAPI.fulfillWithValue(payload);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const __checkId = createAsyncThunk(
//   "account/checkId",
//   // type
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const data = await instance.post(`http://localhost:3001/login`, {
//         userid: payload,
//       });
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const __checkName = createAsyncThunk(
//   "account/checkName",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await instance.post(`http://localhost:3001/checkname`, {
//         nickname: payload,
//       });
//       // 415는 타입에러. {}로 감싸서 보낸다.
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __userSignUp = createAsyncThunk(
  "account/userSignUp",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.post(`users/signup`, payload.obj);
      console.log(data.data.msg);
      return thunkAPI.fulfillWithValue({
        msg: data.data.msg,
        navigate: payload.navigate,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LoginSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [__userLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account = action.payload.nickname;
      console.log(action.payload);
      alert(action.payload.msg); //
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    // [__userLogout.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__userLogout.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.account = action.payload; //
    // },
    // [__userLogout.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
    // [__checkId.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__checkId.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.idCheck = action.payload;
    // },
    // [__checkId.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
    // [__checkName.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__checkName.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.nameCheck = action.payload;
    // },
    // [__checkName.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.isSuccess = false;
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
    [__userSignUp.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userSignUp.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      console.log(action.payload);
      alert(action.payload.msg);
      action.payload.navigate("/login");
    },
    [__userSignUp.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      alert("회원가입에 실패하셨습니다."); // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { userLogin, userSignUp, userSignUpGet, checkId } =
  LoginSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default LoginSlice.reducer;
