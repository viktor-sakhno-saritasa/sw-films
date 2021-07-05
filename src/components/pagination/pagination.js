import {RECORDS_PER_PAGE} from '../../utils/consts.js';

/**
 * Add pagination for the list
 * @param {HTMLUlElement} ul - List of Film instances
 */
export default function addPagination(ul) {
  let li = document.querySelectorAll('.film-item');
  let prevButton = document.querySelector('.pagination-button-prev');
  let nextButton = document.querySelector('.pagination-button-next');
  let pagesList = document.querySelector('.pagination-pages-list');
  let currentPage = 1;
  let recordsPerPage = RECORDS_PER_PAGE;

  /** Counts the number of pages depending on the length of the list */
  const numPages = () => Math.ceil(li.length / recordsPerPage);

  /** Adds listeners to the side buttons of the pagination block */
  const addListeners = () => {
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);
  };
  
  /** Change classes for pages depending current state */
  const selectedPage = () => {
    let pages = document.getElementsByClassName('pagination-page-item');

    for (let i = 0; i < pages.length; i++) {
      if (i === currentPage - 1) {
        pages[i].classList.add('pagination-page-item--current');
      } else {
        pages[i].classList.remove('pagination-page-item--current');
      }
    }
  };

  /** Checks currentPage and changes opacity for the button */
  const checkButtonOpacity = () => {
    currentPage == 1
      ? prevButton.classList.add('opacity')
      : prevButton.classList.remove('opacity');
    currentPage == numPages()
      ? nextButton.classList.add('opacity')
      : nextButton.classList.remove('opacity');
  };

  /**
   * There is a page change, if the user has reached
   * the edge and continues to click, the change will not occur
   * @param {number} page - Page number to switch to
   */
  const changePage = page => {
    if (page < 1) {
      page = 1;
    }

    if (page > numPages() - 1) {
      page = numPages();
    }

    ul.innerHTML = '';

    for (let i = (page - 1) * recordsPerPage;
      i < (page * recordsPerPage) && i < li.length; i++) {
      ul.append(li[i]);
    }

    checkButtonOpacity();
    selectedPage();
  };

  /** Jump to the previous page */
  const prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      changePage(currentPage);
    }
  };

  /** Jump to the next page */
  const nextPage = () => {
    if (currentPage < numPages()) {
      currentPage++;
      changePage(currentPage);
    }
  };

  /** Set listener for click event and changes page depending node target */
  const clickPage = () => {
    document.addEventListener('click', event => {
      if (event.target.nodeName === 'BUTTON'
          && event.target.classList.contains('pagination-page-item')) {
        currentPage = event.target.textContent;
        changePage(currentPage);
      }
    });
  };

  /** Fills the ul node with buttons with pages */
  const createPaginationList = () => {
    pagesList.innerHTML = '';

    for (let i = 1; i < numPages() + 1; i++) {
      pagesList.innerHTML += `
        <li>
          <button class="pagination-page-item">${i}</button>
        </li>`;
    }
  };

  changePage(1);
  createPaginationList();
  selectedPage();
  clickPage();
  addListeners();
}