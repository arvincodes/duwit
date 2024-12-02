import "./styles.css"

const hamburgerMenu = document.querySelector('.hamburger-menu')
const sidebar = document.querySelector('.sidebar')
const overlay = document.querySelector('.overlay');
const xBtn = document.querySelector('.x-btn')

const addNoteBtn = document.querySelector('.add-note-btn')
const addNoteDialog = document.querySelector('.add-note-dialog')

const addProjectBtn = document.querySelector('.add-project-btn')
const addMobileProjectBtn = document.querySelector('.sidebar-mobile-projects-heading .add-project-btn')
const addProjectDialog = document.querySelector('.add-project-dialog')

const ulProjectsDesktop = document.querySelector('.sidebar-desktop .ul-projects');
const ulProjectsMobile = document.querySelector('.sidebar .ul-projects');

const addNoteToNotesBtn = document.querySelector('#add-note-form .add-btn')
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
        newListItem.textContent = input.value;
        ulProjectsMobile.appendChild(newListItem);

        const desktopListItem = newListItem.cloneNode(true);
        ulProjectsDesktop.appendChild(desktopListItem);
        input.remove();

        updateProjectClassificationOptionsMobile()
        saveProjectsToLocalStorage()
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

function updateProjectClassificationOptionsMobile() {
  const projectDropdown = document.getElementById('project-classification');
  projectDropdown.innerHTML = ''

  ulProjectsMobile.querySelectorAll('li').forEach((anchor) => {
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
      <span class="note-due-date">${noteDueDate.value}</span>
      <span class="note-priority-level">${notePriority.value}</span>
    </div>
    <p class="note-description">${noteDescription.value}</p>
  `

  const priorityColors = {
    High: "#e79fa2",
    Medium: "#fcb268",
    Low: "#ffd95f",
  };
  const prioritySpan = newNote.querySelector(".note-priority-level");
  const priorityColor = priorityColors[notePriority.value] || "#FFFFFF";
  prioritySpan.style.backgroundColor = priorityColor;

  const notesContainer = document.querySelector('.notes-container')
  if (notesContainer) {
    notesContainer.appendChild(newNote);
    saveNotesToLocalStorage()
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
  saveProjectsToLocalStorage()
}

function getNewProjectMobile() {
  const projectName = document.getElementById('project-name')

  const newProject = document.createElement('li')
  newProject.classList.add(`${newProject.value}`)
  newProject.innerHTML = projectName.value

  const projectList = document.querySelector('.sidebar .ul-projects')
  projectList.appendChild(newProject)
  saveProjectsToLocalStorage()
}

function resetNoteVisibility() {
  const notes = document.querySelectorAll(".note");
  notes.forEach(note => {
    note.classList.remove("hidden")
  });
}

function seeNotesByPriority() {
  resetNoteVisibility();

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

function seeNotesByDueDate() {
  resetNoteVisibility();

  const notesContainer = document.querySelector(".notes-container");
  const notes = Array.from(notesContainer.querySelectorAll(".note"));

  notes.sort((a, b) => {
    const dueDateA = new Date(a.querySelector(".note-due-date").textContent.trim());
    const dueDateB = new Date(b.querySelector(".note-due-date").textContent.trim());
    return dueDateA - dueDateB;
  });

  notes.forEach(note => notesContainer.appendChild(note));
}

// function addPreloadedNotes() {
//   const notesContainer = document.querySelector(".notes-container");
//   const preloadedNotes = [
//     {
//       title: "Add Sidebar",
//       description: "Design and implement a functional sidebar that provides quick access to important features like project navigation, note creation, and settings.",
//       priority: "High",
//       dueDate: "2024-11-26",
//       projectClassification: "Restaurant Website"
//     },
//     {
//       title: "Remove Note Feature",
//       description: "Develop a user-friendly way to delete notes. Consider adding a confirmation dialog to prevent accidental removal.",
//       priority: "Medium",
//       dueDate: "2024-11-28",
//       projectClassification: "To-do Website"
//     },
//     {
//       title: "Mobile-Friendly Layout",
//       description: "Optimize the layout for smaller screens, ensuring easy navigation and readability. Prioritize essential features and adjust the design to fit different mobile devices.",
//       priority: "High",
//       dueDate: "2024-12-15",
//       projectClassification: "Restaurant Website"
//     },
//     {
//       title: "User Authentication",
//       description: "Develop robust user authentication and authorization mechanisms. Include features like secure password hashing and role-based access control.",
//       priority: "High",
//       dueDate: "2024-12-20",
//       projectClassification: "To-do Website"
//     },
//     {
//       title: "Optimize DB Queries",
//       description: "Identify and optimize slow-running database queries. Consider techniques like indexing, query optimization, and caching to reduce server load.",
//       priority: "Medium",
//       dueDate: "2024-12-10",
//       projectClassification: "To-do Website"
//     },
//     {
//       title: "Homepage Content",
//       description: "Write compelling copy and visually appealing content for the homepage. Highlight key features, benefits, and unique selling points to attract and engage visitors.",
//       priority: "Low",
//       dueDate: "2024-12-05",
//       projectClassification: "Restaurant Website"
//     },
//     {
//       title: "Browser Compatibility",
//       description: "Thoroughly test the website's functionality and appearance across different browsers and devices. Identify and fix any compatibility issues.",
//       priority: "Medium",
//       dueDate: "2024-12-12",
//       projectClassification: "Restaurant Website"
//     },
//     {
//       title: "Add Dark Mode",
//       description: "Develop a dark theme option that reduces eye strain and improves readability in low-light conditions. Consider user preferences.",
//       priority: "Low",
//       dueDate: "2024-12-18",
//       projectClassification: "To-do Website"
//     },
//     {
//       title: "Push Notifications",
//       description: "Implement a reliable push notification system to deliver timely alerts and reminders to users. Consider factors like device compatibility and user preferences.",
//       priority: "High",
//       dueDate: "2024-12-22",
//       projectClassification: "To-do Website"
//     },
//     {
//       title: "Image Loading Speed",
//       description: "Optimize images for web delivery by compressing them without compromising quality. Implement lazy loading and responsive images to improve page load times.",
//       priority: "Medium",
//       dueDate: "2024-12-08",
//       projectClassification: "Restaurant Website"
//     }
//   ];

//   preloadedNotes.forEach(note => {
//     const noteElement = document.createElement("div");
//     noteElement.classList.add("note");

//     const priorityColors = {
//       High: "#e79fa2",
//       Medium: "#fcb268",
//       Low: "#ffd95f",
//     };
//     const priorityColor = priorityColors[note.priority] || "#FFFFFF";

//     noteElement.innerHTML = `
//     <div class="note-header-container">
//       <h3 class="note-heading">${note.title}</h3>
//       <svg class="note-remove" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//       </svg>         
//     </div>
//     <div class="note-statuses">
//       <span class="note-project-classification">${note.projectClassification}</span>
//       <span class="note-due-date">${note.dueDate}</span>
//       <span class="note-priority-level">${note.priority}</span>
//     </div>
//     <p class="note-description">${note.description}</p>
//   `
//     const prioritySpan = noteElement.querySelector(".note-priority-level");
//     prioritySpan.style.backgroundColor = priorityColor;

//     notesContainer.appendChild(noteElement);
//   });

// }

function addPreloadedNotes() {
  const notesContainer = document.querySelector(".notes-container");
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const preloadedNotes = [
    {
      title: "Add Sidebar",
      description: "Design and implement a functional sidebar that provides quick access to important features like project navigation, note creation, and settings.",
      priority: "High",
      dueDate: "2024-11-26",
      projectClassification: "Restaurant Website"
    },
    {
      title: "Remove Note Feature",
      description: "Develop a user-friendly way to delete notes. Consider adding a confirmation dialog to prevent accidental removal.",
      priority: "Medium",
      dueDate: "2024-11-28",
      projectClassification: "To-do Website"
    },
    {
      title: "Mobile-Friendly Layout",
      description: "Optimize the layout for smaller screens, ensuring easy navigation and readability. Prioritize essential features and adjust the design to fit different mobile devices.",
      priority: "High",
      dueDate: "2024-12-15",
      projectClassification: "Restaurant Website"
    },
    {
      title: "User Authentication",
      description: "Develop robust user authentication and authorization mechanisms. Include features like secure password hashing and role-based access control.",
      priority: "High",
      dueDate: "2024-12-20",
      projectClassification: "To-do Website"
    },
    {
      title: "Optimize DB Queries",
      description: "Identify and optimize slow-running database queries. Consider techniques like indexing, query optimization, and caching to reduce server load.",
      priority: "Medium",
      dueDate: "2024-12-10",
      projectClassification: "To-do Website"
    },
    {
      title: "Homepage Content",
      description: "Write compelling copy and visually appealing content for the homepage. Highlight key features, benefits, and unique selling points to attract and engage visitors.",
      priority: "Low",
      dueDate: "2024-12-05",
      projectClassification: "Restaurant Website"
    }
  ];

  // Filter out preloaded notes already in local storage
  const newNotes = preloadedNotes.filter((preloaded) => {
    return !savedNotes.some((saved) => saved.title === preloaded.title);
  });

  // Add new preloaded notes to the DOM and local storage
  newNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    const priorityColors = {
      High: "#e79fa2",
      Medium: "#fcb268",
      Low: "#ffd95f",
    };
    const priorityColor = priorityColors[note.priority] || "#FFFFFF";

    noteElement.innerHTML = `
      <div class="note-header-container">
        <h3 class="note-heading">${note.title}</h3>
        <svg class="note-remove" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>         
      </div>
      <div class="note-statuses">
        <span class="note-project-classification">${note.projectClassification}</span>
        <span class="note-due-date">${note.dueDate}</span>
        <span class="note-priority-level">${note.priority}</span>
      </div>
      <p class="note-description">${note.description}</p>
    `;

    const prioritySpan = noteElement.querySelector(".note-priority-level");
    prioritySpan.style.backgroundColor = priorityColor;

    notesContainer.appendChild(noteElement);
    savedNotes.push(note); // Add preloaded note to savedNotes
  });

  // Save the updated notes list to local storage
  localStorage.setItem("notes", JSON.stringify(savedNotes));
}


function removeNote() {
  const notesContainer = document.querySelector(".notes-container");
  notesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("note-remove")) {
      const noteElement = event.target.closest(".note");
      if (noteElement) {
        noteElement.remove();
        saveNotesToLocalStorage()
      }
    }
  });
}

function filterNotesByProject(projectName) {
  const notes = document.querySelectorAll(".note");

  notes.forEach(note => {
    const projectClassification = note.querySelector(".note-project-classification").textContent.trim();
    if (projectClassification === projectName) {
      note.classList.remove("hidden");
    } else {
      note.classList.add("hidden");
    }
  });
}

function saveNotesToLocalStorage() {
  const notes = [];
  document.querySelectorAll(".notes-container .note").forEach((note) => {
    notes.push({
      title: note.querySelector(".note-heading").textContent,
      description: note.querySelector(".note-description").textContent,
      projectClassification: note.querySelector(".note-project-classification").textContent,
      dueDate: note.querySelector(".note-due-date").textContent,
      priority: note.querySelector(".note-priority-level").textContent,
    });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// function saveProjectsToLocalStorage() {
//   const projects = [];
//   document.querySelectorAll(".ul-projects li").forEach((project) => {
//     projects.push(project.textContent);
//   });
//   localStorage.setItem("projects", JSON.stringify(projects));
// }

function saveProjectsToLocalStorage() {
  const projects = [];
  const projectList = document.querySelectorAll(".ul-projects li");

  projectList.forEach((project) => {
    projects.push(project.textContent);
  });

  // Ensure we're only saving unique projects
  const uniqueProjects = [...new Set(projects)];

  localStorage.setItem("projects", JSON.stringify(uniqueProjects));
}

function loadNotesFromLocalStorage() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const notesContainer = document.querySelector(".notes-container");

  savedNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    const priorityColors = {
      High: "#e79fa2",
      Medium: "#fcb268",
      Low: "#ffd95f",
    };
    const priorityColor = priorityColors[note.priority] || "#FFFFFF";

    noteElement.innerHTML = `
      <div class="note-header-container">
        <h3 class="note-heading">${note.title}</h3>
        <svg class="note-remove" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>         
      </div>
      <div class="note-statuses">
        <span class="note-project-classification">${note.projectClassification}</span>
        <span class="note-due-date">${note.dueDate}</span>
        <span class="note-priority-level">${note.priority}</span>
      </div>
      <p class="note-description">${note.description}</p>
    `;

    const prioritySpan = noteElement.querySelector(".note-priority-level");
    prioritySpan.style.backgroundColor = priorityColor;

    notesContainer.appendChild(noteElement);
  });
}

