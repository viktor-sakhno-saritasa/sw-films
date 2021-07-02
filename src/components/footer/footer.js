/**
 * Creates Footer Component
 * @return {HTMLElement}
 */
function createFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  footer.innerHTML = `
    <a class="footer-link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
    <span class="footer-copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
  `;

  return footer;
}

export default createFooter;