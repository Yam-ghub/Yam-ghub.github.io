document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
  });
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Close mobile menu if open
      nav.classList.remove('active');
      
      // Scroll to section
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
  
  // Intersection Observer for section animations
  const sections = document.querySelectorAll('.page-section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate project items sequentially
        if (entry.target.id === 'projects') {
          const projectItems = entry.target.querySelectorAll('.project-item');
          projectItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 150);
          });
        }
        
        // Animate skill bars
        if (entry.target.id === 'about') {
          const skillBars = entry.target.querySelectorAll('.skill-level');
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Initialize first section
  sections[0].classList.add('visible');

  // Add this to your script.js
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  // Toggle mobile nav
  document.querySelector('nav').classList.toggle('active');
  
  // Toggle all section panels
  const allSections = document.querySelectorAll('.page-section');
  const shouldShow = !allSections[0].classList.contains('active');
  
  allSections.forEach(section => {
    if (shouldShow) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  // Update hamburger icon
  this.querySelector('i').classList.toggle('fa-times');
  this.querySelector('i').classList.toggle('fa-bars');
});
});