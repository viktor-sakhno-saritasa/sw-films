/** DTO for user. */
interface UserDto {
  /** Email of the user. */
  readonly email: string;

  /** Name of the user. */
  readonly name: string;

  /** Picture of the user from the google. */
  readonly picture?: string;
}

export default UserDto;
