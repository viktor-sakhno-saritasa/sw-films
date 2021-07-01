/**
 * Collect a pieces of html and
 * return it depending on user is existing
 * @param user
 * @return {string}
 */
function createLoginPage(user) {
  const innerContent = user
    ?
    `
    <a href="../main/main.html" id="back-link" class="button button--auth button--link">
      <img src="https://img.icons8.com/clouds/100/000000/checkmark--v1.png" width="50" height="50" alt="authorized">
      <span class="button__text">Hi, ${user.name}. Go back!</span>
    </a>
    `
    :
    `
    <button id="google-auth" class="button button--auth">
      <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" width="50" height="50" alt="Google">
      <span class="button__text">Sign in</span>
    </button> 
    `
  ;

  return `
    <main class="films films--login">
        <div class="films__wrapper">${innerContent}</div>
    </main>
  `;
}

/**
 * Gets the html of login page and adds to the end of the root
 * Draws different depending on user is existing or not
 * @param root
 * @param user
 */
export function drawLoginPage(root, user) {
  const loginPageHTML = createLoginPage(user);
  root.insertAdjacentHTML('beforeend', loginPageHTML);
}