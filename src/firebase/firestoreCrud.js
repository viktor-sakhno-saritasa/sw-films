import { firestore } from './firebase.js';

export async function getFilms() {
  let films;
  films = await firestore.collection('films').get();

  return films.docs.map(doc => doc.data());
}

export function formatFilm(film) {
  return {...film.fields};
}
