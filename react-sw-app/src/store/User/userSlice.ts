import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/User';

import { state } from './state';

const userSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, { payload }: PayloadAction<User | undefined>) {
      state.user = payload;
      state.loading = false;
      state.logged = true;
    },
    getUserFailed(state, { payload }: PayloadAction<Error>) {
      state.error = payload.message;
    },
    logoutUserSuccess(state) {
      state.user = undefined;
      state.logged = false;
      state.loading = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  logoutUserSuccess,
} = userSlice.actions;

export const user = userSlice.reducer;
