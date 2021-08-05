/** User model class. */
export default class User {
  /** Email of the user. */
  public readonly email: string;

  /** Name of the user. */
  public readonly name: string;

  /** Picture of the user from the google. */
  public readonly picture?: string;

  /** @constructor */
  constructor(data: UserArgs) {
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
  }
}

/** Model for user ctor args. */
interface UserArgs {
  /** Email of the user. */
  readonly email: string;

  /** Name of the user. */
  readonly name: string;

  /** Picture of the user from the google. */
  readonly picture?: string;
}
