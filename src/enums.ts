/**
 * Urls for all site pages.
 */
export enum PageUrls {
  Main = 'index.html',
  Film = 'film.html',
  Login = 'login.html',
  Add = 'add.html',
  Edit = 'edit.html',
}

/**
 * Keys used in setItem function.
 */
export enum LocalStorageKeys {
  User = 'currentUser',
  Film = 'currentFilm',
  Collection = 'collectionData',
  AllFilms = 'allFilms',
  EditableFilm = 'editableFilm',
}

/**
 * Urls for icons used in project.
 */
export enum IconUrls {
  User = 'https://img.icons8.com/doodle/48/000000/user.png',
  Sorting = 'https://img.icons8.com/color-glass/50/000000/sort.png',
  Google = 'https://img.icons8.com/fluent/48/000000/google-logo.png',
  Authorized = 'https://img.icons8.com/clouds/100/000000/checkmark--v1.png',
  AddFilm = 'https://img.icons8.com/dotty/80/000000/add.png',
  EditFilm = 'https://img.icons8.com/pastel-glyph/64/000000/edit-file.png',
  DeleteBin = 'https://img.icons8.com/ios/50/000000/delete-forever--v1.png',
}

/**
 * Indexes for get collection data.
 */
export enum CollectionIndexes {
  Characters = 0,
  Planets = 1,
  Species = 2,
  Starships = 3,
  Vehicles = 4,
}
