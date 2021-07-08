/**
 * Interface for with film object.
 */
export interface FilmDto {

  /**
   * Title of film.
   */
  title: string;

  /**
   * Director of film.
   */
  director: string;

  /**
   * Producer of film.
   */
  producer: string;

  /**
   * Number of episode.
   */
  episodeId: number;

  /**
   * Date with "YYYY-MM-DD" format.
   */
  releaseDate: string;

  /**
   * Announce to the film.
   */
  description: string;
}
