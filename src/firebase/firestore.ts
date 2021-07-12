import firebase from 'firebase/app';

import { FilmDto } from '../models/film-dto';

import { firestore } from './firebase';

/**
 * Add new film in firestore.
 * @param film Film for add.
 * @returns
 */
export function addNewFilm(film: Object): Promise<void> {
  const newFilmRef = firestore.collection('films').doc();
  return newFilmRef.set(film);
}

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
 * Fetch to firebase for get all collections in firestore.
 * @param collections Names of all collections.
 * @returns List of objects with all collections.
 */
export function fetchCollections(collections: string[]): Promise<Object[]> {
  const promises = [];

  for (const collectionName of collections) {
    promises.push(firestore.collection(collectionName).get());
  }

  return Promise.all(promises).then(snapshots => {
    return snapshots.map(snapshot => snapshot.docs.map(doc => doc.data()['fields']));
  });
}

/**
 * Fetch list of related info from film.
 * @param ids Ids from film.
 * @param collection Collection for fetch.
 * @returns List of related data.
 */
export async function fetchRelated(ids: number[], collection: string): Promise<string[]> {

  const planetsPromises: Promise<firebase.firestore.QuerySnapshot>[] = [];

  ids.forEach(id => {
    planetsPromises.push(firestore.collection(collection).where('pk', '==', id)
      .get());
  });

  const planets = await Promise.all(planetsPromises).then(snapshots => {
    return snapshots.map(snapshot => snapshot.docs.map(doc => doc.data()['fields']));
  });

  return planets.map(planet => planet[0].name);
}

/**
 * Fetch list of related info from film and update FilmDto object.
 * @param filmId Id of film for fetch need docs.
 * @returns
 */
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
