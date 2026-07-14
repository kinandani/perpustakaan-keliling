(function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('active', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

(function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.ceil(target / 80);
      const timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString('id-ID') + suffix;
      }, 20);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 3000;

  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = [
      'position:fixed',
      'bottom:2rem',
      'left:50%',
      'transform:translateX(-50%)',
      'z-index:9999',
      'display:flex',
      'flex-direction:column',
      'gap:.5rem',
      'align-items:center',
      'pointer-events:none'
    ].join(';');
    document.body.appendChild(container);
  }

  var icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  var colors = {
    success: '#065F46',
    error: '#991B1B',
    info: '#1E40AF',
    warning: '#92400E'
  };
  var bgColors = {
    success: '#D1FAE5',
    error: '#FEE2E2',
    info: '#DBEAFE',
    warning: '#FEF3C7'
  };

  var toast = document.createElement('div');
  toast.style.cssText = [
    'background:' + bgColors[type],
    'color:' + colors[type],
    'padding:.75rem 1.25rem',
    'border-radius:999px',
    'font-size:.875rem',
    'font-weight:600',
    'box-shadow:0 4px 12px rgba(0,0,0,.15)',
    'pointer-events:all',
    'transition:all .3s ease',
    'display:flex',
    'align-items:center',
    'gap:.5rem',
    'white-space:nowrap'
  ].join(';');
  toast.innerHTML = icons[type] + ' ' + message;
  container.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

function formatTanggal(date) {
  var d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function toggleModal(modalId, open) {
  var overlay = document.getElementById(modalId);
  if (!overlay) return;
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});