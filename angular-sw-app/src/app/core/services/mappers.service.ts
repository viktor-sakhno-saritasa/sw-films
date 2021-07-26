import { Injectable } from '@angular/core';
import { User } from '../models/user';
import firebase from 'firebase/app';
import { FilmDto } from '../models/film-dto';
import { Film } from '../models/film';

/** Service for map dto in domain model and back. */
@Injectable({
  providedIn: 'root'
})
export class MappersService {
  /** @constructor */
  public constructor() { }

  /**
   * Map data no user modal.
   * @param userDto Plain Firebase User data.
   * @returns User model.
   */
  public dtoToUserModelMapper(userDto: firebase.User): User {
    return { name: userDto.displayName || 'Anonymous' };
  }

  /**
   * Transform plain object to domain model.
   * @param dto Plain object from firestore.
   * @returns Film domain.
   */
  public dtoToFilmModelMapper(dto: FilmDto): Film {
    const { fields } = dto;
    return new Film({
      characters: fields.characters,
      director: fields.director,
      planets: fields.planets,
      producer: fields.producer,
      species: fields.species,
      starships: fields.starships,
      title: fields.title,
      vehicles: fields.vehicles,
      episodeId: fields.episode_id,
      description: fields.opening_crawl,
      pk: dto.pk,
      model: dto.model,
      releaseDate: new Date(fields.release_date) as Date,
    });
  }
}
