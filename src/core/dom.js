/**
 *
 */
function createHeaderHTML(user = null, title = 'SW Films') {
  return user
    ?
    `
    <header class="main-page__header header">
      <h1 class="header__title">${title}</h1>
      <ul class="header__list">
        <li class="header__item">
          <div class="header__user">
            <img class="header__user-icon" src="https://img.icons8.com/doodle/48/000000/user.png"/>
            <span class="header__username">${user.username}</span>
          </div>
          <a href="../main/main.html" id="logout-btn" class="button button--sign-in">Log out</a>
        </li>
      </ul>
    </header>
    `
    :
    `
    <header class="main-page__header header">
      <h1 class="header__title">${title}</h1>
      <ul class="header__list">
        <li class="header__item">
          <a href="../login/login.html" class="button button--sign-in">Sign in</a>
        </li>
      </ul>
    </header>
    `
  ;
}

/**
 *
 */
function createFilmsHTML() {

}

/**
 *
 */
export function createMainPage(options) {
  const html = document.createElement('div');
  html.classList.add('main-page');

  html.insertAdjacentHTML('afterbegin', createHeaderHTML(options));

  return html;
}

export function createLoginPage(user) {
  return user
    ?
    `
    <main class="films films--login">
      <div class="films__wrapper">
        <a href="../main/main.html" id="back-link" class="button button--auth button--link">
          <img src="https://img.icons8.com/clouds/100/000000/checkmark--v1.png" width="50" height="50" alt="authorized">
          <span class="button__text">Hello, ${user.username}. Go to the main page</span>
        </a>
      </div>
    </main>
    `
    :
    `
    <main class="films films--login">
      <div class="films__wrapper">
        <button id="google-auth" class="button button--auth">
          <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" width="50" height="50" alt="Google">
          <span class="button__text">Sign in</span>
        </button>
      </div>
    </main>
    `
  ;
}