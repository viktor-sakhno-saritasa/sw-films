import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../models/user';

const LOCAL_STORAGE_USER_KEY = 'currentUser';

/**
 * Manage user's data.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** Current user of application. */
  private _currentUser?: User;

  /** Getter for current user. */
  public get currentUser(): User | undefined {
    return this._currentUser;
  }

  public constructor() {
    /** Parse from LocalStorage. */
    const candidate = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (candidate) {
      this._currentUser = JSON.parse(candidate);
    }
  }

  /**
   * Method for user authorization.
   */
  public login(): void {
    console.log('login');
  }

  /**
   * For convenience, make the return type observable,
   * although the user exists in LocalStorage.
   * @returns User stream.
   */
  public getUser(): Observable<User> {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return of(user);
  }
}
