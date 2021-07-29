/** Interface for form data for add and edit films. */
export interface FilmFormData {

  /** Characters ids list. */
  readonly characters: readonly number[];

  /** Director name. */
  readonly director: string;

  /** Planets ids list. */
  readonly planets: readonly number[];

  /** Producer name. */
  readonly producer: string;

  /** Release date in string format. */
  readonly releaseDate: string;

  /** Species ids list. */
  readonly species: readonly number[];

  /** Starships ids list. */
  readonly starships: readonly number[];

  /** Title of the film. */
  readonly title: string;

  /** Vehicles ids list. */
  readonly vehicles: readonly number[];

  /** Description of the film. */
  readonly description: string;
}
