import { login, logout } from '../../api/services/User';
import { AppThunk } from '../index';
import {
  loginUserFailed,
  loginUserStart,
  loginUserSuccess,
  logoutUserFailed,
  logoutUserStart,
  logoutUserSuccess,
} from './userSlice';

export const loginUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const user = await login();
    dispatch(loginUserSuccess(user));
  } catch (error) {
    dispatch(loginUserFailed(error as Error));
  }
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(logoutUserStart());
    await logout();
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFailed(error as Error));
  }
};
