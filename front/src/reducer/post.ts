import {createSlice} from '@reduxjs/toolkit';
import {addPost} from '../actions/post';

export const initialState = {
  mainPosts: [],
  imagePaths: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // addPost
      .addCase(addPost.pending, state => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state: any, action: any) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action: any) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })

      .addDefaultCase(state => state),
});

export default postSlice;
