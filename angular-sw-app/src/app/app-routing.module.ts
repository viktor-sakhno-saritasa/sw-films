import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPipe, canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';

/** Custom guard from Auth Guard pipes for logged. */
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
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '' },
];

/** Module for routing in application. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
