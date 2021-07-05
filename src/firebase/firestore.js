import {COLLECTION_PATH} from '../utils/consts.js';
import {Film} from '../models/Film.js';
import {firestore} from './firebase.js';

/**
 * After receiving a response take the necessary keys
 * and call Film constructor with an object from those keys
 * @return {Promise} Promise object represents the list of films
 */
export function getFilms() {
  return firestore.collection(COLLECTION_PATH).get()
    .then(films => {
      return films.docs.map(doc => {
        const {
          title,
          director,
          producer,
          episode_id: episodeId,
          release_date: releaseDate,
          opening_crawl: description} = doc.data().fields;
        return new Film({ title, director, producer, episodeId, releaseDate, description});
      });
    });
}