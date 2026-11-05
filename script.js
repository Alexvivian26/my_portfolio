document.addEventListener("DOMContentLoaded", () => {

  // =================================
  // 1. MOBILE NAVIGATION
  // =================================

 const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });

}


  // =================================
  // 2. SCROLL REVEAL ANIMATION
  // =================================

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            currentObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("show");
    });

  }


  // =================================
  // 3. PROJECT CAROUSEL
  // =================================

  const carousel = document.querySelector(".project-carousel");

  const previous = document.querySelector(".carousel-btn.prev");

  const next = document.querySelector(".carousel-btn.next");

  const progress = document.querySelector(".carousel-progress-bar");


  if (carousel) {

    // Calculate the width of one project card

    const getStep = () => {

      const card = carousel.querySelector(".carousel-card");

      if (!card) {
        return carousel.clientWidth;
      }

      const gap = parseFloat(
        getComputedStyle(carousel).columnGap
      ) || 0;

      return card.getBoundingClientRect().width + gap;

    };


    // Move to the previous project

    previous?.addEventListener("click", () => {

      carousel.scrollBy({
        left: -getStep(),
        behavior: "smooth"
      });

    });


    // Move to the next project

    next?.addEventListener("click", () => {

      carousel.scrollBy({
        left: getStep(),
        behavior: "smooth"
      });

    });


    // Update carousel progress

    const updateProgress = () => {

      const maxScroll =
        carousel.scrollWidth - carousel.clientWidth;

      const percentage =
        maxScroll <= 0
          ? 100
          : (carousel.scrollLeft / maxScroll) * 100;

      if (progress) {
        progress.style.width =
          `${Math.max(33.33, percentage)}%`;
      }

    };


    carousel.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener("resize", updateProgress);

    updateProgress();

  }


  // =================================
  // 4. AUTOMATIC FOOTER YEAR
  // =================================

  document.querySelectorAll(".year").forEach(element => {

    element.textContent = new Date().getFullYear();

  });


  // =================================
  // 5. CONTACT FORM
  // =================================

  const contactForm = document.querySelector("#contact-form");

  const formNote = document.querySelector("#form-note");


  if (contactForm && formNote) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      // Check that required fields are completed

      if (!contactForm.reportValidity()) {
        return;
      }

      formNote.textContent =
        "Thank you! Your form is working in demo mode. Connect an email service to receive enquiries.";

      contactForm.reset();

    });

  }

});