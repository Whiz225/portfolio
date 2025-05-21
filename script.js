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

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

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
