export function addUserToLocalStorage(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem('currentUser');
}

