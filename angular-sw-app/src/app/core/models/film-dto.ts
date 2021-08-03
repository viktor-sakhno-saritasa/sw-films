/** Plain object from Firestore. */
export interface FilmDto {

  /** Object with info fields. */
  readonly fields: {

    /** Characters in number format. */
    readonly characters: readonly number[];

    /** Created date. */
    readonly created: string;

    /** Director's name. */
    readonly director: string;

    /** Edited date. */
    readonly edited: string;

    /** Episode of the film. */
    readonly episode_id: number;

    /** Description of the film. */
    readonly opening_crawl: string;

    /** Planets in number format. */
    readonly planets: readonly number[];

    /** Producer's name. */
    readonly producer: string;

    /** Release date. */
    readonly release_date: string;

    /** Species in number format. */
    readonly species: readonly number[];

    /** Starships in number format. */
    readonly starships: readonly number[];

    /** Title of the film. */
    readonly title: string;

    /** Vehicles in number format. */
    readonly vehicles: readonly number[];
  };

  /** Model of collection. */
  readonly model: string;

  /** Id of the film. */
  readonly pk: number;
}
