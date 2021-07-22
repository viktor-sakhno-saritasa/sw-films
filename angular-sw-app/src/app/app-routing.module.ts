import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthPipe, canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { AuthGuardService } from './core/services/auth-guard.service';

/** Custom guard from Auth Guard pipes for logged. */
const redirectLoggedInToMain = (): AuthPipe => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    ...canActivate(redirectLoggedInToMain),
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '' },
];

/**
 * Module for routing in application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
