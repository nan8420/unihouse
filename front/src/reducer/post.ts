import {createSlice} from '@reduxjs/toolkit';
import {
  addPost,
  loadPosts,
  likePost,
  unlikePost,
  addComment,
  loadPost,
  commentLike,
  commentUnLike,
} from '../actions/post';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  singlePost: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likeComment: [],

  commentLikeLoading: false,
  commentLikeDone: false,
  commentLikeError: null,

  commentUnLikeLoading: false,
  commentUnLikeDone: false,
  commentUnLikeError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    purePost(state) {
      state.mainPosts = [];
    },
  },
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

      // loadPost
      .addCase(loadPost.pending, state => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loadPostLoading = false;
        state.loadPostDone = true;
        state.likeComment = action.payload.Likecomments;
        state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error.message;
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
        // state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action: any) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })

      // likePost
      .addCase(likePost.pending, state => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // const post = find(state.mainPosts, {id: action.payload.PostId});
        const post = state.mainPosts.find(v => v.id === action.payload.PostId);
        // const post = find(state.mainPosts, {id: action.payload.PostId});
        state.likePostLoading = false;
        state.likePostDone = true;
        post.Likers.push({id: action.payload.UserId});
      })

      // .addCase(likePost.fulfilled, (state, action) => {
      //   const post = find(state.mainPosts, {id: action.payload.PostId});
      //   state.likePostLoading = false;
      //   state.likePostDone = true;
      //   post.Likers.push({id: action.payload.UserId});
      // })
      .addCase(likePost.rejected, (state, action: any) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })

      // unlikePost
      .addCase(unlikePost.pending, state => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const post = state.mainPosts.find(v => v.id === action.payload.PostId);
        // const post = _find(state.mainPosts, {id: action.payload.PostId});
        state.likePostLoading = false;
        state.likePostDone = true;
        // _remove(post.Likers, {id: action.payload.UserId});
        post.Likers = post.Likers.filter(v => v.id !== action.payload.UserId);
      })

      // .addCase(unlikePost.fulfilled, (state, action) => {
      //   const post = _find(state.mainPosts, {id: action.payload.PostId});
      //   state.likePostLoading = false;
      //   state.likePostDone = true;
      //   _remove(post.Likers, {id: action.payload.UserId});
      // })
      .addCase(unlikePost.rejected, (state, action: any) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })

      // addComment
      .addCase(addComment.pending, state => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.mainPosts.find(v => v.id === action.payload.PostId);

        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.singlePost.Comments.push(action.payload);
        post.Comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action: any) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      })

      // commentLike
      .addCase(commentLike.pending, state => {
        state.commentLikeLoading = true;
        state.commentLikeDone = false;
        state.commentLikeError = null;
      })
      .addCase(commentLike.fulfilled, (state: any, action) => {
        // const post = state.mainPosts.find(v => v.id === action.payload.PostId);
        const post = state.likeComment;
        post.push(action.payload);
        state.commentLikeLoading = false;
        state.commentLikeDone = true;
        // post.Likers.push({id: action.payload.UserId});
      })

      .addCase(commentLike.rejected, (state, action: any) => {
        state.commentLikeLoading = false;
        state.commentLikeError = action.error.message;
      })

      // commentUnLike

      .addCase(commentUnLike.pending, state => {
        state.commentUnLikeLoading = true;
        state.commentUnLikeDone = false;
        state.commentUnLikeError = null;
      })
      .addCase(commentUnLike.fulfilled, (state, action) => {
        state.likeComment = state.likeComment.filter(
          v => v.id !== action.payload.id,
        );
        state.commentUnLikeLoading = false;
        state.commentUnLikeDone = true;
      })

      .addCase(commentUnLike.rejected, (state, action: any) => {
        state.commentUnLikeLoading = false;
        state.commentUnLikeError = action.error.message;
      })

      .addDefaultCase(state => state),
});

export default postSlice;
function concat(mainPosts: any, payload: any): any {
  throw new Error('Function not implemented.');
}
