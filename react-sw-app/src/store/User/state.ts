import User from '../../models/User';

type userState = {
  loading: boolean;
  user: User | undefined;
  error: string | null;
}

export const state: userState = {
  loading: false,
  user: undefined,
  error: null,
};
