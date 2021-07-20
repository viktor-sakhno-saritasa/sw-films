import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component';


/**
 * Module for client part of app.
 */
@NgModule({
  declarations: [ClientComponent, HeaderComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule { }
