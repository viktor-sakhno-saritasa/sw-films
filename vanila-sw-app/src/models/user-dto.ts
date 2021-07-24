/**
 * Interface for work with user object.
 * If user is not authorized, will be object with token: "NO_TOKEN" and without name property.
 */
export interface UserDto {

  /**
   * Token from GoogleAuth.
   */
  token: string;

  /**
   * Name of authorized user.
   */
  name?: string;
}
