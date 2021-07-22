import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Film } from '../core/models/film';
import { FilmsService } from '../core/services/films.service';

/** Component for details page film. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  /** Current film. */
  @Input() public film?: Film;

  public constructor(
    private route: ActivatedRoute,
    private filmService: FilmsService,
    private location: Location,
  ) { }

  /** Init cycle hook. */
  public ngOnInit(): void {
    /** Init cycle hook. */
    this.getFilm();
  }

  /** Subscribe to stream for take film from param id. */
  public getFilm(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilm(id)
      .subscribe(film => {
        this.film = film;
      });
  }

  /** Event handler for go back button. */
  public goBack(): void {
    this.location.back();
  }

}
