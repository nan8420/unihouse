import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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

export interface maintypes {
  // PostId: number;

  Comments: IComment[] | null;
  Images: IImage[] | null;

  Likers?: Array<{
    id: number;
    Like?: {
      createdAt: string;
      updatedAt: string;
      PostId: number;
      UserId: number;
    };
  }>;

  Likecomments: ILikecomments[] | null;

  id: number;
  // id: string;

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: {
    id: number;
    nickname: string;
  };
}

interface IImage {
  PostId: number;
  createdAt: string;
  id: number;
  src: string;
  updatedAt: string;
}

export interface IComment {
  PostId: number;
  User: {
    id: number;
    nickname: string;
  };
  UserId: number;
  content: string;

  createdAt: string;
  updatedAt: string;
  id: number;
}

interface ILikecomments {
  CommentId: number;
  PostId: number;
  UserId: number;
  id: number;
}

interface ISinglePost {
  Comments: IComment[] | null;
  Images: IImage[] | null;
}

interface IInitialState {
  singlePost: ISinglePost | null;

  mainPosts: maintypes[];

  // mainPosts: Array<{
  //   id?: number;
  //   content?: string;
  //   createdAt?: string;
  //   updatedAt?: string;
  //   UserId?: number;
  //   User?: {
  //     id: number;
  //     nickname: string;
  //   };

  //   Images?: IImage[] | null;

  //   Comments?: IComment[] | null;

  //   // Likers: any | null;
  //   Likers?: Array<{
  //     id: number;
  //     Like?: {
  //       createdAt: string;
  //       updatedAt: string;
  //       PostId: number;
  //       UserId: number;
  //     };
  //   }>;

  //   Likecomments?: ILikecomments[] | null;
  // }

  // >;

  likeComment?: ILikecomments[] | null;

  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: string | null | undefined;

  loadPostLoading: boolean;

  loadPostDone: boolean;

  loadPostError: string | null | undefined;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null | undefined;

  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string | null | undefined;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null | undefined;

  commentLikeLoading: boolean;
  commentLikeDone: boolean;
  commentLikeError: string | null | undefined;

  commentUnLikeLoading: boolean;
  commentUnLikeDone: boolean;
  commentUnLikeError: string | null | undefined;
}

export const initialState: IInitialState = {
  mainPosts: [],
  // imagePaths: [],
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
      state.singlePost = null;
    },
  },
  extraReducers: builder =>
    builder

      // loadPosts
      .addCase(loadPosts.pending, state => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(
        loadPosts.fulfilled,
        (state, action: PayloadAction<maintypes>) => {
          state.loadPostsLoading = false;
          state.loadPostsDone = true;
          state.mainPosts = state.mainPosts.concat(action.payload);
        },
      )
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })

      // loadPost
      .addCase(loadPost.pending, state => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(
        loadPost.fulfilled,
        (state, action: PayloadAction<maintypes>) => {
          state.loadPostLoading = false;
          state.loadPostDone = true;
          state.likeComment = action.payload.Likecomments;
          state.singlePost = action.payload;
        },
      )
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
      .addCase(addPost.fulfilled, state => {
        state.addPostLoading = false;
        state.addPostDone = true;
      })
      .addCase(addPost.rejected, (state, action) => {
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
        const post = state.mainPosts.find(v => v.id === action.payload.PostId);
        state.likePostLoading = false;
        state.likePostDone = true;
        post?.Likers?.push({id: action.payload.UserId});
      })
      .addCase(likePost.rejected, (state, action) => {
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
        state.likePostLoading = false;
        state.likePostDone = true;
        post.Likers = post?.Likers?.filter(
          (v: {id: number}) => v.id !== action.payload.UserId,
        );
      })
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
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<maintypes>) => {
          const post = state.mainPosts.find(
            v => v.id === action.payload.PostId,
          );
          state.addCommentLoading = false;
          state.addCommentDone = true;
          state.singlePost?.Comments?.push(action.payload);
          post?.Comments?.push(action.payload);
        },
      )
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
      .addCase(commentLike.fulfilled, (state, action) => {
        const post = state.likeComment;
        post?.push(action.payload);
        state.commentLikeLoading = false;
        state.commentLikeDone = true;
      })
      .addCase(commentLike.rejected, (state, action) => {
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
        state.likeComment = state.likeComment?.filter(
          v => v.id !== action.payload.id,
        );
        state.commentUnLikeLoading = false;
        state.commentUnLikeDone = true;
      })
      .addCase(commentUnLike.rejected, (state, action) => {
        state.commentUnLikeLoading = false;
        state.commentUnLikeError = action.error.message;
      })

      .addDefaultCase(state => state),
});

