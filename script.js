import { projectData } from "./projectData.js";
import { skillsData } from "./skillsData.js";

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const skillsContent = document.querySelector(".skills-content");
const prevBtn = document.querySelector(".btn-scrow-prev");
const nextBtn = document.querySelector(".btn-scrow-next");
const projectContent = document.querySelector(".projects-grid");
const prevProjectBtn = document.querySelector(".btn-project-prev");
const nextProjectBtn = document.querySelector(".btn-project-next");

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

let buttonClick = 0;

function skills(countClick) {
  let count = countClick;
  if (countClick > skillsData.length) count = skillsData.length;

  const htmlArray = Array.from({ length: count }).map((_, num) => {
    const [keys, values] = Object.entries(skillsData[num]).flat(1);

    const html = values.map(
      (el) => `<div class="skill-item">
      <div class="skill-info">
      <span>${el.skill}</span>
      <span>${el.percent}%</span>
      </div>
      <div class="progress-bar">
      <div class="progress" style="width: ${el.percent}%"></div>
      </div>
      </div>`
    );

    const htmlContent = `<div class="skills-column">
  <h3>${keys}</h3>
  ${html.join(" ")}
  </div>`;

    // if (window.innerWidth <= 992 && count - (num + 1) < 1) return htmlContent;
    // if (window.innerWidth > 992 && count - (num + 1) < 2) return htmlContent;
    if (screen.width <= 992 && count - (num + 1) < 1) return htmlContent;
    if (screen.width > 992 && count - (num + 1) < 2) return htmlContent;
  });

  skillsContent.innerHTML = htmlArray.join(" ");
}

function toggleForSmallScreen() {
  if (buttonClick >= skillsData.length) {
    nextBtn.style.opacity = 0;
    nextBtn.disabled = true;
  }
  if (buttonClick < skillsData.length) {
    nextBtn.style.opacity = 1;
    nextBtn.disabled = false;
  }
  if (buttonClick <= 1) {
    prevBtn.style.opacity = 0;
    prevBtn.disabled = true;
  }
  if (buttonClick > 1) {
    prevBtn.style.opacity = 1;
    prevBtn.disabled = false;
  }
}

function toggleForBigScreen() {
  if (buttonClick + 1 >= skillsData.length) {
    nextBtn.style.opacity = 0;
    nextBtn.disabled = true;
  }

  if (buttonClick < skillsData.length) {
    nextBtn.style.opacity = 1;
    nextBtn.disabled = false;
  }
  if (buttonClick <= 2) {
    prevBtn.style.opacity = 0;
    prevBtn.disabled = true;
  }
  if (buttonClick > 2) {
    prevBtn.style.opacity = 1;
    prevBtn.disabled = false;
  }
}

(() => {
  // if (window.innerWidth <= 992) {
  if (screen.width <= 992) {
    buttonClick++;
    skills(buttonClick);
    toggleForSmallScreen();
  }
})();

(() => {
  // if (window.innerWidth > 992) {
  if (screen.width > 992) {
    buttonClick += 2;
    skills(buttonClick);
    toggleForBigScreen();
  }
})();

