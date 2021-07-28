import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details.component';

/** Module for details page. */
@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class DetailsModule { }
