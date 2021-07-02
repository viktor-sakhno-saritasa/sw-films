import FilmItem from '../FilmItem/FilmItem.js';

export function FilmsList(user, films, detailsHandler) {
  const ul = document.createElement('ul');
  ul.classList.add('films__list');

  films.forEach(film => {
    ul.append(FilmItem(user, film, detailsHandler));
  });
  
  return ul;
}