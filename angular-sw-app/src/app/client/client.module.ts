import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';

/** Module for client part of app.*/
@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ClientModule { }
