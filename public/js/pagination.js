var paginateBtn = document.querySelector('#paginateBtn');
var paginateContainer = document.querySelector('#paginateContainer');
var pages = document.querySelectorAll('.dfc-page');
var currentPage = 1;

window.addEventListener('load', function() {
  pages.forEach((page, index) => {
    if (index >= currentPage) {
      page.classList.add('is-hidden');
    }
  });
});

paginateBtn.addEventListener('click', function() {
  pages[currentPage].classList.remove('is-hidden');
  currentPage++;
  if (currentPage == pages.length) {
    paginateBtn.remove();
  }
});

