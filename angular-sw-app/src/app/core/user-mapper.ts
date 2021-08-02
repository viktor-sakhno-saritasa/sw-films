import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

import { User } from './models/user';

/** Service for map dto in domain model and back. */
@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  /**
   * Map data no user modal.
   * @param userDto Plain Firebase User data.
   * @returns User model.
   */
  public dtoToUserModelMapper(userDto: firebase.User): User {
    return { name: userDto.displayName ?? 'Anonymous' };
  }
}
