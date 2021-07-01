export default class Pagination {
  constructor(domElements, recordsPerPage) {
    console.log(domElements);
    this.items = domElements.items;
    this.prevButton = domElements.prevButton;
    this.nextButton = domElements.nextButton;
    this.clickPageNumber = domElements.clickPageNumber;
    this.pageNumber = domElements.pageNumber;
    this.list = domElements.list;
    this.currentPage = 1;
    this.recordsPerPage = recordsPerPage;
  }

  numPages() {
    return Math.ceil(this.items.length / this.recordsPerPage);
  }

  init() {
    this.changePage(1);
    this.pageNumbers();
    this.selectedPage();
    this.clickPage();
    this.addListeners();
  }

  addListeners() {
    this.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.nextButton.addEventListener('click', this.nextPage.bind(this));
  }

  selectedPage() {
    let pageNumber = document.getElementsByClassName('clickPageNumber');

    for (let i = 0; i < pageNumber.length; i++) {
      if (i === this.currentPage - 1) {
        pageNumber[i].classList.add('pagination__item--current');
      } else {
        pageNumber[i].classList.remove('pagination__item--current');
      }
    }
  }

  checkButtonOpacity() {
    // eslint-disable-next-line no-unused-expressions
    this.currentPage == 1
      ? this.prevButton.classList.add('opacity')
      : this.prevButton.classList.remove('opacity');
    // eslint-disable-next-line no-unused-expressions
    this.currentPage == this.numPages()
      ? this.nextButton.classList.add('opacity')
      : this.nextButton.classList.remove('opacity');
  }

  changePage(page) {
    console.log('this', this);
    if (page < 1) {
      page = 1;
    }

    if (page > this.numPages() - 1) {
      page = this.numPages();
    }

    // const newList = this.list.cloneNode(false);

    this.list.innerHTML = '';

    for (let i = (page - 1) * this.recordsPerPage;
      i < (page * this.recordsPerPage) && i < this.items.length;
      i++) {
      this.list.append(this.items[i]);
    }

    // this.list.replaceWith(newList);
    // this.list = newList;

    this.checkButtonOpacity();
    this.selectedPage();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  nextPage() {
    console.log(this);
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  clickPage() {
    document.addEventListener('click', event => {
      if (event.target.nodeName === 'SPAN'
          && event.target.classList.contains('clickPageNumber')) {
        this.currentPage = event.target.textContent;
        this.changePage(this.currentPage);
      }
    });
  }

  pageNumbers() {
    this.pageNumber.innerHTML = '';

    for (let i = 1; i < this.numPages() + 1; i++) {
      this.pageNumber.innerHTML += `<span class='clickPageNumber'>${i}</span>`;
    }
  }
}