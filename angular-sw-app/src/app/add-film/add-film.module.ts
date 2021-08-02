import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AddFilmComponent } from './add-film.component';

/** Module for add form page. */
@NgModule({
  declarations: [AddFilmComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class AddFilmModule { }
