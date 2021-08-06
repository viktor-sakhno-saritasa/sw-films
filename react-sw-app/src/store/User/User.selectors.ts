import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';

const userStateSelect = (state: RootState) => state.user;

export const userSelect = createSelector(
  userStateSelect,
  (userState) => userState.user,
);
