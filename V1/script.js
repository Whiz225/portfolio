import { projectData } from "./projectData.js";
import { skillsData } from "./skillsData.js";

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Sticky Header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

// Render Skills
function renderSkills() {
  const skillsGrid = document.querySelector(".skills-grid");

  // Clear existing content
  skillsGrid.innerHTML = "";

  // Create skill categories
  Object.entries(skillsData).forEach(([category, skills]) => {
    const skillCategory = document.createElement("div");
    skillCategory.className = "skill-category";

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    skillCategory.appendChild(categoryTitle);

    // Add individual skills
    skills.forEach((skill) => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item";

      skillItem.innerHTML = `
        <div class="skill-info">
          <span>${skill.skill}</span>
          <span>${skill.percent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress" data-width="${skill.percent}"></div>
        </div>
      `;

      skillCategory.appendChild(skillItem);
    });

    skillsGrid.appendChild(skillCategory);
  });

  // Animate progress bars when skills section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = document.querySelectorAll(".progress");
          progressBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = `${width}%`;
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(document.querySelector(".skills"));
}

// Projects Navigation
let currentProjectIndex = 0;

function renderProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  projectsGrid.innerHTML = "";

  // Determine how many projects to show based on screen size
  let projectsToShow = 1;
  if (window.innerWidth >= 600) projectsToShow = 2;
  if (window.innerWidth >= 992) projectsToShow = 3;

  // Calculate the end index
  let endIndex = currentProjectIndex + projectsToShow;
  if (endIndex > projectData.length) {
    endIndex = projectData.length;
    currentProjectIndex = Math.max(0, projectData.length - projectsToShow);
  }

  // Render the projects
  for (let i = currentProjectIndex; i < endIndex; i++) {
    const project = projectData[i];
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.src}" alt="${project.alt}">
      </div>
      <div class="project-info">
        <h3>${project.h3}</h3>
        <p>${project.p}</p>
        <div class="project-tech">
          <span>${project.span1}</span>
          <span>${project.span2}</span>
          <span>${project.span3}</span>
          <span>${project.span4}</span>
        </div>
        <div class="project-links">
          <a href="${project.hrefDemo}" class="btn btn-small">Live Demo</a>
          <a href="${project.hrefCode}" class="btn btn-small btn-outline">Code</a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  }

  // Update navigation button states
  document.querySelector(".btn-project-prev").disabled =
    currentProjectIndex === 0;
  document.querySelector(".btn-project-next").disabled =
    currentProjectIndex + projectsToShow >= projectData.length;
}

// Event listeners for project navigation
document.querySelector(".btn-project-prev").addEventListener("click", () => {
  let projectsToShow = 1;
  if (window.innerWidth >= 600) projectsToShow = 2;
  if (window.innerWidth >= 992) projectsToShow = 3;

  currentProjectIndex = Math.max(0, currentProjectIndex - projectsToShow);
  renderProjects();
});

document.querySelector(".btn-project-next").addEventListener("click", () => {
  let projectsToShow = 1;
  if (window.innerWidth >= 600) projectsToShow = 2;
  if (window.innerWidth >= 992) projectsToShow = 3;

  currentProjectIndex = Math.min(
    projectData.length - projectsToShow,
    currentProjectIndex + projectsToShow
  );
  renderProjects();
});

// Handle window resize for projects
window.addEventListener("resize", () => {
  renderProjects();
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();

  // Update footer year
  const year = new Date().getFullYear();
  document.querySelector(
    "footer p"
  ).textContent = `© ${year} Nwosu Emmanuel. All rights reserved.`;
});
