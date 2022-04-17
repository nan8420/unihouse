import {createSlice} from '@reduxjs/toolkit';
import {login} from '../actions/user';

export const initialState = {
  me: null,
  userInfo: null,

  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder

      .addCase(login.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.me = action.payload;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        // state.loginError = action.payload;
      }),
});

export default userSlice;
