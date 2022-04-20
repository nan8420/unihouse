import axios from 'axios';
import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

axios.defaults.baseURL = Config.API_URL;

export const signup = createAsyncThunk(
  'user/signup',
  async (data: Object, {rejectWithValue}) => {
    try {
      const response = await axios.post('/user/signup', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (data: Object, {rejectWithValue}) => {
    try {
      const response = await axios.post('/user/login', data);
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.refreshToken,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