export default postSlice;

// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {
//   addPost,
//   loadPosts,
//   likePost,
//   unlikePost,
//   addComment,
//   loadPost,
//   commentLike,
//   commentUnLike,
// } from '../actions/post';

// export interface maintypes {
//   PostId?: number;

//   Comments?: IComment[] | null;
//   Images?: IImage[] | null;

//   Likers?: Array<{
//     id: number;
//     Like?: {
//       createdAt: string;
//       updatedAt: string;
//       PostId: number;
//       UserId: number;
//     };
//   }>;

//   Likecomments?: ILikecomments[] | null;

//   id: number;
//   // id: string;

//   content?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   UserId?: number;
//   User?: {
//     id: number;
//     nickname: string;
//   };
// }

// interface IImage {
//   PostId?: number;
//   createdAt?: string;
//   id?: number;
//   src?: string;
//   updatedAt?: string;
// }

// interface IComment {
//   PostId?: number;
//   User?: {
//     id: number;
//     nickname: string;
//   };
//   UserId?: number;
//   content?: string;

//   createdAt?: string;
//   updatedAt?: string;
//   id?: number;
// }

// interface ILikecomments {
//   CommentId: number;
//   PostId: number;
//   UserId: number;
//   id: number;
// }

// interface ISinglePost {
//   Comments?: IComment[] | null;
//   Images?: IImage[] | null;
// }

// interface IInitialState {
//   singlePost: ISinglePost | null;

//   mainPosts: maintypes[];

//   // mainPosts: Array<{
//   //   id?: number;
//   //   content?: string;
//   //   createdAt?: string;
//   //   updatedAt?: string;
//   //   UserId?: number;
//   //   User?: {
//   //     id: number;
//   //     nickname: string;
//   //   };

//   //   Images?: IImage[] | null;

//   //   Comments?: IComment[] | null;

//   //   // Likers: any | null;
//   //   Likers?: Array<{
//   //     id: number;
//   //     Like?: {
//   //       createdAt: string;
//   //       updatedAt: string;
//   //       PostId: number;
//   //       UserId: number;
//   //     };
//   //   }>;

//   //   Likecomments?: ILikecomments[] | null;
//   // }

//   // >;

//   likeComment?: ILikecomments[] | null;

//   loadPostsLoading: boolean;
//   loadPostsDone: boolean;
//   loadPostsError: string | null | undefined;

//   loadPostLoading: boolean;

//   loadPostDone: boolean;

//   loadPostError: string | null | undefined;

//   addPostLoading: boolean;
//   addPostDone: boolean;
//   addPostError: string | null | undefined;

//   likePostLoading: boolean;
//   likePostDone: boolean;
//   likePostError: string | null | undefined;

//   addCommentLoading: boolean;
//   addCommentDone: boolean;
//   addCommentError: string | null | undefined;

//   commentLikeLoading: boolean;
//   commentLikeDone: boolean;
//   commentLikeError: string | null | undefined;

//   commentUnLikeLoading: boolean;
//   commentUnLikeDone: boolean;
//   commentUnLikeError: string | null | undefined;
// }

// export const initialState: IInitialState = {
//   mainPosts: [],
//   // imagePaths: [],
//   singlePost: null,
//   loadPostsLoading: false,
//   loadPostsDone: false,
//   loadPostsError: null,

//   loadPostLoading: false,
//   loadPostDone: false,
//   loadPostError: null,

//   addPostLoading: false,
//   addPostDone: false,
//   addPostError: null,

//   likePostLoading: false,
//   likePostDone: false,
//   likePostError: null,

//   addCommentLoading: false,
//   addCommentDone: false,
//   addCommentError: null,

//   likeComment: [],

//   commentLikeLoading: false,
//   commentLikeDone: false,
//   commentLikeError: null,

//   commentUnLikeLoading: false,
//   commentUnLikeDone: false,
//   commentUnLikeError: null,
// };

// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {
//     purePost(state) {
//       state.mainPosts = [];
//       state.singlePost = null;
//     },
//   },
//   extraReducers: builder =>
//     builder

//       // loadPosts
//       .addCase(loadPosts.pending, state => {
//         state.loadPostsLoading = true;
//         state.loadPostsDone = false;
//         state.loadPostsError = null;
//       })
//       .addCase(
//         loadPosts.fulfilled,
//         (state, action: PayloadAction<maintypes>) => {
//           state.loadPostsLoading = false;
//           state.loadPostsDone = true;
//           state.mainPosts = state.mainPosts.concat(action.payload);
//         },
//       )
//       .addCase(loadPosts.rejected, (state, action) => {
//         state.loadPostsLoading = false;
//         state.loadPostsError = action.error.message;
//       })

