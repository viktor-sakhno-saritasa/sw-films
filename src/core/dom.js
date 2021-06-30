/**
 *
 */
export function createHeaderHTML(user = null) {
  const header = document.createElement('header');
  header.classList.add('main-page__header', 'header');
  header.innerHTML =  user
    ?
    `
      <h1 class="header__title">SW Films</h1>
      <ul class="header__list">
        <li class="header__item">
          <div class="header__user">
            <img class="header__user-icon" src="https://img.icons8.com/doodle/48/000000/user.png"/>
            <span class="header__username">${user.username}</span>
          </div>
          <a href="../main/main.html" id="logout-btn" class="button button--sign-in">Log out</a>
        </li>
      </ul>
    `
    :
    `
      <h1 class="header__title">SW Films</h1>
      <ul class="header__list">
        <li class="header__item">
          <a href="../login/login.html" class="button button--sign-in">Sign in</a>
        </li>
      </ul>
    `
  ;

  return header;
}

/**
 *
 */
export function createMainPage({ user, films }) {
  const mainPage = document.createElement('div');
  mainPage.classList.add('main-page');

  const filmsContent = document.createElement('main');
  filmsContent.classList.add('films');
  const filmsWrapper = document.createElement('div');
  filmsWrapper.classList.add('films__wrapper');

  filmsContent.append(filmsWrapper);

  filmsWrapper.insertAdjacentHTML('afterbegin', getFilmsOperationsHtml());

  const filmsList = createFilmsList(films);
  filmsList.classList.add('films__list');

  filmsWrapper.append(filmsList);

  mainPage.append(filmsContent);

  mainPage.insertAdjacentHTML('beforeend', getFooterHTML());

  return {mainPage, filmsList};
}

export function createFilmsList(films) {
  const ul = document.createElement('ul');
  ul.classList.add('films__list');

  films.forEach(film => {
    ul.insertAdjacentHTML('beforeend', createFilmItemHtml(film.fields));
  });

  return ul;
}

function createFilmItemHtml(film) {
  console.log('film', film);
  return `
   <li class="film__item">
    <div class="film__title">${film.title}</div>
    <div class="film__img">${film.episode_id}</div>
    <p class="film__description">${film.opening_crawl}</p>
    <button class="button button--more">More details</button>
  </li>
  `;
}

export function createPagination() {
  return `
    <div class="pagination-block">
      <span id="button_prev" class="pageButton outline-none">Prev</span>
      <span id="page_number" class="outline-none"></span>
      <span id="button_next" class="pageButton outline-none">Next</span> 
    </div>
  `;
}

function getFooterHTML() {
  return `
  <footer class="contacts">
    <a class="contacts__link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
    <span class="contacts__copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
  </footer>
  `;
}

function getFilmsOperationsHtml() {
  return `
  <div class="films__operations">
    <input class="films__search-input" type="search" placeholder="Search film by name...">
    <div class="button-sort">
      <img src="https://img.icons8.com/color-glass/50/000000/sort.png" height="30" width="30" alt="SORT"/>
    </div>
  </div>
  `;
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