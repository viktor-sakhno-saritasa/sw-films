export function addUserToLocalStorage(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem('currentUser');
}

export function sortFilms(films, isAscending) {
  const sorted =  films;

  if (isAscending) {
    sorted.sort((a, b) => {
      return a.fields.episode_id - b.fields.episode_id;
    });
  } else {
    sorted.sort((a, b) => {
      return b.fields.episode_id - a.fields.episode_id;
    });
  }

  return sorted;
}