        dispatch(loadPosts());


        dispatch(loadPosts(lastId:lastId));



        export const loadPosts = createAsyncThunk(
          'post/loadPosts',
          async (data: any, thunkAPI) => {
            try {
              const response = await axios.get(`/post?lastId=${data?.lastId || 0}`);
              return response.data;
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response.data);
            }
          },