/**
 * Describes film entity
 */
export class Film {
  constructor(film) {
    this.title = film.title;
    this.episodeId = film.episodeId;
    this.releaseDate = film.releaseDate;
    this.description = film.description;
    this.director = film.director;
    this.producer = film.producer;
  }
}