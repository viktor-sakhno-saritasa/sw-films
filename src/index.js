const searchBar = document.querySelector('.films__search-bar');

console.log(searchBar);

searchBar.addEventListener('click', () => {
  searchBar.classList.add('toggle');
});

// window.addEventListener('mouseup', e =>{
//
//   if (e.target != searchBar && e.target.parentNode != searchBar ) {
//     searchBar.classList.remove('toggleClass');
//   }
// });