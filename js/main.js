// ===========================
// HARUN TELI - Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');
  if (header) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
          } else {
            header.classList.remove('header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Testimonial Slider ---
  var slides = document.querySelectorAll('.slider__slide');
  var dots = document.querySelectorAll('.slider__dot');
  var prevBtn = document.querySelector('.slider__arrow--prev');
  var nextBtn = document.querySelector('.slider__arrow--next');
  var currentSlide = 0;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goToSlide(parseInt(dot.dataset.slide));
    });
  });

  // Auto-advance every 5 seconds
  if (slides.length > 1) {
    setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  // --- Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var isValid = true;
      var requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(function (field) {
        // Remove previous error styling
        field.style.borderColor = '';

        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  }

});
