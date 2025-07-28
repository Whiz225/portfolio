import { projectData } from "./projectData.js";
// import { skillsData } from "./skillsData.js";

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
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

//////////////////////////////
// Skills section animation
const skillItems = document.querySelectorAll(".skill-item");

// Function to animate skills sequentially
function animateSkills() {
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate");
    }, index * 100); // 100ms delay between each item
  });
}

// Intersection Observer to trigger animation when section is in view
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Observe the skills section
const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Enhanced hover effect with GSAP (if you're using GSAP)
if (typeof gsap !== "undefined") {
  skillItems.forEach((item) => {
    const icon = item.querySelector(".skill-icon");
    const text = item.querySelector("h5");

    item.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        y: -10,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(text, {
        opacity: 1,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(text, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}
