import axios from 'axios';
import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../reducer/user';
import postSlice from '../reducer/post';

axios.defaults.baseURL = Config.API_URL;

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

export const addPost = createAsyncThunk(
  'post/addPost',
  async (data: Object, thunkAPI) => {
    try {
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

// export const addPost = createAsyncThunk(
//   'post/addPost',
//   async (data: Object, thunkAPI) => {
//     try {
//       console.log('data:::', data);
//       const response = await axios.post('/post/addPost', data);
//       // const response = await axios.post('/user/addPost', data, {
//       //   headers: {authorization: `Bearer ${data.accessToken}`},
//       // });
//       // console.log('response:::', response);
//       thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );
