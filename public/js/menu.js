var collapseMenu = document.querySelector('.menu');
var collapseBtn = document.querySelector('#collapse-btn');
var collapseBtnText = document.querySelector('#collapse-btn-text');
var collapsed = true;

function hideMenu() {
  collapseMenu.classList.add('is-hidden-mobile');
  collapseBtnText.textContent = '[ + ] Expand menu options';
}

function showMenu() {
  collapseMenu.classList.remove('is-hidden-mobile');
  collapseBtnText.textContent = '[ - ] Collapse menu options';
}

collapseBtn.addEventListener('click', function() {
  collapsed ? showMenu() : hideMenu();
  collapsed = !collapsed;
});
