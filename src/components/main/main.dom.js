/**
 * Collect a pieces of html and
 * return it depending on user is existing
 * @param user
 */
function createHeader(user) {
  const header = document.createElement('header');
  header.classList.add('main-page__header', 'header');

  const innerContent = user
    ?
    `
      <div class="header__user">
        <img class="header__user-icon" src="https://img.icons8.com/doodle/48/000000/user.png"/>
        <span class="header__username">${user.name}</span>
      </div>
      <a href="../main/main.html" id="logout-btn" class="button button--sign-in">Log out</a>
    `
    :
    `
      <a href="../login/login.html" class="button button--sign-in">Sign in</a>
    `;

  header.innerHTML = `
    <h1 class="header__title">SW Films</h1>
    <ul class="header__list">
      <li class="header__item">${innerContent}</li>
    </ul>
  `;

  return header;
}

/**
* Gets the html of header and append to the root
* Draws different depending on user is existing or not
* @param app
* @param user
*/
export function drawHeader(app, user) {
  app.append(createHeader(user));
}

/**
 * Creating footer element for the main and primary pages.
 * @return {string}
 */
function createFooter() {
  return `
    <footer class="contacts">
      <a class="contacts__link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
      <span class="contacts__copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
    </footer>
  `;
}

function createToolsBar() {
  return `
  <div class="films__operations">
    <input class="films__search-input" type="search" placeholder="Search film by name...">
    <div class="button-sort">
      <img src="https://img.icons8.com/color-glass/50/000000/sort.png" height="30" width="30" alt="SORT"/>
    </div>
  </div>
  `;
}

function createPagination() {
  return `
    <div class="pagination">
      <span id="button_prev" class="pagination__item pageButton outline-none"><</span>
      <span id="page_number" class="pagination__item pagination__numbers outline-none"></span>
      <span id="button_next" class="pagination__item pageButton outline-none">></span>
    </div>
  `;
}

export function createMainPage(user, films) {
  const mainPage = document.createElement('div');
  mainPage.classList.add('main-page');

  const filmsContent = document.createElement('main');
  filmsContent.classList.add('films');
  const filmsWrapper = document.createElement('div');
  filmsWrapper.classList.add('films__wrapper');

  filmsContent.append(filmsWrapper);

  filmsWrapper.insertAdjacentHTML('afterbegin', createToolsBar());

  const filmsList = createFilmsList(films);
  filmsList.classList.add('films__list');
  filmsWrapper.append(filmsList);

  filmsWrapper.insertAdjacentHTML('beforeend', createPagination());

  mainPage.append(filmsContent);

  mainPage.insertAdjacentHTML('beforeend', createFooter());

  return {mainPage, filmsList};
}

export function createFilmsList(films) {
  const ul = document.createElement('ul');
  ul.classList.add('films__list');

  films.forEach(film => {
    ul.insertAdjacentHTML('beforeend', createFilmItemHtml(film));
  });

  return ul;
}

function createFilmItemHtml(film) {
  return `
    <li class="film__item">
      <div class="film__title">${film.title}</div>
      <div class="film__img">${film.episodeId}</div>
      <p class="film__description">${film.description}</p>
      <button class="button button--more">More details</button>
    </li>
  `;
}