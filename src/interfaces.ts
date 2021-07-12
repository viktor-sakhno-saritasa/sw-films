/**
 * Interface for collection data.
 */
export interface collectionType {
  [key: string]: string | undefined;

  /** In a lot of case property name needed for create template. */
  name?: string;

  /** Property for the vehicle. */
  vehicle_class?: string;

  /** Property for the starship. */
  starship_class?: string;
}

/**
 * Interface for all handlers in the app.
 */
export interface HandlersType {
  [key: string]: Function | undefined;

  /** Event handler for header and logout button. */
  logoutHandler?: Function;

  /** Event handler for login authorization. */
  signInHandler?: Function;

  /** Event handler for "More details" button. */
  detailsHandler?: Function;
}
