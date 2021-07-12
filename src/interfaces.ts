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

  /** Event handler for "Add" button on main page. */
  addFilmHandler?: Function;

  /** Event handler for submit form on add page. */
  submitHandler?: Function;

  /** Event handler for edit button on the card item. */
  editHandler?: Function;

  /** Event handler for delete button on the card item. */
  deleteHandler?: Function;
}
