// Scroll Progress
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('scrollProgress').style.width = scrolled + '%';
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navBtns = document.querySelectorAll('.nav-btn');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${current}`) {
          btn.classList.add('active');
        }
      });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || this.id === 'joinUsBtn') {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
    });

    // Intersection Observer for animations (works both ways - scroll up and down)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate in when entering viewport
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        } else {
          // Animate out when leaving viewport (enables re-animation on scroll up)
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          entry.target.classList.remove('animated');
        }
      });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.feature-card, .stat-card, .skill-item, .project-card-new, .contact-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Parallax effect for robot
    const robot = document.querySelector('.robot-container');
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (robot) {
        robot.style.transform = `translate(${x}px, ${y}px)`;
      }
    });

    // Social Modal Functions
    const modal = document.getElementById('socialModal');
    const joinUsBtn = document.getElementById('joinUsBtn');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open modal when clicking "Join us" button
    joinUsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close modal - close button
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close modal - overlay click
    modalOverlay.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close modal - Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });