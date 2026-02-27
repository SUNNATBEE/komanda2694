// shared.js - TRUE Fitness shared functionality

// ===== LANGUAGE SWITCHER =====
let currentLang = localStorage.getItem('trueLang') || 'ru';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('trueLang', lang);
  applyLang();
  closeLangMenu();
}

function applyLang() {
  const flag = document.getElementById('langFlag');
  const code = document.getElementById('langCode');
  if (flag) flag.src = currentLang === 'ru' ? 'https://flagcdn.com/w40/ru.png' : 'https://flagcdn.com/w40/uz.png';
  if (code) code.textContent = currentLang.toUpperCase();

  document.querySelectorAll('[data-ru], [data-uz]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) {
      if (el.tagName === 'INPUT') el.placeholder = text;
      else el.textContent = text;
    }
  });
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('hidden');
}

function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.add('hidden');
}

document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('langDropdown');
  if (dropdown && !dropdown.contains(e.target)) closeLangMenu();
});

// ===== PAGE TRANSITIONS =====
function initTransitions() {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  // Slide out on page load (entry animation)
  overlay.style.transform = 'translateX(0)';
  setTimeout(() => {
    overlay.style.transform = 'translateX(100%)';
  }, 50);

  // Intercept internal link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) return;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      overlay.style.transform = 'translateX(0)';
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  });
}

// ===== MODAL =====
function openModal() {
  const modal = document.getElementById('zayavkaModal');
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('zayavkaModal');
  if (modal) modal.style.display = 'none';
}

function submitModal() {
  const nameEl = document.getElementById('modalName');
  const phoneEl = document.getElementById('modalPhone');
  const emailEl = document.getElementById('modalEmail');
  if (!nameEl || !phoneEl || !emailEl) return;
  const name = nameEl.value;
  const phone = phoneEl.value;
  const email = emailEl.value;
  if (name.length < 2) { alert('Введите имя'); return; }
  if (phone.length < 5) { alert('Введите телефон'); return; }
  closeModal();
  nameEl.value = '';
  phoneEl.value = '';
  emailEl.value = '';
  showToast('Заявка отправлена! Мы свяжемся с вами.');
}

document.addEventListener('click', function(e) {
  const modal = document.getElementById('zayavkaModal');
  if (modal && e.target === modal) closeModal();
});

// ===== TOAST =====
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#01AEE7;color:white;padding:14px 28px;font-weight:bold;z-index:99999;border-radius:2px;box-shadow:0 4px 20px rgba(0,0,0,0.2);transition:opacity 0.4s;font-family:Montserrat,sans-serif;';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navMenuMobile');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
}

// ===== PROGRESS BAR =====
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(100, scrolled) + '%';
  });
}

// ===== 3D TILT =====
function init3DTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.style.transition = 'transform 0.1s ease';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href]').forEach(link => {
    const linkHref = link.getAttribute('href').replace('./', '');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.style.color = '#01AEE7';
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 80, duration: 900, easing: 'ease-out-cubic' });
  }
  initTransitions();
  initMobileMenu();
  initProgressBar();
  init3DTilt();
  applyLang();
  setActiveNav();
});
