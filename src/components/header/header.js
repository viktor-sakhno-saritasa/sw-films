/**
 *
 */
import {LOGIN_PAGE_URL, MAIN_PAGE_URL} from '../../utils/consts.js';

function Header(user, logoutHandler) {

  const header = document.createElement('header');
  header.classList.add('main-page__header', 'header');
    
  const innerContent = user
    ?
    `
      <div class="header__user">
        <img class="header__user-icon" src="https://img.icons8.com/doodle/48/000000/user.png"/>
        <span class="header__username">${user.name}</span>
      </div>
      <a href=${MAIN_PAGE_URL} id="logout-btn" class="button button--sign-in">Log out</a>
    `
    :
    `
      <a href=${LOGIN_PAGE_URL} class="button button--sign-in">Sign in</a>
    `;
    
  header.innerHTML = `
      <h1 class="header__title">SW Films</h1>
      <ul class="header__list">
        <li class="header__item">${innerContent}</li>
      </ul>
    `;

  if (user) {
    const logout = header.querySelector('#logout-btn');
    logout.addEventListener('click', logoutHandler);
  }
    
  return header;
}


export default Header;