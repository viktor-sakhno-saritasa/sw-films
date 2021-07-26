/** Class for work with films. */
export class Film {

  /** Characters in number format. */
  public readonly characters: number[];

  /** Director's name. */
  public readonly director: string;

  /** Episode of the film. */
  public readonly episodeId: number;

  /** Description of the film. */
  public readonly description: string;

  /** Planets in number format. */
  public readonly planets: number[];

  /** Producer's name. */
  public readonly producer: string;

  /** Release date. */
  public readonly releaseDate: Date;

  /** Species in number format. */
  public readonly species: number[];

  /** Starships in number format. */
  public readonly starships: number[];

  /** Title of the film. */
  public readonly title: string;

  /** Vehicles in number format. */
  public readonly vehicles: number[];

  /** Model of collection. */
  public readonly model: string;

  /** Id of the film. */
  public readonly pk: number;

  public constructor(film: FilmArgs) {
    this.pk = film.pk;
    this.model = film.model;
    this.characters = film.characters;
    this.director = film.director;
    this.episodeId = film.episodeId;
    this.description = film.description;
    this.planets = film.planets;
    this.producer = film.producer;
    this.releaseDate = film.releaseDate;
    this.species = film.species;
    this.starships = film.starships;
    this.title = film.title;
    this.vehicles = film.vehicles;
  }
}


/**
 * Interface for film args ctor.
 */
 export interface FilmArgs {

  /** Characters in number format. */
  readonly characters: number[];

  /** Director's name. */
  readonly director: string;

  /** Episode of the film. */
  readonly episodeId: number;

  /** Description of the film. */
  readonly description: string;

  /** Planets in number format. */
  readonly planets: number[];

  /** Producer's name. */
  readonly producer: string;

  /** Release date. */
  readonly releaseDate: Date;

  /** Species in number format. */
  readonly species: number[];

  /** Starships in number format. */
  readonly starships: number[];

  /** Title of the film. */
  readonly title: string;

  /** Vehicles in number format. */
  readonly vehicles: number[];

  /** Model of collection. */
  readonly model: string;

  /** Id of the film. */
  readonly pk: number;

  /** Created date. */
  readonly created?: Date;

  /** Edited date. */
  readonly edited?: Date;
}
