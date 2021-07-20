/**
 * Interface for work with user authorized from Google Firebase.
 */
export interface User {

  /** User's name from Google account. */
  name: string;

  /** User's token from Google Firebase auth. */
  token: string;
}
