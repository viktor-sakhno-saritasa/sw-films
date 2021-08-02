import { RelatedStarhips, RelatedVehicles, RelatedWithName } from './film-dto';

/** Class for work with films. */
export class Film {

  /** Characters in number format. */
  public readonly characters: readonly number[];

  /** Director's name. */
  public readonly director: string;

  /** Episode of the film. */
  public readonly episodeId: number;

  /** Description of the film. */
  public readonly description: string;

  /** Planets in number format. */
  public readonly planets: readonly number[];

  /** Producer's name. */
  public readonly producer: string;

  /** Release date. */
  public readonly releaseDate: Date;

  /** Created date. */
  public readonly created?: Date;

  /** Edited date. */
  public readonly edited?: Date;

  /** Species in number format. */
  public readonly species: readonly number[];

  /** Starships in number format. */
  public readonly starships: readonly number[];

  /** Title of the film. */
  public readonly title: string;

  /** Vehicles in number format. */
  public readonly vehicles: readonly number[];

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
    this.created = film.created;
    this.edited = film.edited;
  }

  /** Method for collect data in get one item. */
  protected getProperties(): FilmArgs {
    return {
      pk: this.pk,
      model: this.model,
      characters: this.characters,
      director: this.director,
      episodeId: this.episodeId,
      description: this.description,
      planets: this.planets,
      producer: this.producer,
      releaseDate: this.releaseDate,
      species: this.species,
      starships: this.starships,
      title: this.title,
      vehicles: this.vehicles,
    };
  }
}

/** Detailed version of film for details page. */
export class DetailedFilm {

  /** Film preview version. Composition. */
  public readonly filmPreview: Film;

  /** List of planets names. */
  public readonly planetsList: RelatedWithName[];

  /** List of characters names. */
  public readonly charactersList: RelatedWithName[];

  /** List of species names. */
  public readonly speciesList: RelatedWithName[];

  /** List of starships primary keys. */
  public readonly starshipsList: RelatedStarhips[];

  /** List of vehicles primary keys. */
  public readonly vehiclesList: RelatedVehicles[];

  public constructor(
    filmPreview: Film,
    planetsList: RelatedWithName[],
    charactersList: RelatedWithName[],
    speciesList: RelatedWithName[],
    starshipsList: RelatedStarhips[],
    vehiclesList: RelatedVehicles[],
  ) {
    this.filmPreview = filmPreview;
    this.planetsList = planetsList;
    this.charactersList = charactersList;
    this.speciesList = speciesList;
    this.starshipsList = starshipsList;
    this.vehiclesList = vehiclesList;
  }
}

/**
 * Interface for film args ctor.
 */
export interface FilmArgs {

  /** Characters in number format. */
  readonly characters: readonly number[];

  /** Director's name. */
  readonly director: string;

  /** Episode of the film. */
  readonly episodeId: number;

  /** Description of the film. */
  readonly description: string;

  /** Planets in number format. */
  readonly planets: readonly number[];

  /** Producer's name. */
  readonly producer: string;

  /** Release date. */
  readonly releaseDate: Date;

  /** Species in number format. */
  readonly species: readonly number[];

  /** Starships in number format. */
  readonly starships: readonly number[];

  /** Title of the film. */
  readonly title: string;

  /** Vehicles in number format. */
  readonly vehicles: readonly number[];

  /** Model of collection. */
  readonly model: string;

  /** Id of the film. */
  readonly pk: number;

  /** Created date. */
  readonly created?: Date;

  /** Edited date. */
  readonly edited?: Date;
}
