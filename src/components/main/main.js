import MainView from './main.view.js';
import {getUserFromLocalStorage} from '../../utils/utils.js';
import {getFilms} from '../../firebase/firestore.js';

const mainView = new MainView();
const user = getUserFromLocalStorage();

mainView.initialRender(user);

getFilms().then(films => {
  mainView.render(user, films);
});