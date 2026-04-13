// ── New Logo — Flame + TCM lettermark ────────────────────────
// Trendy, youth-oriented: bold sans lettermark inside a sharp
// angled shield/badge shape, with a dynamic flame accent.
const LOGO_SVG = `<svg class="nav-logo-mark" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Shield base -->
  <path d="M22 2L38 9V25C38 33.5 30 40 22 43C14 40 6 33.5 6 25V9L22 2Z" fill="url(#lg)" opacity="0.15"/>
  <path d="M22 2L38 9V25C38 33.5 30 40 22 43C14 40 6 33.5 6 25V9L22 2Z" fill="none" stroke="url(#lg)" stroke-width="1.4"/>
  <!-- TCM lettermark -->
  <text x="22" y="26" text-anchor="middle" font-family="'Anton',sans-serif" font-size="13" font-weight="700" fill="#FF6B35" letter-spacing="0.5">TCM</text>
  <!-- Flame spark top -->
  <path d="M22 4C22 4 25 8 22 11C22 11 26 9 24 6C24 6 27 11 22 14C22 14 18 11 20 7C20 7 17 11 22 14" fill="#FF8C00" opacity="0.7"/>
  <defs>
    <linearGradient id="lg" x1="6" y1="2" x2="38" y2="43" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF4500"/>
      <stop offset="100%" stop-color="#FF8C00"/>
    </linearGradient>
  </defs>
</svg>`;

const LOGO_HTML = (href='/index.html') => `
<a href="${href}" class="nav-logo">
  ${LOGO_SVG}
  <div class="nav-logo-text">
    <span class="nav-logo-top">The Club</span>
    <span class="nav-logo-bottom">MULTIPLE</span>
  </div>
</a>`;

// ── Nav ───────────────────────────────────────────────────────
function buildNav(active) {
  const links = [
    ['/index.html',      'Home'],
    ['/about.html',      'About'],
    ['/membership.html', 'Membership'],
    ['/gallery.html',    'Gallery'],
    ['/reviews.html',    'Reviews'],
    ['/contact.html',    'Contact'],
  ];
  return `
<nav id="navbar">
  ${LOGO_HTML()}
  <div class="nav-links">
    ${links.map(([h,l])=>`<a href="${h}"${l.toLowerCase()===active?' class="active"':''}>${l}</a>`).join('')}
    <a href="/membership.html" class="nav-cta">Join Now</a>
  </div>
  <button class="hamburger" id="hamburger" onclick="toggleMobileNav()">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-nav" id="mobileNav">
  ${links.map(([h,l])=>`<a href="${h}" onclick="closeMobileNav()">${l}</a>`).join('')}
  <a href="/membership.html" style="color:var(--orange)!important;font-size:2.2rem;" onclick="closeMobileNav()">Join Now →</a>
</div>`;
}

// ── Footer ────────────────────────────────────────────────────
function buildFooter() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        ${LOGO_HTML()}
        <p>Silicon Indore's premier fitness destination. Built for people who are serious about results. Train hard, recover smart, repeat.</p>
        <div class="social-links" style="margin-top:1.1rem;">
          <a href="https://instagram.com/theclubmultiple" target="_blank" rel="noopener" class="social-btn" title="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="social-btn" title="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="social-btn" title="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener" class="social-btn" title="WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
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
        <h4>Visit Us</h4>
        <ul>
          <li><a href="#">32-33, Sector-D</a></li>
          <li><a href="#">Hasanji Nagar</a></li>
          <li><a href="#">Silicon Indore, Rau 453331</a></li>
          <li><a href="#" style="margin-top:0.4rem;display:block;">Mon–Sat: 6AM–10PM</a></li>
          <li><a href="#">Sunday: 8AM–2PM</a></li>
          <li><a href="https://instagram.com/theclubmultiple" target="_blank" style="color:var(--orange);">@theclubmultiple</a></li>
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

// ── Init page ─────────────────────────────────────────────────
function initPage(active) {
  const nav  = document.getElementById('nav-placeholder');
  const foot = document.getElementById('footer-placeholder');
  if (nav)  nav.outerHTML  = buildNav(active);
  if (foot) foot.outerHTML = buildFooter();

  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 55);
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
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

// ── Modal ─────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

// ── Date utils ────────────────────────────────────────────────
function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
}

// ── API helpers ───────────────────────────────────────────────
async function apiPost(url, data) {
  const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  return r.json();
}

// ── Razorpay payment flow ─────────────────────────────────────
// planAmounts: { monthly:120000, quarterly:300000, annual:960000 } (in paise)
async function startRazorpayPayment({ amount, planName, planKey, months, name, email, phone, goal }) {
  // 1. Create order on server
  let orderData;
  try {
    orderData = await apiPost('/api/create-order', { amount, planKey, name });
  } catch(e) {
    throw new Error('Could not connect to payment server. Please try again.');
  }
  if (orderData.error) throw new Error(orderData.error);

  return new Promise((resolve, reject) => {
    const options = {
      key:         orderData.keyId,
      amount:      orderData.amount,
      currency:    orderData.currency,
      name:        'The Club Multiple',
      description: planName,
      order_id:    orderData.orderId,
      prefill:     { name, email, contact: phone },
      theme:       { color: '#FF4500' },
      modal:       { ondismiss: () => reject(new Error('Payment cancelled')) },
      handler: async (response) => {
        // 2. Verify + save member
        try {
          const result = await apiPost('/api/confirm-payment', {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
            memberData: {
              name, email, phone, goal,
              planName, planKey, months,
              amount: '₹' + (amount/100).toLocaleString('en-IN'),
              amountPaise: amount,
              paymentMode: 'Razorpay (Online)',
            },
          });
          if (result.success) resolve(result);
          else reject(new Error(result.error || 'Verification failed'));
        } catch(e) { reject(e); }
      },
    };
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded. Check internet connection.'));
      return;
    }
    new window.Razorpay(options).open();
  });
}

// ── UPI / Walk-in flow ────────────────────────────────────────
async function sendConfirmationEmails(data) {
  try {
    return await apiPost('/api/send-confirmation', data);
  } catch(e) {
    console.warn('Confirmation email failed:', e);
    return { success: true };   // Don't block UX if email fails
  }
}
