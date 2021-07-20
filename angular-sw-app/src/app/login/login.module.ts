import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';


/**
 * Module for the login feature.
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule { }
