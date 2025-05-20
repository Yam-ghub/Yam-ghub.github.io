document.addEventListener('DOMContentLoaded', function() {
  // Enhanced navigation with scroll snapping
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  
  // Click handler for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Scroll to section with smooth behavior
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Activate section
      activateSection(targetSection);
    });
  });
  
  // Scroll handler for section activation
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100) && pageYOffset < (sectionTop + sectionHeight - 100)) {
        current = section.getAttribute('id');
        activateSection(section);
      }
    });
  });
  
  // Function to activate a section
  function activateSection(section) {
    sections.forEach(s => s.classList.remove('section-active'));
    section.classList.add('section-active');
    
    // Animate content
    const content = section.querySelector('.section-content');
    content.style.animation = 'none';
    setTimeout(() => {
      content.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 10);
  }
  
  // Initialize first section
  activateSection(document.querySelector('#resume'));
  
  // Intersection Observer for project items
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-active');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.page-section').forEach(section => {
    projectObserver.observe(section);
  });
});