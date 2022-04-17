import axios from 'axios';
import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

export const login = createAsyncThunk(
  'user/login',
  async (data: Object, {rejectWithValue}) => {
    try {
      console.log('data::::', data);
      const response = await axios.post('/user/login', data);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response.data);
    }
  },
);
