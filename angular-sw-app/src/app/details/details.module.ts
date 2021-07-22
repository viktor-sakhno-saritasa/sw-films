import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';


import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

/** Module for details page. */
@NgModule({
  declarations: [DetailsComponent],
  imports: [
    DetailsRoutingModule,
    CommonModule,
    SharedModule,
  ],
})
export class DetailsModule { }
