import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { MappersService } from './mappers.service';


/** Manage user's data. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** @constructor */
  public constructor(private readonly auth: AngularFireAuth, private readonly mapper: MappersService) {}

  /**
   * Create user observable.
   * @returns User observable or null.
   */
  public getUser(): Observable<User | null> {
    return this.auth.user
      .pipe(
        map(user => user ? this.mapper.dtoToUserModelMapper(user) : null),
      );
  }

  /** Method for user authorization with firebase. */
  public login(): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  /** Method for user sign out with firebase auth. */
  public logout(): void {
    this.auth.signOut();
  }
}
