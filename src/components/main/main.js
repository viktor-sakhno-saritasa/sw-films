import {fb} from '../../firebase/firebase.js';
import {getUserFromLocalStorage} from '../../core/utils.js';
import {createHeaderHTML, createMainPage} from '../../core/dom.js';
import {LogOut} from '../../core/auth.js';
import {getFilms} from '../../firebase/firestoreCrud.js';

const app = document.querySelector('#app');

const user = getUserFromLocalStorage();

app.insertAdjacentHTML('afterbegin', createHeaderHTML(user));

const loader = document.createElement('div');
loader.classList.add('loader-wrapper');
loader.insertAdjacentHTML('beforeend', '<div class="lds-hourglass"></div>');
app.append(loader);

getFilms().then(films => {
  app.append(createMainPage({ user, films }));
  loader.remove();
});

if (user) {
  const logoutBtn = document.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', LogOut);
}