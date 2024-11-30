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

const ulProjectsDesktop = document.querySelector('.sidebar-desktop .ul-projects');
const ulProjectsMobile = document.querySelector('.sidebar .ul-projects');

const addNoteToNotesBtn = document.querySelector('#add-note-form .add-btn')
const removeNoteBtn = document.querySelector('.note-remove')
const addProjectToProjectListBtn = document.querySelector('#add-project-form .btns-container .add-btn')

function toggleSidebar() {
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
}

function displayAddNoteDialog() {
  const rect = addNoteBtn.getBoundingClientRect();

  addNoteDialog.style.left = `${rect.left - 200}px`;
  addNoteDialog.style.top = `${rect.bottom}px`;

  addNoteDialog.show();
}

function displayAddProjectDialog() {
  const rect = addProjectBtn.getBoundingClientRect();

  addProjectDialog.style.left = `${rect.left + 0}px`;
  addProjectDialog.style.top = `${rect.bottom}px`;

  addProjectDialog.show();
}

function exitDialog() {
  if (!addNoteDialog.contains(event.target) && !addNoteBtn.contains(event.target)) {
    addNoteDialog.close();
  }
  if (!addProjectDialog.contains(event.target) && !addProjectBtn.contains(event.target)) {
    addProjectDialog.close();
  }
}

function appendProjectInputMobile() {
  const existingInput = document.querySelector('.add-project-input');
  if (!existingInput) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'add-project-input'; 
    input.placeholder = 'Enter project name...';
    
    ulProjectsMobile.appendChild(input);
    input.focus();

    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        const newListItem = document.createElement('li');
        const newAnchor = document.createElement('a');
        newAnchor.href = "#"; 
        newAnchor.textContent = input.value;

        newListItem.appendChild(newAnchor);
        ulProjectsMobile.appendChild(newListItem);
        input.remove();
      }
    });

    input.addEventListener('blur', () => {
      input.remove();
    });
  }
}

function updateProjectClassificationOptions() {
  const projectDropdown = document.getElementById('project-classification');
  projectDropdown.innerHTML = ''

  ulProjectsDesktop.querySelectorAll('li').forEach((anchor) => {
    const option = document.createElement('option');
    option.value = anchor.textContent; 
    option.textContent = anchor.textContent;

    projectDropdown.appendChild(option);
})}

function getNoteDetails() {
  const noteTitle = document.getElementById('title');
  const noteDescription = document.getElementById('description');
  const noteProjectClassification = document.getElementById('project-classification');
  const noteDueDate = document.getElementById('due-date');
  const notePriority = document.getElementById('priority');

  const newNote = document.createElement('div')
  newNote.classList.add('note')
  newNote.innerHTML = `
    <div class="note-header-container">
      <h3 class="note-heading">${noteTitle.value}</h3>
      <svg class="note-remove" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>         
    </div>
    <div class="note-statuses">
      <span class="note-project-classification">${noteProjectClassification.value}</span>
      <span class="note-priority-level">${notePriority.value}</span>
      <span class="note-due-date">${noteDueDate.value}</span>
    </div>
    <p class="note-description">${noteDescription.value}</p>
  `

  const removeButton = newNote.querySelector('.note-remove')
  removeButton.addEventListener('click', () => {
    newNote.remove()
  })

  const notesContainer = document.querySelector('.notes-container')
  if (notesContainer) {
    notesContainer.appendChild(newNote);
  } else {
    console.error('Notes container not found.');
  }
}

function getNewProject() {
  const projectName = document.getElementById('project-name')

  const newProject = document.createElement('li')
  newProject.classList.add(`${newProject.value}`)
  newProject.innerHTML = projectName.value

  const projectList = document.querySelector('.ul-projects')
  projectList.appendChild(newProject)
}

function seeNotesByPriority() {
  const notesContainer = document.querySelector(".notes-container");
  const notes = Array.from(notesContainer.querySelectorAll(".note"));

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  notes.sort((a, b) => {
    const priorityA = a.querySelector(".note-priority-level").textContent.trim();
    const priorityB = b.querySelector(".note-priority-level").textContent.trim();
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  notes.forEach(note => notesContainer.appendChild(note));
}

hamburgerMenu.addEventListener('click', toggleSidebar)
overlay.addEventListener('click', toggleSidebar)
xBtn.addEventListener('click', toggleSidebar)

addNoteBtn.addEventListener('click', displayAddNoteDialog);
addNoteToNotesBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getNoteDetails();
});

document.addEventListener('click', (event) => {
  exitDialog();
});

addProjectBtn.addEventListener('click', displayAddProjectDialog);
addMobileProjectBtn.addEventListener('click', appendProjectInputMobile);

addProjectToProjectListBtn.addEventListener('click', (event) => {
  event.preventDefault()
  getNewProject()
})

updateProjectClassificationOptions()

document.getElementById("priority-side").addEventListener("click", () => {
  seeNotesByPriority()
});

document.getElementById("priority-side-mobile").addEventListener("click", () => {
  seeNotesByPriority()
});
