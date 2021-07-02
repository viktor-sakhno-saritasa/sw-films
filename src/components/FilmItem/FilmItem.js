function FilmItem(user, film, detailsHandler) {
  const li = document.createElement('li');
  li.classList.add('film__item');

  li.innerHTML = `
      <div class="film__title">${film.title}</div>
      <div class="film__img">${film.episodeId}</div>
      <p class="film__description">${film.description}</p>
  `;

  if (user) {
    const button = document.createElement('button');
    button.classList.add('button', 'button--more');
    button.innerText = 'More details';

    button.addEventListener('click', () => {
      detailsHandler(film);
    });

    li.append(button);
  }

  return li;
}

export default FilmItem;