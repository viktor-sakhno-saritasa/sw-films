import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

    // children: [
    //   {
    //     path: 'index',
    //     component: HeaderComponent,
    //   },
    // ],
  },
];

/**
 * Module for routing in application.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
