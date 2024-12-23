function toggleDropdown() {

  const dropdown = document.getElementById('dropdown-menu');
  dropdown.classList.toggle('show'); 
  
}
function logout() {

  window.location.href = 'index.html';
  sessionStorage.clear();

}

window.onclick = function(event) {

  const dropdown = document.getElementById('dropdown-menu');
  const personIcon = document.querySelector('.person-icon');

  if (!personIcon.contains(event.target)) {
    dropdown.classList.remove('show'); 

  }

}
const homeLink = document.querySelector('.homelink')
console.log(homeLink);

homeLink.addEventListener('click',()=>{
  console.log(1);
  
  sessionStorage.getItem('userLoggedIn') ? location.href = 'home.html':location.href = 'index.html'

})


