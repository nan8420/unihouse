import {createSlice} from '@reduxjs/toolkit';
import {addPost, loadPosts} from '../actions/post';

export const initialState = {
  mainPosts: [],
  imagePaths: [],

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

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

      // loadPosts
      .addCase(loadPosts.pending, (state: any) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state: any, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);

        // state.mainPosts = concat(state.mainPosts, action.payload);

        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state: any, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })

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
function concat(mainPosts: any, payload: any): any {
  throw new Error('Function not implemented.');
}