// function loadProjectsFromLocalStorage() {
//   const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
//   const projectList = document.querySelector(".ul-projects");
//   // projectList.innerHTML = ''

//   savedProjects.forEach((project) => {
//     const projectItem = document.createElement("li");
//     projectItem.textContent = project;
//     projectList.appendChild(projectItem);
//   });

//   updateProjectClassificationOptions();
// }

function loadProjectsFromLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectList = document.querySelector(".ul-projects");

  // Retrieve all existing project items from the DOM (excluding hardcoded projects)
  const existingProjects = Array.from(projectList.children).map(item => item.textContent.trim());

  // Add saved projects to the list that aren't already present
  savedProjects.forEach((project) => {
    if (!existingProjects.includes(project)) {
      const projectItem = document.createElement("li");
      projectItem.textContent = project;
      projectList.appendChild(projectItem);
    }
  });

  // Ensure hardcoded projects are in local storage, if not, add them
  const hardcodedProjects = ["Restaurant Website", "To-do Website"];
  hardcodedProjects.forEach((project) => {
    if (!savedProjects.includes(project)) {
      savedProjects.unshift(project); // Add hardcoded projects at the beginning of the list
    }
  });

  // Save the updated project list (with hardcoded projects if they weren't added)
  localStorage.setItem("projects", JSON.stringify(savedProjects));

  updateProjectClassificationOptions();
}

