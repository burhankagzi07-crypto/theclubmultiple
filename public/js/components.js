// ── Shared Logo SVG ──────────────────────────────────────────
const LOGO_SVG = `
<svg class="nav-logo-mark" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="#FF4500" stroke-width="1.5"/>
  <polygon points="22,7 36,15 36,29 22,37 8,29 8,15" fill="none" stroke="#FF8C00" stroke-width="0.5" opacity="0.4"/>
  <path d="M18 14 L14 22 L20 22 L16 30 L26 20 L20 20 L24 14 Z" fill="#FF4500"/>
</svg>`;

const LOGO_HTML = `
<a href="/index.html" class="nav-logo">
  ${LOGO_SVG}
  <div class="nav-logo-text">
    <span class="nav-logo-top">The Club</span>
    <span class="nav-logo-bottom">MULTIPLE</span>
  </div>
</a>`;

// ── Navbar HTML ───────────────────────────────────────────────
function buildNav(activePage) {
  const pages = [
    { href:'/index.html',      label:'Home'       },
    { href:'/about.html',      label:'About'      },
    { href:'/membership.html', label:'Membership' },
    { href:'/gallery.html',    label:'Gallery'    },
    { href:'/reviews.html',    label:'Reviews'    },
    { href:'/contact.html',    label:'Contact'    },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="${p.label.toLowerCase()===activePage?'active':''}">${p.label}</a>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" onclick="closeMobileNav()">${p.label}</a>`
  ).join('');

  return `
<nav id="navbar">
  ${LOGO_HTML}
  <div class="nav-links">
    ${links}
    <a href="/membership.html" class="nav-cta">Join Now</a>
  </div>
  <button class="hamburger" id="hamburger" onclick="toggleMobileNav()">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-nav" id="mobileNav">
  ${mobileLinks}
  <a href="/membership.html" style="color:#FF4500 !important;" onclick="closeMobileNav()">Join Now →</a>
</div>`;
}

// ── Footer HTML ───────────────────────────────────────────────
function buildFooter() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        ${LOGO_SVG.replace('class="nav-logo-mark"','width="48" height="48"')}
        <div style="margin-top:0.5rem;">
          <div style="font-family:'Anton',sans-serif;font-size:1.3rem;letter-spacing:0.1em;">MULTIPLE</div>
          <div style="font-size:0.6rem;letter-spacing:0.3em;color:var(--orange);text-transform:uppercase;">The Club</div>
        </div>
        <p>Silicon Indore's premier fitness destination. Built for people who are serious about results.</p>
        <div class="social-links" style="margin-top:1.2rem;">
          <a href="#" class="social-btn">ig</a>
          <a href="#" class="social-btn">fb</a>
          <a href="#" class="social-btn">yt</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/membership.html">Membership</a></li>
          <li><a href="/gallery.html">Gallery</a></li>
          <li><a href="/reviews.html">Reviews</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="#">Weight Training</a></li>
          <li><a href="#">Cardio Zone</a></li>
          <li><a href="#">Personal Training</a></li>
          <li><a href="#">Group Classes</a></li>
          <li><a href="#">Yoga & Wellness</a></li>
          <li><a href="#">Nutrition Coaching</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">32-33, Sector-D</a></li>
          <li><a href="#">Hasanji Nagar, Silicon Indore</a></li>
          <li><a href="#">Rau — 453331, MP</a></li>
          <li><a href="#" style="margin-top:0.5rem;display:block;">Mon–Sat: 6AM – 10PM</a></li>
          <li><a href="#">Sunday: 8AM – 2PM</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 The Club Multiple, Silicon Indore. All rights reserved.</p>
      <p>Crafted for a stronger Indore 💪</p>
    </div>
  </div>
</footer>`;
}

// ── Inject nav + footer ───────────────────────────────────────
function initPage(activePage) {
  const navEl = document.getElementById('nav-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.outerHTML = buildNav(activePage);
  if (footEl) footEl.outerHTML = buildFooter();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Mobile nav ────────────────────────────────────────────────
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileNav').classList.contains('open') ? 'hidden' : '';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Modal helpers ─────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// ── Date formatter ────────────────────────────────────────────
function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
}

// ── Send confirmation emails via server ───────────────────────
async function sendConfirmationEmails(data) {
  try {
    await fetch('/api/send-confirmation', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(data),
    });
  } catch(e) { console.warn('Email send failed:', e); }
}
