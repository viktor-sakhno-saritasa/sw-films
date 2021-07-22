/**
 * Interface for film args ctor.
 */
export interface FilmArgs {

  /** Characters in number format. */
  characters: number[];

  /** Director's name. */
  director: string;

  /** Episode of the film. */
  episodeId: number;

  /** Description of the film. */
  description: string;

  /** Planets in number format. */
  planets: number[];

  /** Producer's name. */
  producer: string;

  /** Release date. */
  releaseDate: Date;

  /** Species in number format. */
  species: number[];

  /** Starships in number format. */
  starships: number[];

  /** Title of the film. */
  title: string;

  /** Vehicles in number format. */
  vehicles: number[];

  /** Model of collection. */
  model: string;

  /** Id of the film. */
  pk: number;

  /** Created date. */
  created?: Date;

  /** Edited date. */
  edited?: Date;
}
