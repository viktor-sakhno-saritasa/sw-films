function Footer() {
  const footer = document.createElement('footer');
  footer.classList.add('contacts');

  footer.innerHTML = `
    <a class="contacts__link" href="https://www.interesnee.ru/">INTERESNEE.RU</a>
     <span class="contacts__copy">&copy; Viktor Sakhno. 2021 JS Camp</span>
  `;

  return footer;
}

export default Footer;