import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPipe, canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { FilmsGuardService } from './core/services/films-guard.service';
import { AddFilmComponent } from './add-film/add-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';

/** Custom guard from Auth Guard pipes for logged. Can not active logged user. */
const redirectLoggedInToMain = (): AuthPipe => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', component: ClientComponent},
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToMain),
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuardService, FilmsGuardService],
  },
  {
    path: 'add',
    component: AddFilmComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit/:id',
    component: EditFilmComponent,
    canActivate: [AuthGuardService, FilmsGuardService],
  },
  { path: '**', redirectTo: '' },
];

/** Module for routing in application. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
