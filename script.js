// ========================
// SCROLL ANIMATIONS
// ========================

// Intersection Observer for strategy cards
const cards = document.querySelectorAll('.strategy-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
      }, parseInt(delay));
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));

// ========================
// BAR CHART ANIMATION
// ========================
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, 300);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));

// ========================
// MUTE / UNMUTE TOGGLE
// ========================
const muteBtn   = document.getElementById('muteToggle');
const reelVideo = document.getElementById('reelVideo');

if (muteBtn && reelVideo) {
  muteBtn.addEventListener('click', () => {
    if (reelVideo.muted) {
      reelVideo.muted = false;
      muteBtn.querySelector('.float-mute-icon').textContent = '🔊';
      muteBtn.querySelector('.float-mute-label').textContent = 'Tap to Mute';
      muteBtn.classList.add('unmuted');
    } else {
      reelVideo.muted = true;
      muteBtn.querySelector('.float-mute-icon').textContent = '🔇';
      muteBtn.querySelector('.float-mute-label').textContent = 'Tap for Sound';
      muteBtn.classList.remove('unmuted');
    }
  });
}

// ========================
// SMOOTH SCROLL FOR NAV
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================
// NAVBAR SCROLL EFFECT
// ========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(8,12,20,0.98)';
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(8,12,20,0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ========================
// COUNTER ANIMATION (stats)
// ========================
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.trim();
      if (raw.includes('150K+')) animateCounter(el, 150, 'K+');
      else if (raw.includes('25')) animateCounter(el, 25, '');
      else if (raw.includes('6')) animateCounter(el, 6, '');
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(s => statsObserver.observe(s));

// ========================
// GENERAL FADE IN ON SCROLL
// ========================
const fadeEls = document.querySelectorAll(
  '.ops-card, .future-card, .guarantee-card, .budget-note, .pricing-table, .surprise-box, .analytics-list li, .founder-card'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObserver.observe(el));
