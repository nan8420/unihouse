import axios from 'axios';
import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../reducer/user';

axios.defaults.baseURL = Config.API_URL;

export const addPost = createAsyncThunk(
  'user/addPost',
  async (data: any, thunkAPI) => {
    try {
      console.log('data:::', data);
      const response = await axios.post('/user/addPost', data, {
        headers: {authorization: `Bearer ${data.accessToken}`},
      });
      console.log('response:::', response);
      thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