function loadProjectsFromLocalStorageMobile() {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectList = document.querySelector(".sidebar .ul-projects");

  // Retrieve all existing project items from the DOM (excluding hardcoded projects)
  const existingProjects = Array.from(projectList.children).map(item => item.textContent.trim());

  // Add saved projects to the list that aren't already present
  savedProjects.forEach((project) => {
    if (!existingProjects.includes(project)) {
      const projectItem = document.createElement("li");
      projectItem.textContent = project;
      projectList.appendChild(projectItem);
    }
  });

  // Ensure hardcoded projects are in local storage, if not, add them
  const hardcodedProjects = ["Restaurant Website", "To-do Website"];
  hardcodedProjects.forEach((project) => {
    if (!savedProjects.includes(project)) {
      savedProjects.unshift(project); // Add hardcoded projects at the beginning of the list
    }
  });

  // Save the updated project list (with hardcoded projects if they weren't added)
  localStorage.setItem("projects", JSON.stringify(savedProjects));

  updateProjectClassificationOptions();
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
  getNewProjectMobile()
  updateProjectClassificationOptions()
})

updateProjectClassificationOptions()



document.addEventListener("DOMContentLoaded", () => {
  addPreloadedNotes()
  loadNotesFromLocalStorage()
  loadProjectsFromLocalStorage();
  loadProjectsFromLocalStorageMobile()
  removeNote();
});



document.querySelector(".ul-projects").addEventListener("click", (event) => {
  const clickedItem = event.target;
  if (clickedItem.tagName === "LI") {
    const selectedProject = clickedItem.textContent.trim();
    filterNotesByProject(selectedProject);
  }
});

document.querySelector(".sidebar .ul-projects").addEventListener("click", (event) => {
  const clickedItem = event.target;
  if (clickedItem.tagName === "LI") {
    const selectedProject = clickedItem.textContent.trim();
    filterNotesByProject(selectedProject);
  }
});


document.getElementById("priority-side").addEventListener("click", () => {
  seeNotesByPriority()
});

document.getElementById("priority-side-mobile").addEventListener("click", () => {
  seeNotesByPriority()
});

document.getElementById("due-date-side").addEventListener("click", () => {
  seeNotesByDueDate()
});

document.getElementById("due-date-side-mobile").addEventListener("click", () => {
  seeNotesByDueDate()
});

function clearLocalStorage() {
  localStorage.removeItem("notes");
  localStorage.removeItem("projects");
  location.reload(); // Reload page to reflect changes
}

// clearLocalStorage()

