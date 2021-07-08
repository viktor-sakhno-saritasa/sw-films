import { getUserFromLocalStorage } from '../../utils/utils';

import { userLocalStorageType } from './../../user-type';
import LoginView from './login-view';

const loginView: LoginView = new LoginView();
const user: userLocalStorageType = getUserFromLocalStorage();

loginView.render(user);
