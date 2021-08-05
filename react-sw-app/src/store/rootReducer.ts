import { combineReducers } from '@reduxjs/toolkit';
import { user } from './User';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  user,
});
