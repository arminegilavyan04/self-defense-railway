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