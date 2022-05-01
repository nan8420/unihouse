import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, signup, loadMyInfo} from '../actions/user';

const initialState = {
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
  me: null,
  userInfo: null,

  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,

  loadMyInfoLoading: false, // 로그인 정보 조회
  loadMyInfoDone: false,
  loadMyInfoError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPostToMe(state: any, action) {
      state.me.Posts.unshift({id: action.payload});
    },
    reMoveme(state) {
      state.me = null;
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

      //login
      .addCase(login.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.me = action.payload.user;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })

      // loadMyInfo
      .addCase(loadMyInfo.pending, state => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action: any) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.payload;
      })
      .addDefaultCase(state => state),
});

export default userSlice;
