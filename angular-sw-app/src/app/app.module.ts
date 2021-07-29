import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { ClientModule } from './client/client.module';
import { DetailsModule } from './details/details.module';
import { AddFilmModule } from './add-film/add-film.module';

/** Root module for an application. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CoreModule,
    SharedModule,
    LoginModule,
    BrowserAnimationsModule,
    ClientModule,
    DetailsModule,
    AddFilmModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
