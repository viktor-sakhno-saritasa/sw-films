/**
 * Creates FilmItem Component
 * And set event handler on more details button
 * @param {object} user - The object saved in LocalStorage containing two keys: token and name
 * @param {object} film - Film object
 * @param {function} detailsHandler - Event handler for "More Details" button
 * @return {HTMLLIElement} List Item with Film information
 */
function FilmItem(user, film, detailsHandler) {
  const li = document.createElement('li');
  li.classList.add('film-item');

  li.innerHTML = `
      <div class="film-title">${film.title}</div>
      <div class="film-img">${film.episodeId}</div>
      <p class="film-description">${film.description}</p>
  `;

  if (user) {
    const button = document.createElement('button');
    button.classList.add('button', 'button-details');
    button.innerText = 'More details';

    button.addEventListener('click', () => {
      detailsHandler(film);
    });

    li.append(button);
  }

  return li;
}

export default FilmItem;