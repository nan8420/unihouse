import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, signup} from '../actions/user';

const initialState = {
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
  accessToken: '',

  me: null,
  userInfo: null,

  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    addPostToMe(state: any, action) {
      state.me.Posts.unshift({id: action.payload});
    },
  },
  extraReducers: builder =>
    builder

      // signup
      .addCase(signup.pending, state => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, state => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })

      .addCase(login.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.me = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      .addDefaultCase(state => state),
});

export default userSlice;
