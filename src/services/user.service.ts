import { LocalStorageKeys } from '../enums';
import { UserDto } from '../models/user-dto';

/**
 * Manages the user data of the application.
 */
export class UserService {
  private user: UserDto;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this.user = this.getUserFromLocalStorage();
  }

  /**
   * Get current user.
   * @returns
   */
  public getUser(): UserDto {
    return this.user;
  }

  /**
   * Adds object with user data after authorization to Local Storage.
   * @param user Just logged in current user.
   */
  public addUserToLocalStorage(user: UserDto): void {
    localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
    this.commit();
  }

  /**
   * Delete user located in localStorage from there.
   * After that commit changes for update variables.
   */
  public deleteUserFromLocalStorage(): void {
    localStorage.removeItem(LocalStorageKeys.User);
    this.commit();
  }

  /**
   * Get user from localStorage and if user is not located
   * in localStorage create plug with token: "NO_TOKEN".
   * @returns Active user located in localStorage.
   */
  private getUserFromLocalStorage(): UserDto {
    const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User) || 'null');

    if (user) {
      return user;
    }

    return {
      token: 'NO_TOKEN',
    };
  }

  /**
   * Commit all changes and update variables.
   */
  private commit(): void {
    this.user = this.getUserFromLocalStorage();
  }
}
