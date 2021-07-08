/**
 * Interface for work with user object.
 */
export interface User {

  /**
   * Tokem from GoogleAuth.
   */
  token: string;

  /**
   * Name of authorized user.
   */
  name: string;
}

export type userLocalStorageType = User | null;
