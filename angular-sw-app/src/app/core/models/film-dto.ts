/** Plain object from Firestore. */
export interface FilmDto {

  /** Object with info fields. */
  fields: {

    /** Characters in number format. */
    characters: number[];

    /** Created date. */
    created: string;

    /** Director's name. */
    director: string;

    /** Edited date. */
    edited: string;

    /** Episode of the film. */
    episode_id: number;

    /** Description of the film. */
    opening_crawl: string;

    /** Planets in number format. */
    planets: number[];

    /** Producer's name. */
    producer: string;

    /** Release date. */
    release_date: string;

    /** Species in number format. */
    species: number[];

    /** Starships in number format. */
    starships: number[];

    /** Title of the film. */
    title: string;

    /** Vehicles in number format. */
    vehicles: number[];
  };

  /** Model of collection. */
  model: string;

  /** Id of the film. */
  pk: number;
}
