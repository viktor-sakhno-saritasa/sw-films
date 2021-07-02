import {RECORDS_PER_PAGE} from '../../utils/consts.js';

function Pagination(ul) {
  let items = document.querySelectorAll('.film__item');
  let prevButton = document.querySelector('#button_prev');
  let nextButton = document.querySelector('#button_next');
  let clickPageNumber = document.getElementsByClassName('clickPageNumber');
  let pageNumber = document.getElementById('page_number');
  let currentPage = 1;
  let recordsPerPage = RECORDS_PER_PAGE;

  // const numPages = () => Math.ceil(items.length / recordsPerPage);
  // const addListeners = () => {
  //   prevButton.addEventListener('click', prevPage);
  //   nextButton.addEventListener('click', nextPage);
  // }

  function selectedPage() {
    let pageNumber = document.getElementsByClassName('clickPageNumber');

    for (let i = 0; i < pageNumber.length; i++) {
      if (i === currentPage - 1) {
        pageNumber[i].classList.add('pagination__item--current');
      } else {
        pageNumber[i].classList.remove('pagination__item--current');
      }
    }
  }

  function checkButtonOpacity() {
    // eslint-disable-next-line no-unused-expressions
    currentPage == 1
        ? prevButton.classList.add('opacity')
        : prevButton.classList.remove('opacity');
    // eslint-disable-next-line no-unused-expressions
    currentPage == numPages()
        ? nextButton.classList.add('opacity')
        : nextButton.classList.remove('opacity');
  }

  function changePage(page) {
    if (page < 1) {
      page = 1;
    }

    if (page > numPages() - 1) {
      page = numPages();
    }

    // const newList = list.cloneNode(false);

    console.log('ul', ul);

    ul.innerHTML = '';

    for (let i = (page - 1) * recordsPerPage;
         i < (page * recordsPerPage) && i < items.length;
         i++) {
      ul.append(items[i]);
    }

    // list.replaceWith(newList);
    // list = newList;

    checkButtonOpacity();
    selectedPage();
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      changePage(currentPage);
    }
  }

  function nextPage() {
    if (currentPage < numPages()) {
      currentPage++;
      changePage(currentPage);
    }
  }

  function clickPage() {
    document.addEventListener('click', event => {
      if (event.target.nodeName === 'SPAN'
          && event.target.classList.contains('clickPageNumber')) {
        currentPage = event.target.textContent;
        changePage(currentPage);
      }
    });
  }

  function pageNumbers() {
    pageNumber.innerHTML = '';

    for (let i = 1; i < numPages() + 1; i++) {
      pageNumber.innerHTML += `<span class='clickPageNumber'>${i}</span>`;
    }
  }

  function numPages() {
    return Math.ceil(items.length / recordsPerPage);
  }

  function init() {
    changePage(1);
    pageNumbers();
    selectedPage();
    clickPage();
    addListeners();
  }

  function addListeners() {
    prevButton.addEventListener('click', prevPage.bind(this));
    nextButton.addEventListener('click', nextPage.bind(this));
  }

  function pageNumbers() {
    pageNumber.innerHTML = '';

    for (let i = 1; i < numPages() + 1; i++) {
      pageNumber.innerHTML += `<span class='clickPageNumber'>${i}</span>`;
    }
  }

  init();
}

export default Pagination;