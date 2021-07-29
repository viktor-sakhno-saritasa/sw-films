import { Injectable } from '@angular/core';
import { Film } from './models/film';
import { FilmDto } from './models/film-dto';
import { FilmFormData } from './models/film-form-data';

/** Service for map dto in domain model and back. */
@Injectable({
  providedIn: 'root'
})
export class FormMapper {

  public addFormDataToFilmDto(formData: FilmFormData, episode: number) {
    const dto: FilmDto = {
      fields: {
        characters: formData.characters,
        created: Date.now().toLocaleString(),
        director: formData.director,
        edited: Date.now().toLocaleString(),
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
    }

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
