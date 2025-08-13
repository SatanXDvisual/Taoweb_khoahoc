document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navbar.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navbar.classList.remove("open");
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.1)";
      navbar.style.backdropFilter = "blur(20px)";
    }
  });

  // Animate numbers on scroll
  function animateNumbers() {
    const numberElements = document.querySelectorAll(".stat-number");

    numberElements.forEach((element) => {
      const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent =
          Math.floor(current) +
          (element.textContent.includes("+") ? "+" : "") +
          (element.textContent.includes("%") ? "%" : "");
      }, 20);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Animate numbers when stats section is visible
        if (entry.target.classList.contains("hero-stats")) {
          animateNumbers();
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".hero-stats, .course-card, .about-feature, .stat-item"
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  // Course card hover effects
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      if (this.classList.contains("featured")) {
        this.style.transform = "scale(1.05)";
      } else {
        this.style.transform = "translateY(0) scale(1)";
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const submitButton = this.querySelector(".submit-button");
      const originalText = submitButton.innerHTML;

      // Show loading state
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
      submitButton.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        submitButton.innerHTML = '<i class="fas fa-check"></i> Gửi thành công!';
        submitButton.style.background =
          "linear-gradient(135deg, #059669, #10b981)";

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.style.background =
            "linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))";
          submitButton.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  // Course button click handling
  const courseButtons = document.querySelectorAll(".course-button");

  courseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Only run the scroll logic if the element is a BUTTON
      if (this.tagName !== 'BUTTON') {
          return;
      }
      const courseTitle =
        this.closest(".course-card").querySelector(".course-title").textContent;

      // Scroll to contact form
      const contactSection = document.querySelector("#contact");
      contactSection.scrollIntoView({ behavior: "smooth" });

      // Auto-fill course selection
      setTimeout(() => {
        const courseSelect = document.querySelector("select");
        if (courseSelect) {
          if (courseTitle.includes("Fundamentals")) {
            courseSelect.value = "fundamentals";
          } else if (courseTitle.includes("MEP")) {
            courseSelect.value = "advanced";
          } else if (courseTitle.includes("BIM")) {
            courseSelect.value = "expert";
          }
        }
      }, 1000);
    });
  });

  // Parallax effect for background shapes
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5;
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });

  // Typing effect for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typing effect when page loads
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }

  // Floating animation for icons
  function addFloatingAnimation() {
    const icons = document.querySelectorAll(".course-icon, .feature-icon");

    icons.forEach((icon, index) => {
      icon.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
  }

  // Add floating animation to icons
  addFloatingAnimation();

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent =
        Math.floor(current) +
        (element.textContent.includes("+") ? "+" : "") +
        (element.textContent.includes("%") ? "%" : "");
    }, 16);
  }

  // Animate counters when they come into view
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
          animateCounter(element, target);
          counterObserver.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe counter elements
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Smooth reveal animation for sections
  function revealOnScroll() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY + windowHeight > sectionTop + 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize reveal animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check

  // Mobile menu toggle (if needed)
  function createMobileMenu() {
    const navbar = document.querySelector(".navbar");
    const navMenu = document.querySelector(".nav-menu");

    // Create mobile menu button
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.className = "mobile-menu-btn";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    // Add mobile menu button to navbar
    navbar.querySelector(".nav-container").appendChild(mobileMenuBtn);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      this.innerHTML = navMenu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Initialize mobile menu on small screens
  if (window.innerWidth <= 768) {
    createMobileMenu();
  }

  // Performance optimization
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        // Update scroll-based animations here
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", updateOnScroll);
});