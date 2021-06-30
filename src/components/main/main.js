import {fb} from '../../firebase/firebase.js';
import {getUserFromLocalStorage} from '../../core/utils.js';
import {createMainPage} from '../../core/dom.js';
import {LogOut} from '../../core/auth.js';

const app = document.querySelector('#app');

const user = getUserFromLocalStorage();
app.append(createMainPage(user));

if (user) {
  const logoutBtn = document.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', LogOut);
}