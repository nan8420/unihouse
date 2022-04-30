import axios from 'axios';
import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../reducer/user';
import postSlice from '../reducer/post';

axios.defaults.baseURL = Config.API_URL;

type DataType = {
  content?: string;
  postId?: string;
};

export const loadPosts = createAsyncThunk(
  'post/loadPosts',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.get(`/post?lastId=${data?.lastId || 0}`);
      // console.log('response:::', response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },

  // {
  //   condition: (data, { getState }) => {
  //     const { post } = getState();

  //     if (post.loadPostsLoading) {
  //       // console.warn('중복 요청 취소');
  //       return false;
  //     }
  //     return true;
  //   },
  // }
);

export const loadPost = createAsyncThunk(
  'post/loadPost',
  async (data: DataType, {rejectWithValue}) => {
    try {
      // console.log('data:', data);
      // console.log('typeof', typeof data.postId);
      const response = await axios.get(`/post/${data.postId}`);
      // console.log('response:::', response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addPost = createAsyncThunk(
  'post/addPost',
  async (data: Object, thunkAPI) => {
    try {
      console.log('data:', data);
      const accessToken = await EncryptedStorage.getItem('accessToken');

      const response = await axios.post('/post/addPost', data, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: formData => formData,
      });

      // console.log('response:', response);
      thunkAPI.dispatch(postSlice.actions.purePost());

      thunkAPI.dispatch(loadPosts());
      // thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const likePost = createAsyncThunk(
  'post/likePost',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await axios.patch(`/post/${data.postId}/like`); // PATCH /post/1/like
      // console.log('response:', response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const unlikePost = createAsyncThunk(
  'post/unlikePost',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`/post/${data.postId}/like`); // DELETE /post/1/like
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async (data: DataType, {rejectWithValue}) => {
    try {
      // console.log('data:', data);
      const response = await axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const commentLike = createAsyncThunk(
  'post/commentLike',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await axios.patch(`/post/commentLike`, data); // PATCH /post/1/like
      // console.log('response:', response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const commentUnLike = createAsyncThunk(
  'post/commentUnLike',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await axios.patch(`/post/commentUnLike`, data); // DELETE /post/1/like
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
