// import { skillsData } from "./skillsData");

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const skillsContent = document.querySelector(".skills-content");
const prevBtn = document.querySelector(".btn-scrow-prev");
const nextBtn = document.querySelector(".btn-scrow-next");

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


const skillsData = [
  {
    Frontend: [
      {
        skill: "HTML5/CSS3/Tailwind CSS/Styled-components/CSS Modules",
        percent: 90,
      },
      { skill: "JavaScript (ES6+)/ TypeScript", percent: 90 },
      { skill: "React.js/ React Query", percent: 90 },
      { skill: "Next.js", percent: 85 },
      { skill: "Vite", percent: 80 },
      { skill: "Pug (Template Engine", percent: 75 },
    ],
  },
  {
    Backend: [
      { skill: "Node.js", percent: 85 },
      { skill: "Express.js", percent: 85 },
      { skill: "RESTful APIs", percent: 90 },
    ],
  },
  {
    "Database & DevOPs Tools": [
      { skill: "MongoDB (Atlas)", percent: 85 },
      { skill: "Mongoose", percent: 85 },
      { skill: "Github", percent: 90 },
      { skill: "Vercel", percent: 90 },
      { skill: "Postman", percent: 80 },
      { skill: "Netlify", percent: 80 },
      { skill: "Render", percent: 85 },
      { skill: "Heroku", percent: 80 },
    ],
  },
  {
    "Cloud & Other Tools": [
      { skill: "VS Code", percent: 90 },
      { skill: "Figma", percent: 80 },
    ],
  },
  {
    "Testing & Quality": [{ skill: "ESLint & Prettier", percent: 80 }],
  },
];


let buttonClick = 1;

function skills(countClick) {
  let count = countClick;
  console.log(count);
  if (countClick > skillsData.length) count = skillsData.length;

  const htmlArray = Array.from({ length: count }).map((_, num) => {
    console.log(Object.entries(skillsData[num]).flat(1));
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

    console.log("aaa", count - (num + 1));

    if (screen.width <= 992 && count - (num + 1) < 1) return htmlContent;
    if (screen.width > 992 && count - (num + 1) < 2) return htmlContent;
  });

  skillsContent.innerHTML = htmlArray.join(" ");

  console.log(skillsContent);
  console.log(screen.width);
  console.log(window.innerWidth);
}

function toggleForSmallScreen() {
  if (buttonClick >= skillsData.length) nextBtn.style.opacity = 0;
  if (buttonClick < skillsData.length) nextBtn.style.opacity = 1;
  if (buttonClick <= 1) prevBtn.style.opacity = 0;
  if (buttonClick > 1) prevBtn.style.opacity = 1;
}

function toggleForBigScreen() {
  console.log(buttonClick, skillsData.length);
  if (buttonClick + 1 >= skillsData.length) nextBtn.style.opacity = 0;
  if (buttonClick < skillsData.length) nextBtn.style.opacity = 1;
  if (buttonClick <= 2) prevBtn.style.opacity = 0;
  if (buttonClick > 2) prevBtn.style.opacity = 1;
}

(() => {
  if (screen.width <= 992) {
    skills(buttonClick);
    toggleForSmallScreen();
  }
})();

(() => {
  if (screen.width > 992) {
    buttonClick++;
    skills(buttonClick);
    toggleForBigScreen();
  }
})();

if (prevBtn && nextBtn) {
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
