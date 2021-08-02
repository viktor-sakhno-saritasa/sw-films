import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';

/** Module for details page. */
@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
})
export class DetailsModule { }
