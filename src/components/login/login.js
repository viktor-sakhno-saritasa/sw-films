import {getUserFromLocalStorage} from '../../utils/utils.js';
import LoginView from './login.view.js';

const loginView = new LoginView();
const user = getUserFromLocalStorage();

loginView.render(user);
loginView.initListeners(user);