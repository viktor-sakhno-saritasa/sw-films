import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/User';

import { state } from './state';

const userSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    loginUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess(state, { payload }: PayloadAction<User | undefined>) {
      state.user = payload;
      state.loading = false;
    },
    loginUserFailed(state, { payload }: PayloadAction<Error>) {
      state.error = payload.message;
    },
    logoutUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutUserFailed(state, { payload }: PayloadAction<Error>) {
      state.error = payload.message;
    },
    logoutUserSuccess(state) {
      state.user = undefined;
      state.loading = true;
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailed,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailed,
} = userSlice.actions;

export const user = userSlice.reducer;
