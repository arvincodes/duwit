import "./styles.css"

const hamburgerMenu = document.querySelector('.hamburger-menu')
const sidebar = document.querySelector('.sidebar')
const overlay = document.querySelector('.overlay');
const xBtn = document.querySelector('.x-btn')

const addNoteBtn = document.querySelector('.add-note-btn')
const addNoteDialog = document.querySelector('.add-note-dialog')
const addNoteForm = document.getElementById('add-note-form')

const addProjectBtn = document.querySelector('.add-project-btn')
const addMobileProjectBtn = document.querySelector('.sidebar-mobile-projects-heading .add-project-btn')
const addProjectDialog = document.querySelector('.add-project-dialog')
const addProjectForm = document.getElementById('add-project-form')

function toggleSidebar() {
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
}

hamburgerMenu.addEventListener('click', toggleSidebar)
overlay.addEventListener('click', toggleSidebar)
xBtn.addEventListener('click', toggleSidebar)

addNoteBtn.addEventListener('click', () => {
  const rect = addNoteBtn.getBoundingClientRect();

  addNoteDialog.style.left = `${rect.left - 200}px`;
  addNoteDialog.style.top = `${rect.bottom}px`;

  addNoteDialog.show();
});

document.addEventListener('click', (event) => {
  if (!addNoteDialog.contains(event.target) && !addNoteBtn.contains(event.target)) {
    addNoteDialog.close();
  }
  if (!addProjectDialog.contains(event.target) && !addProjectBtn.contains(event.target)) {
    addProjectDialog.close();
  }
});

addProjectBtn.addEventListener('click', () => {
  const rect = addProjectBtn.getBoundingClientRect();

  addProjectDialog.style.left = `${rect.left + 0}px`;
  addProjectDialog.style.top = `${rect.bottom}px`;

  addProjectDialog.show();
});

const ulProjects = document.querySelector('.sidebar .ul-projects');

addMobileProjectBtn.addEventListener('click', () => {
  const existingInput = document.querySelector('.add-project-input');
  if (!existingInput) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'add-project-input'; 
    input.placeholder = 'Enter project name...';
    
    ulProjects.appendChild(input);
    input.focus();

    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        const newListItem = document.createElement('li');
        const newAnchor = document.createElement('a');
        newAnchor.href = "#"; 
        newAnchor.textContent = input.value;

        newListItem.appendChild(newAnchor);
        ulProjects.appendChild(newListItem);
        input.remove();
      }
    });

    input.addEventListener('blur', () => {
      input.remove();
    });
  }
});