if (prevBtn && nextBtn) {
  // if (window.innerWidth <= 992) {
  if (screen.width <= 992) {
    nextBtn.addEventListener("click", () => {
      buttonClick++;
      skills(buttonClick);
      toggleForSmallScreen();
    });

    prevBtn.addEventListener("click", () => {
      buttonClick--;
      skills(buttonClick);
      toggleForSmallScreen();
    });
  }

  // if (window.innerWidth > 992) {
  if (screen.width > 992) {
    nextBtn.addEventListener("click", () => {
      buttonClick += 2;
      skills(buttonClick);
      toggleForBigScreen();
    });

    prevBtn.addEventListener("click", () => {
      buttonClick -= 2;
      skills(buttonClick);
      toggleForBigScreen();
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

let buttonCount = 0;

function projects(countClick) {
  let count = countClick;
  if (countClick > projectData.length) count = projectData.length;

  const htmlArray = Array.from({ length: count }).map((_, num) => {
    const html = `<div class="project-card">
              <div class="project-image">
                <img
                  src=${projectData[num].src}
                  alt=${projectData[num].alt}
                />
              </div>
              <div class="project-info">
                <h3>${projectData[num].h3}</h3>
                <p> ${projectData[num].p}</p>
                <div class="project-tech">
                  <span
                    >${projectData[num].span1}
                  </span>
                  <span>${projectData[num].span2} </span>
                  <span
                    >${projectData[num].span3} </span
                  >
                  <span
                    >${projectData[num].span4} </span
                  >
                </div>
                <div class="project-links">
                  <a
                    href=${projectData[num].hrefDemo}
                    class="btn btn-small"
                    >Live Demo</a
                  >
                  <a
                    href=${projectData[num].hrefCode}
                    class="btn btn-small btn-outline"
                    >Code</a
                  >
                </div>
              </div>
            </div>`;

    // if (window.innerWidth <= 1012 && count - (num + 1) < 1) return html;
    // if (window.innerWidth > 1012 && count - (num + 1) < 2) return html;
    if (screen.width <= 1012 && count - (num + 1) < 1) return html;
    if (screen.width > 1012 && count - (num + 1) < 2) return html;
  });

  projectContent.innerHTML = htmlArray.join(" ");
}

function toggleForSmallScreenForProject() {
  if (buttonCount >= projectData.length) {
    nextProjectBtn.style.opacity = 0;
    nextProjectBtn.disabled = true;
  }
  if (buttonCount < projectData.length) {
    nextProjectBtn.style.opacity = 1;
    nextProjectBtn.disabled = false;
  }
  if (buttonCount <= 1) {
    prevProjectBtn.style.opacity = 0;
    prevProjectBtn.disabled = true;
  }
  if (buttonCount > 1) {
    prevProjectBtn.style.opacity = 1;
    prevProjectBtn.disabled = false;
  }
}

function toggleForBigScreenForProject() {
  if (buttonCount + 1 >= projectData.length) {
    nextProjectBtn.style.opacity = 0;
    nextProjectBtn.disabled = true;
  }

  if (buttonCount < projectData.length) {
    nextProjectBtn.style.opacity = 1;
    nextProjectBtn.disabled = false;
  }
  if (buttonCount <= 2) {
    prevProjectBtn.style.opacity = 0;
    prevProjectBtn.disabled = true;
  }
  if (buttonCount > 2) {
    prevProjectBtn.style.opacity = 1;
    prevProjectBtn.disabled = false;
  }
}

(() => {
  // if (window.innerWidth <= 1012) {
  if (screen.width <= 1012) {
    buttonCount++;
    projects(buttonCount);
    toggleForSmallScreenForProject();
  }
})();

(() => {
  // if (window.innerWidth > 1012) {
  if (screen.width > 1012) {
    buttonCount += 2;
    projects(buttonCount);
    toggleForBigScreenForProject();
  }
})();

if (prevProjectBtn && nextProjectBtn) {
  // if (window.innerWidth <= 1012) {
  if (screen.width <= 1012) {
    nextProjectBtn.addEventListener("click", () => {
      buttonCount++;
      projects(buttonCount);
      toggleForSmallScreenForProject();
    });

    prevProjectBtn.addEventListener("click", () => {
      buttonCount--;
      projects(buttonCount);
      toggleForSmallScreenForProject();
    });
  }

  // if (window.innerWidth > 1012) {
  if (screen.width > 1012) {
    nextProjectBtn.addEventListener("click", () => {
      buttonCount += 2;
      projects(buttonCount);
      toggleForBigScreenForProject();
    });

    prevProjectBtn.addEventListener("click", () => {
      buttonCount -= 2;
      projects(buttonCount);
      toggleForBigScreenForProject();
    });
  }
}

// Smooth Scrolling for Anchor Links
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();

//     const targetId = this.getAttribute("href");
//     const targetElement = document.querySelector(targetId);

//     if (targetElement) {
//       window.scrollTo({
//         top: targetElement.offsetTop - 80,
//         behavior: "smooth",
//       });
//     }
//   });
// });

// Animate Skills Progress Bars on Scroll
const skillItems = document.querySelectorAll(".skill-item");

function animateSkills() {
  skillItems.forEach((item) => {
    const progress = item.querySelector(".progress");
    const percent = item.querySelector(
      ".skill-info span:last-child"
    ).textContent;
    progress.style.width = percent;
  });
}

// Only animate when skills section is in view
const skillsSection = document.querySelector(".skills");
const options = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, options);

observer.observe(skillsSection);

// Form Submission
// const contactForm = document.querySelector(".contact-form");

// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Get form values
//     const name = contactForm.querySelector('input[type="text"]').value;
//     const email = contactForm.querySelector('input[type="email"]').value;
//     const subject = contactForm.querySelector(
//       'input[type="text"]:nth-of-type(2)'
//     ).value;
//     const message = contactForm.querySelector("textarea").value;

//     // Here you would typically send the form data to a server
//     console.log({ name, email, subject, message });

//     // Show success message
//     alert("Thank you for your message! I will get back to you soon.");
//     contactForm.reset();
//   });
// }

// Current Year for Footer
const year = new Date().getFullYear();
document.querySelector("footer p").textContent =
  "© 2025 Nwosu Emmanuel. All rights reserved.";
