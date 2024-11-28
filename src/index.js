import "./styles.css"

const hamburgerMenu = document.querySelector('.hamburger-menu')
const sidebar = document.querySelector('.sidebar')
const overlay = document.querySelector('.overlay');
const xBtn = document.querySelector('.x-btn')

const addNoteBtn = document.querySelector('.add-note-btn')
const addNoteDialog = document.querySelector('.add-note-dialog')
const addNoteForm = document.getElementById('add-note-form')

function toggleSidebar() {
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
}

hamburgerMenu.addEventListener('click', toggleSidebar)
overlay.addEventListener('click', toggleSidebar)
xBtn.addEventListener('click', toggleSidebar)

addNoteBtn.addEventListener('click', () => {
  const rect = addNoteBtn.getBoundingClientRect();

  addNoteDialog.style.left = `${rect.left - 230}px`;
  addNoteDialog.style.top = `${rect.bottom}px`;

  addNoteDialog.show();
});

document.addEventListener('click', (event) => {
  if (!addNoteDialog.contains(event.target) && !addNoteBtn.contains(event.target)) {
    addNoteDialog.close();
  }
});


