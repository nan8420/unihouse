const sendPostfunc = useCallback(async () => {
  dispatch(addPost(formData));

  navigation.navigate('PostList');
}, [dispatch, navigation]);

export const addPost = createAsyncThunk(
  'post/addPost',
  async (data: Object, thunkAPI) => {
    try {
      const response = await axios.post('/post/addPost', data);

      thunkAPI.dispatch(postSlice.actions.purePost());

      thunkAPI.dispatch(loadPosts());
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
