// =============================================
// EBINEZER M — PORTFOLIO JS
// =============================================

// ---- CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower') || document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .skill-category, .cert-card, .project-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'transparent';
    cursor.style.border = '1px solid #b8f542';
    if (follower) {
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.borderColor = 'rgba(184,245,66,0.6)';
    }
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = '#b8f542';
    cursor.style.border = 'none';
    if (follower) {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(184,245,66,0.4)';
    }
  });
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.section-label, .section-title, .about-text, .about-card-wrap, .skill-category, .project-item, .timeline-item, .cert-card, .achievement-banner, .contact-inner');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- STAGGER REVEAL FOR GRIDS ----
const staggerGroups = [
  { parent: '.skills-grid', child: '.skill-category', delay: 80 },
  { parent: '.certs-grid', child: '.cert-card', delay: 60 },
  { parent: '.projects-list', child: '.project-item', delay: 100 },
  { parent: '.timeline', child: '.timeline-item', delay: 120 },
];

staggerGroups.forEach(({ parent, child, delay }) => {
  const parentEl = document.querySelector(parent);
  if (!parentEl) return;
  const children = parentEl.querySelectorAll(child);
  children.forEach((el, i) => {
    el.style.transitionDelay = `${i * delay}ms`;
  });
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- TERMINAL TYPING EFFECT ----
const terminalBody = document.querySelector('.about-card-body');
if (terminalBody) {
  const lines = terminalBody.querySelectorAll('.terminal-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, 400 + i * 120);
  });
}

// ---- HERO PARALLAX ----
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg-grid');
  if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
  if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.08}px)`;
});

// ---- SKILL TAGS HOVER COLOR ----
const skillTags = document.querySelectorAll('.skill-tags span');
const colors = ['#b8f542', '#42f5c5', '#f5a742', '#f542b8', '#4287f5'];
skillTags.forEach(tag => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  tag.addEventListener('mouseenter', () => {
    tag.style.color = color;
    tag.style.borderColor = color + '44';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.color = '';
    tag.style.borderColor = '';
  });
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- CONSOLE EASTER EGG ----
console.log('%c👋 Hey there, fellow developer!', 'color: #b8f542; font-size: 18px; font-weight: bold;');
console.log('%cThis portfolio was handcrafted by Ebinezer M.', 'color: #888; font-size: 12px;');
console.log('%cLooking to hire or collaborate? → ebinezerm004@gmail.com', 'color: #42f5c5; font-size: 12px;');
