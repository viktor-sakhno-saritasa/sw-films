import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ClientComponent } from './client.component';

/** Module for client part of app.*/
@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ClientModule { }
