// 🌗 Theme Toggle
const toggleBtn = document.getElementById('modeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}

// 🍔 Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// ✨ Fade-in Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 🎯 Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    projects.forEach(p => {
      p.style.display = cat === 'all' || p.dataset.category === cat ? 'block' : 'none';
    });
  });
});

// 📊 Scroll Progress Bar
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// 🔝 Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 🎨 Theme Color Switcher
const paletteToggle = document.getElementById('paletteToggle');
const palette = document.querySelector('.palette');
const colorOptions = document.querySelectorAll('.color-option');
paletteToggle.addEventListener('click', () => {
  palette.classList.toggle('show');
});
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const selectedColor = option.dataset.color;
    document.documentElement.style.setProperty('--primary', selectedColor);
    localStorage.setItem('primaryColor', selectedColor);
    palette.classList.remove('show');
  });
});
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  const savedColor = localStorage.getItem('primaryColor');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  }
  if (savedColor) {
    document.documentElement.style.setProperty('--primary', savedColor);
  }
});

// 🌌 Particle Background (interactive dots + connecting lines)
const canvas = document.createElement('canvas');
canvas.id = 'particleBg';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PARTICLE_COUNT = 80;
const MAX_DISTANCE = 130;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.6,
  dy: (Math.random() - 0.5) * 0.6,
}));

let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim();

  particles.forEach(p => {
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += dx / dist;
        p.y += dy / dist;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = primary;
    ctx.shadowBlur = 8;
    ctx.shadowColor = primary;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.strokeStyle = primary + '33';
        ctx.lineWidth = 0.4;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

// 🌀 Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");

    // ⌨️ Typing Effect
    const text = "Full Stack Developer 💻";
    let i = 0;
    function typing() {
      if (i < text.length) {
        document.getElementById("typing").textContent += text.charAt(i);
        i++;
        setTimeout(typing, 100);
      }
    }
    typing();
  }, 800);
});


