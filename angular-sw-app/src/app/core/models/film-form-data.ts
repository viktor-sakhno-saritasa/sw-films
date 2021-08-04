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

/** Helper entity for films entities. */
export interface RelatedData {

  /** Fields of entity. */
  readonly fields: {

    /** Starship class of entity. */
    readonly starship_class?: string;

    /** MGLT field of starship entity. */
    readonly MGLT?: string;

    /** Rating of starship entity. */
    readonly hyperdrive_rating?: string;

    /** Vehicle class of entity. */
    readonly vehicle_class?: string;

    /** Name of entity. */
    readonly name?: string;
  };

  /** Primary key of entity. */
  readonly pk: number;
}
