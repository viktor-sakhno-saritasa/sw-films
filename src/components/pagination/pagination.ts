import { RECORDS_PER_PAGE } from '../../utils/consts';

/**
 * Add pagination for the list.
 * @param listItems - List of Films.
 */
export default function addPagination(listItems: HTMLUListElement): void {
  const li = document.querySelectorAll('.film-item');
  const prevButton = document.querySelector('.pagination-button-prev') as HTMLButtonElement;
  const nextButton = document.querySelector('.pagination-button-next') as HTMLButtonElement;
  const pagesList = document.querySelector('.pagination-pages-list');
  let currentPage = 1;

  /** Counts the number of pages depending on the length of the list. */
  const numPages = () => Math.ceil(li.length / RECORDS_PER_PAGE);

  /** Adds listeners to the side buttons of the pagination block. */
  const addListeners = () => {
    prevButton!.addEventListener('click', prevPage);
    nextButton!.addEventListener('click', nextPage);
  };

  /** Change classes for pages depending current state. */
  const selectedPage = () => {
    let pages = document.querySelectorAll('.pagination-item');

    for (let i = 0; i < pages.length; i++) {
      if (i === currentPage - 1) {
        pages[i]!.classList.add('pagination-item--current');
      } else {
        pages[i]!.classList.remove('pagination-item--current');
      }
    }
  };

  /** Set side buttons state and apply styles depending it. */
  const setSideButtonsState = () => {
    prevButton!.disabled = currentPage == 1;
    nextButton!.disabled = currentPage == numPages();
  };

  /**
   * There is a page change, if the user has reached.
   * the edge and continues to click, the change will not occur.
   * @param page - Page number to switch to.
   */
  const setPage = (page: number): void => {
    listItems.innerHTML = '';

    for (let i = (page - 1) * RECORDS_PER_PAGE; i < page * RECORDS_PER_PAGE && i < li.length; i++) {
      listItems.append(li[i]!);
    }

    setSideButtonsState();
    selectedPage();
  };

  /** Jump to the previous page. */
  const prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      setPage(currentPage);
    }
  };

  /** Jump to the next page. */
  const nextPage = () => {
    if (currentPage < numPages()) {
      currentPage++;
      setPage(currentPage);
    }
  };

  /** Set listener for click event and changes page depending node target. */
  const clickPage = () => {
    pagesList!.addEventListener('click', (event: Event): void => {
      const target = event.target as Element;
      if (target.nodeName === 'BUTTON' && target.classList.contains('pagination-item')) {
        currentPage = Number(target.textContent);
        setPage(currentPage);
      }
    });
  };

  /** Fills the ul node with buttons with pages. */
  const createPaginationList = () => {
    pagesList!.innerHTML = '';

    for (let pageNumber = 1; pageNumber < numPages() + 1; pageNumber++) {
      pagesList!.innerHTML += `
        <li>
          <button class="pagination-item">${pageNumber}</button>
        </li>`;
    }
  };

  setPage(1);
  createPaginationList();
  selectedPage();
  clickPage();
  addListeners();
}
