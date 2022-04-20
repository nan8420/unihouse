import {combineReducers} from 'redux';
import userSlice from './user';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  // order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
