import { Injectable } from '@angular/core';

import { Film } from './models/film';
import { FilmDto } from './models/film-dto';
import { FilmFormData } from './models/film-form-data';

/** Service for map dto in domain model and back. */
@Injectable({
  providedIn: 'root',
})
export class FilmFormMapper {

  /**
   * Map add form data to film dto.
   * @param formData Data from add form.
   * @param episode Episode of next film.
   * @returns FilmDto for film that need to add.
   */
  public addFormDataToFilmDto(formData: FilmFormData, episode: number): FilmDto {
    const dto: FilmDto = {
      fields: {
        characters: formData.characters,
        created: new Date().toISOString(),
        director: formData.director,
        edited: new Date().toISOString(),
        episode_id: episode,
        opening_crawl: formData.description,
        planets: formData.planets,
        producer: formData.producer,
        release_date: formData.releaseDate,
        species: formData.species,
        starships: formData.starships,
        title: formData.title,
        vehicles: formData.vehicles,
      },
      model: 'resources.film',
      pk: episode,
    };

    return dto;
  }

  /**
   * Map edit form data to film dto.
   * @param formData Data from edit form.
   * @param film Film that need to update.
   * @returns FilmDto for film that need to edit.
   */
  public editFormDataToFilmDto(formData: FilmFormData, film: Film): FilmDto {
    const dto: FilmDto = {
      fields: {
        characters: formData.characters,
        created: film.created?.toISOString() ?? new Date().toISOString(),
        director: formData.director,
        edited: new Date().toISOString(),
        episode_id: film.episodeId,
        opening_crawl: formData.description,
        planets: formData.planets,
        producer: formData.producer,
        release_date: formData.releaseDate,
        species: formData.species,
        starships: formData.starships,
        title: formData.title,
        vehicles: formData.vehicles,
      },
      model: 'resources.film',
      pk: film.episodeId,
    };

    return dto;
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
