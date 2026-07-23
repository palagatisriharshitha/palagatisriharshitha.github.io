
// ===============================
// Portfolio v2 - script.js
// ===============================

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Reveal animations
const revealItems = document.querySelectorAll(
  '.section, .card, .timeline-card, .project, .stats div, .gallery img'
);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealItems.forEach(item => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

// Inject helper styles
const helperStyle = document.createElement('style');
helperStyle.textContent = `
.reveal{
  opacity:0;
  transform:translateY(40px);
  transition:opacity .7s ease, transform .7s ease;
}
.revealed{
  opacity:1;
  transform:translateY(0);
}
.active-nav{
  color:#2563eb !important;
}
#backToTop{
  position:fixed;
  right:24px;
  bottom:24px;
  width:48px;
  height:48px;
  border:none;
  border-radius:50%;
  background:#2563eb;
  color:#fff;
  cursor:pointer;
  display:none;
  font-size:20px;
  box-shadow:0 10px 25px rgba(37,99,235,.3);
}
#backToTop:hover{
  transform:translateY(-3px);
}
`;
document.head.appendChild(helperStyle);

// Active navigation
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        'active-nav',
        link.getAttribute('href') === '#' + entry.target.id
      );
    });
  });
}, { threshold: 0.5 });

sections.forEach(section => navObserver.observe(section));

// Back to top button
const backBtn = document.createElement('button');
backBtn.id = 'backToTop';
backBtn.innerHTML = '↑';
backBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backBtn);

window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

backBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Hero image tilt
const heroImage = document.querySelector('.hero-image img');

if (heroImage) {
  heroImage.addEventListener('mousemove', e => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 25;
    const rotateX = -(y - rect.height / 2) / 25;
    heroImage.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = '';
  });
}

console.log('Portfolio v2 loaded successfully.');
