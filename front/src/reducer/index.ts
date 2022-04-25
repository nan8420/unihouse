import {combineReducers} from 'redux';
import userSlice from './user';
import postSlice from './post';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
