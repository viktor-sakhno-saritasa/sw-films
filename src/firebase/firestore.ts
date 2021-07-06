import { Film } from '../film-type';
import { COLLECTION_PATH } from '../utils/consts';
import { firestore } from './firebase';

/**
 * After receiving a response take the necessary keys
 * and call Film constructor with an object from those keys
 * @return Promise object represents the list of films objects
 */
export function fetchFilms(): Promise<Film[]> {
  return firestore
    .collection(COLLECTION_PATH)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const {
          title,
          director,
          producer,
          episode_id: episodeId,
          release_date: releaseDate,
          opening_crawl: description,
        } = doc.data().fields;
        return { title, director, producer, episodeId, releaseDate, description };
      });
    });
}
