import firebase from 'firebase/app';

import 'firebase/firestore';
import { FilmDto } from '../models/film-dto';

import { firestore } from './firebase';


/**
 * After receiving a response take the necessary keys
 * and call Film constructor with an object from those keys.
 * @returns Promise object represents the list of films objects.
 */
export function fetchFilms(): Promise<Object[]> {
  return firestore
    .collection('films')
    .get()
    .then(snapshot => snapshot.docs.map(doc => {
      const {
        title,
        director,
        producer,
        planets,
        characters,
        episode_id: episodeId,
        release_date: releaseDate,
        opening_crawl: description,
      } = doc.data()['fields'];
      return { title, director, producer, episodeId, releaseDate, description, planets, characters };
    }));
}

/**
 * Fetch one film by episode id.
 * @param id Episode id of film.
 * @returns Object with all fields for work.
 */
// async function fetchFilmById(id: number): Promise<Object> {
//   const film = await firestore
//     .collection('films')
//     .where('fields.episode_id', '==', id)
//     .get()
//     .then(snapshot => snapshot.docs.map(doc => doc.data()['fields']));

//   return film[0];
// }

/**
 * Fetch list of related info from film.
 * @param ids Ids from film.
 * @returns List of related data.
 */
export async function fetchRelated(ids: number[], collection: string): Promise<string[]> {

  const planetsPromises: Promise<firebase.firestore.QuerySnapshot>[] = [];

  ids.forEach(id => {
    planetsPromises.push(firestore.collection(collection).where('pk', '==', id)
      .get());
  });

  const planets = await Promise.all(planetsPromises).then(snapshots => snapshots.map(snapshot => snapshot.docs.map(doc => doc.data()['fields'])));

  return planets.map(planet => planet[0].name);
}

export function fetchFilmWithRelated(filmId: number): Promise<FilmDto[]> {
  return firestore
    .collection('films')
    .where('fields.episode_id', '==', filmId)
    .get()
    .then(snapshot => snapshot.docs.map(doc => {
      const {
        title,
        director,
        producer,
        planets,
        characters,
        episode_id: episodeId,
        release_date: releaseDate,
        opening_crawl: description,
      } = doc.data()['fields'];
      return { title, director, producer, episodeId, releaseDate, description, planets, characters } as FilmDto;
    }))
    .then(data => {
      return Promise.all(data.map(async film => {
        film.planetsNames = await fetchRelated(film.planets, 'planets');
        film.charactersNames = await fetchRelated(film.characters, 'people');
        return film;
      }));
    });
}
