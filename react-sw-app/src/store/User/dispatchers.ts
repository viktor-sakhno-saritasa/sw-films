import { login, logout } from '../../api/services/User';
import { AppThunk } from '../index';
import {
  getUserFailed, getUserStart, getUserSuccess, logoutUserSuccess,
} from './userSlice';

export const loginUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const user = await login();
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailed(error as Error));
  }
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart());
    await logout();
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(getUserFailed(error as Error));
  }
};