//       // loadPost
//       .addCase(loadPost.pending, state => {
//         state.loadPostLoading = true;
//         state.loadPostDone = false;
//         state.loadPostError = null;
//       })
//       .addCase(
//         loadPost.fulfilled,
//         (state, action: PayloadAction<maintypes>) => {
//           state.loadPostLoading = false;
//           state.loadPostDone = true;
//           state.likeComment = action.payload.Likecomments;
//           state.singlePost = action.payload;
//         },
//       )
//       .addCase(loadPost.rejected, (state, action) => {
//         state.loadPostLoading = false;
//         state.loadPostError = action.error.message;
//       })

//       // addPost
//       .addCase(addPost.pending, state => {
//         state.addPostLoading = true;
//         state.addPostDone = false;
//         state.addPostError = null;
//       })
//       .addCase(addPost.fulfilled, state => {
//         state.addPostLoading = false;
//         state.addPostDone = true;
//       })
//       .addCase(addPost.rejected, (state, action) => {
//         state.addPostLoading = false;
//         state.addPostError = action.error.message;
//       })

//       // likePost
//       .addCase(likePost.pending, state => {
//         state.likePostLoading = true;
//         state.likePostDone = false;
//         state.likePostError = null;
//       })
//       .addCase(likePost.fulfilled, (state, action) => {
//         const post = state.mainPosts.find(v => v.id === action.payload.PostId);
//         state.likePostLoading = false;
//         state.likePostDone = true;
//         post?.Likers?.push({id: action.payload.UserId});
//       })
//       .addCase(likePost.rejected, (state, action) => {
//         state.likePostLoading = false;
//         state.likePostError = action.error.message;
//       })

//       // unlikePost
//       .addCase(unlikePost.pending, state => {
//         state.likePostLoading = true;
//         state.likePostDone = false;
//         state.likePostError = null;
//       })
//       .addCase(unlikePost.fulfilled, (state, action) => {
//         const post = state.mainPosts.find(v => v.id === action.payload.PostId);
//         state.likePostLoading = false;
//         state.likePostDone = true;
//         post.Likers = post?.Likers?.filter(
//           (v: {id: number}) => v.id !== action.payload.UserId,
//         );
//       })
//       .addCase(unlikePost.rejected, (state, action: any) => {
//         state.likePostLoading = false;
//         state.likePostError = action.error.message;
//       })

//       // addComment
//       .addCase(addComment.pending, state => {
//         state.addCommentLoading = true;
//         state.addCommentDone = false;
//         state.addCommentError = null;
//       })
//       .addCase(
//         addComment.fulfilled,
//         (state, action: PayloadAction<maintypes>) => {
//           const post = state.mainPosts.find(
//             v => v.id === action.payload.PostId,
//           );
//           state.addCommentLoading = false;
//           state.addCommentDone = true;
//           state.singlePost?.Comments?.push(action.payload);
//           post?.Comments?.push(action.payload);
//         },
//       )
//       .addCase(addComment.rejected, (state, action: any) => {
//         state.addCommentLoading = false;
//         state.addCommentError = action.error.message;
//       })

//       // commentLike
//       .addCase(commentLike.pending, state => {
//         state.commentLikeLoading = true;
//         state.commentLikeDone = false;
//         state.commentLikeError = null;
//       })
//       .addCase(commentLike.fulfilled, (state, action) => {
//         const post = state.likeComment;
//         post?.push(action.payload);
//         state.commentLikeLoading = false;
//         state.commentLikeDone = true;
//       })
//       .addCase(commentLike.rejected, (state, action) => {
//         state.commentLikeLoading = false;
//         state.commentLikeError = action.error.message;
//       })

//       // commentUnLike
//       .addCase(commentUnLike.pending, state => {
//         state.commentUnLikeLoading = true;
//         state.commentUnLikeDone = false;
//         state.commentUnLikeError = null;
//       })
//       .addCase(commentUnLike.fulfilled, (state, action) => {
//         state.likeComment = state.likeComment?.filter(
//           v => v.id !== action.payload.id,
//         );
//         state.commentUnLikeLoading = false;
//         state.commentUnLikeDone = true;
//       })
//       .addCase(commentUnLike.rejected, (state, action) => {
//         state.commentUnLikeLoading = false;
//         state.commentUnLikeError = action.error.message;
//       })

//       .addDefaultCase(state => state),
// });

// export default postSlice;
