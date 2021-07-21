import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { User } from '../models/user';

const LOCAL_STORAGE_USER_KEY = 'currentUser';

/** Manage user's data. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** Current user of application. */
  private _currentUser: User | null = this.getUserFromLocalStorage();

  /** Getter for current user. */
  public get currentUser(): User | null {
    return this._currentUser;
  }

  /**
   * Subscribe on the state changes for update localStorage
   * and currentUser state.
   * @param auth Entity for authorization.
   */
  public constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this._currentUser = this.dtoToUserModelMapper(user);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(this._currentUser));
      } else {
        this._currentUser = null;
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    });
  }

  /**
   * Create new stream from observable of the currently user
   * to map firebase user data to user modal.
   * @returns User stream.
   */
  public getUserStream(): Observable<User | null> {
    const stream$ = this.auth.user
      .pipe(
        map(user => {
          if (user) {
            return this.dtoToUserModelMapper(user);
          }
          return null;
        }),
      );
    return stream$;
  }

  /**
   * Method for user authorization with firebase.
   */
  public login(): Observable<boolean> {
    return from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(
        map(_ => true),
      );
  }

  /** Method for user sign out with firebase auth. */
  public logout(): void {
    this.auth.signOut();
  }

  /**
   * Map data no user modal.
   * @param userDto Plain Firebase User data.
   * @returns User model.
   */
  private dtoToUserModelMapper(userDto: firebase.User): User {
    return { name: userDto.displayName || 'Anonymous' };

  }

  /** Parse User from local storage or null if user is not exists. */
  private getUserFromLocalStorage(): User | null {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null');
  }
}
