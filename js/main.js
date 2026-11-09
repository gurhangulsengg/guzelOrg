/* ============================================
   Güzel Organizasyon - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = '';
  initLuxuryAmpersand();
  initNavbar();
  initScrollReveal();
  initParticles();
  initHero3DCanvas();
  init3DCardTilts();
  initLightbox();
  initContactForm();
  initMobileDropdowns();
  initFAQ();
  initCurrentYear();
  initQuoteWizard();
  initHashScroll();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownLinks = document.querySelectorAll('.nav-dropdown a');

  // Scroll behavior
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  const updateToggleAria = () => {
    if (navToggle) {
      const isOpen = navMenu ? navMenu.classList.contains('open') : false;
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  };

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      navBackdrop.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
      updateToggleAria();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      navBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      updateToggleAria();
    });
  }

  // Close mobile menu on regular link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Don't close if it's the toggle trigger for dropdown
      if (link.parentElement && link.parentElement.classList.contains('nav-item')) {
        return;
      }
      if (window.innerWidth <= 768 && navToggle) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        updateToggleAria();
      }
    });
  });

  // Close mobile menu on dropdown item click
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navToggle) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        updateToggleAria();
      }
    });
  });
}

/* ---------- Mobile Dropdowns ---------- */
function initMobileDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-item');

  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');

    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------- Hero Particles ---------- */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (3 + Math.random() * 3) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  // Only gallery items and explicit triggers open lightbox - NOT linked service cards
  const clickableItems = document.querySelectorAll('.gallery-item, .product-image, .lightbox-trigger');

  clickableItems.forEach(item => {
    if (item.closest('a') && !item.classList.contains('lightbox-trigger')) return;

    item.style.cursor = 'zoom-in';
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = item.tagName === 'IMG' ? item : item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Organizasyon Görseli';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Build WhatsApp message
    let message = `Merhaba! 👋\n\n`;
    message += `📋 *İletişim Formu*\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `👤 Ad Soyad: ${data.name}\n`;
    message += `📱 Telefon: ${data.phone}\n`;
    if (data.email) message += `📧 E-posta: ${data.email}\n`;
    if (data.service) message += `🎯 Hizmet: ${data.service}\n`;
    if (data.date) message += `📅 Tarih: ${data.date}\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    if (data.message) message += `💬 Mesaj: ${data.message}\n`;

    const encoded = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/905363279565?text=${encoded}`;

    window.open(whatsappURL, '_blank');

    // Show success message
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✓ Mesaj WhatsApp\'a Yönlendirildi!';
    submitBtn.style.background = '#25D366';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/* ---------- Quote Wizard (Hızlı Teklif Sihirbazı) ---------- */
function initQuoteWizard() {
  const wizard = document.getElementById('quote-wizard');
  if (!wizard) return;

  let selectedService = 'Düğün Organizasyonu';
  let selectedLocation = 'Görele';

  const serviceBtns = document.querySelectorAll('#wizardServiceOptions .wizard-option-btn');
  const locationBtns = document.querySelectorAll('#wizardLocationOptions .wizard-option-btn');
  const submitBtn = document.getElementById('wizardSubmitBtn');

  const updateWhatsAppLink = () => {
    if (!submitBtn) return;
    const msg = `Merhaba, ${selectedLocation} için ${selectedService} hakkında müsaitlik ve fiyat bilgisi almak istiyorum.`;
    const url = `https://wa.me/905363279565?text=${encodeURIComponent(msg)}`;
    submitBtn.href = url;
  };

  serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedService = btn.dataset.value || btn.textContent.trim();
      updateWhatsAppLink();
    });
  });

  locationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      locationBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLocation = btn.dataset.value || btn.textContent.trim();
      updateWhatsAppLink();
    });
  });

  updateWhatsAppLink();
}

/* ---------- Smooth Counter Animation ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.ceil(current) + suffix;
      }
    }, 30);
  });
}

// Observe counters for animation
const statSection = document.querySelector('.about-stats');
if (statSection) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statObserver.observe(statSection);
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/* ---------- Dynamic Copyright Year ---------- */
function initCurrentYear() {
  const currentYear = new Date().getFullYear();
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}

/* ==========================================================================
   3D WEB & FRAMER-STYLE PHYSICS INTEGRATION (.skills)
   ========================================================================== */

/* ---------- 1. Interactive 3D Dual Gold Rings & Spatial Universe ---------- */
function initHero3DCanvas() {
  const canvas = document.getElementById('hero3dCanvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = (canvas.width = heroSection.clientWidth);
  let height = (canvas.height = heroSection.clientHeight);

  let cameraRotX = 0;
  let cameraRotY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let isVisible = true;
  let animFrameId = null;
  let time = 0;

  // Orbiting Golden Sparkles & Diamond Crosses
  const PARTICLE_COUNT = 45;
  const particles = [];
  const goldColors = [
    'rgba(201, 169, 110, ', // Gold
    'rgba(228, 213, 167, ', // Gold Light
    'rgba(255, 255, 255, ', // Starlight
    'rgba(212, 165, 165, '  // Rose Champagne
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 320 + 80;
    particles.push({
      x: Math.cos(angle) * dist,
      y: (Math.random() - 0.5) * 300,
      z: Math.sin(angle) * dist,
      angle: angle,
      speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      dist: dist,
      radius: Math.random() * 2.5 + 1.2,
      isDiamond: i % 4 === 0,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      alpha: Math.random() * 0.5 + 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
  }

  const handleResize = () => {
    if (!heroSection) return;
    width = canvas.width = heroSection.clientWidth;
    height = canvas.height = heroSection.clientHeight;
  };
  window.addEventListener('resize', handleResize, { passive: true });

  // Spring cursor interaction with lerp inertia
  const handlePointerMove = (e) => {
    const rect = heroSection.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetRotY = nx * 0.45;
    targetRotX = -ny * 0.35;
  };

  const handlePointerLeave = () => {
    targetRotX = 0;
    targetRotY = 0;
  };

  heroSection.addEventListener('pointermove', handlePointerMove, { passive: true });
  heroSection.addEventListener('pointerleave', handlePointerLeave, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animFrameId && !prefersReduced) {
        render();
      }
    });
  }, { threshold: 0.05 });
  observer.observe(heroSection);

  // 3D Torus Quad Generator (Mathematical Mesh)
  function generateTorusPolygons(R, r, uSteps, vSteps, offsetX, offsetY, offsetZ, baseRotZ, baseRotX) {
    const quads = [];
    const cosZ = Math.cos(baseRotZ), sinZ = Math.sin(baseRotZ);
    const cosX = Math.cos(baseRotX), sinX = Math.sin(baseRotX);

    for (let i = 0; i < uSteps; i++) {
      const u1 = (i / uSteps) * Math.PI * 2;
      const u2 = ((i + 1) / uSteps) * Math.PI * 2;

      for (let j = 0; j < vSteps; j++) {
        const v1 = (j / vSteps) * Math.PI * 2;
        const v2 = ((j + 1) / vSteps) * Math.PI * 2;

        const getPt = (u, v) => {
          let x = (R + r * Math.cos(v)) * Math.cos(u);
          let y = (R + r * Math.cos(v)) * Math.sin(u);
          let z = r * Math.sin(v);

          // Local ring tilt (Z then X)
          let xz = x * cosZ - y * sinZ;
          let yz = x * sinZ + y * cosZ;
          x = xz; y = yz;

          let yx = y * cosX - z * sinX;
          let zx = y * sinX + z * cosX;
          y = yx; z = zx;

          // Normal vector for lighting
          let nx = Math.cos(v) * Math.cos(u);
          let ny = Math.cos(v) * Math.sin(u);
          let nz = Math.sin(v);

          let nxz = nx * cosZ - ny * sinZ;
          let nyz = nx * sinZ + ny * cosZ;
          nx = nxz; ny = nyz;

          let nyx = ny * cosX - nz * sinX;
          let nzx = ny * sinX + nz * cosX;
          ny = nyx; nz = nzx;

          return { x: x + offsetX, y: y + offsetY, z: z + offsetZ, nx, ny, nz };
        };

        const p1 = getPt(u1, v1);
        const p2 = getPt(u2, v1);
        const p3 = getPt(u2, v2);
        const p4 = getPt(u1, v2);

        quads.push([p1, p2, p3, p4]);
      }
    }
    return quads;
  }

  // Dual Interlocking Wedding Rings (Gelin & Damat Alyansları)
  const ringScale = Math.min(width, height) < 768 ? 95 : 135;
  const tubeRadius = ringScale * 0.12;
  const uSteps = 24;
  const vSteps = 8;

  const ring1 = generateTorusPolygons(ringScale, tubeRadius, uSteps, vSteps, -ringScale * 0.38, 0, 0, 0.45, 0.35);
  const ring2 = generateTorusPolygons(ringScale, tubeRadius, uSteps, vSteps, ringScale * 0.38, 0, 0, -0.45, -0.35);
  const allQuads = ring1.concat(ring2);

  function render() {
    if (!isVisible) {
      animFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);
    time += 0.012;

    // Framer spring inertia lerp
    cameraRotX += (targetRotX - cameraRotX) * 0.045;
    cameraRotY += (targetRotY - cameraRotY) * 0.045;

    // Idle floating & rotation
    const curRotY = time * 0.45 + cameraRotY;
    const curRotX = Math.sin(time * 0.35) * 0.18 + cameraRotX;
    const floatY = Math.sin(time * 0.8) * 12;

    const cosY = Math.cos(curRotY), sinY = Math.sin(curRotY);
    const cosX = Math.cos(curRotX), sinX = Math.sin(curRotX);

    const cx = width / 2;
    const cy = height * 0.42 + floatY;
    const focalLength = 550;

    // Project and render Torus Quads with Painter's Algorithm
    const renderedQuads = [];

    // Light source vector (normalized upper-right-front)
    const lx = 0.577, ly = -0.577, lz = -0.577;

    for (let k = 0; k < allQuads.length; k++) {
      const q = allQuads[k];
      let avgZ = 0;
      const pts = [];

      for (let m = 0; m < 4; m++) {
        const p = q[m];

        // Apply world Y rotation
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;
        let y1 = p.y;

        // Apply world X rotation
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        // Normal rotation
        let nx1 = p.nx * cosY + p.nz * sinY;
        let nz1 = -p.nx * sinY + p.nz * cosY;
        let ny1 = p.ny;
        let ny2 = ny1 * cosX - nz1 * sinX;
        let nz2 = ny1 * sinX + nz1 * cosX;
        let nx2 = nx1;

        avgZ += z2;

        const relZ = z2 + 650;
        const scale = focalLength / relZ;
        const sx = cx + x2 * scale;
        const sy = cy + y2 * scale;

        pts.push({ sx, sy, nx: nx2, ny: ny2, nz: nz2 });
      }

      avgZ /= 4;

      const midN = pts[0];
      const dot = midN.nx * lx + midN.ny * ly + midN.nz * lz;
      const light = Math.max(0.15, Math.min(1.0, 0.45 + dot * 0.55));

      renderedQuads.push({ pts, avgZ, light });
    }

    // Sort by depth: furthest first
    renderedQuads.sort((a, b) => a.avgZ - b.avgZ);

    // Draw quads with metallic gold specular shading
    for (let k = 0; k < renderedQuads.length; k++) {
      const rq = renderedQuads[k];
      const pts = rq.pts;

      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      ctx.lineTo(pts[1].sx, pts[1].sy);
      ctx.lineTo(pts[2].sx, pts[2].sy);
      ctx.lineTo(pts[3].sx, pts[3].sy);
      ctx.closePath();

      const rVal = Math.round(180 + rq.light * 75);
      const gVal = Math.round(140 + rq.light * 80);
      const bVal = Math.round(80 + rq.light * 80);
      const alpha = (0.2 + rq.light * 0.35) * 0.75;

      ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
      ctx.fill();

      ctx.strokeStyle = `rgba(228, 213, 167, ${0.1 + rq.light * 0.25})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
    }

    // Render Orbiting Gold Sparkles & Diamonds around Rings
    for (let i = 0; i < particles.length; i++) {
      const sp = particles[i];

      if (!prefersReduced) {
        sp.angle += sp.speed;
        sp.x = Math.cos(sp.angle) * sp.dist;
        sp.z = Math.sin(sp.angle) * sp.dist;
        sp.y += sp.vy;
        if (sp.y > 180) sp.y = -180;
        if (sp.y < -180) sp.y = 180;
      }

      let x1 = sp.x * cosY + sp.z * sinY;
      let z1 = -sp.x * sinY + sp.z * cosY;
      let y1 = sp.y;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      const relZ = z2 + 650;
      if (relZ <= 50) continue;

      const scale = focalLength / relZ;
      const sx = cx + x1 * scale;
      const sy = cy + y2 * scale;
      const sRadius = Math.max(0.8, sp.radius * scale);
      const sparkAlpha = Math.max(0.1, Math.min(0.9, sp.alpha * scale * 1.2));

      if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
        if (sp.isDiamond) {
          ctx.beginPath();
          ctx.moveTo(sx, sy - sRadius * 2.5);
          ctx.lineTo(sx + sRadius * 0.8, sy);
          ctx.lineTo(sx, sy + sRadius * 2.5);
          ctx.lineTo(sx - sRadius * 0.8, sy);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 245, 210, ${sparkAlpha})`;
          ctx.shadowColor = 'rgba(201, 169, 110, 0.7)';
          ctx.shadowBlur = sRadius * 3;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
          ctx.fillStyle = sp.color + sparkAlpha + ')';
          ctx.shadowColor = 'rgba(201, 169, 110, 0.5)';
          ctx.shadowBlur = sRadius * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    if (!prefersReduced) {
      animFrameId = requestAnimationFrame(render);
    }
  }

  render();
}

/* ---------- 2. Tier 1: Framer-Style 3D Perspective Tilt with Specular Glare ---------- */
function init3DCardTilts() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltTargets = document.querySelectorAll(
    '.service-card, .process-card, .why-us-card, .quote-wizard-section .wizard-container'
  );

  tiltTargets.forEach(card => {
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.classList.add('tilt-glare');
      card.appendChild(glare);
    }

    let isHovering = false;

    const onPointerEnter = () => {
      isHovering = true;
      glare.style.opacity = '1';
    };

    const onPointerMove = (e) => {
      if (!isHovering) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xNorm = (x / rect.width - 0.5) * 2;
      const yNorm = (y / rect.height - 0.5) * 2;

      const rotateX = (-yNorm * 7).toFixed(2);
      const rotateY = (xNorm * 7).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      const glareX = ((x / rect.width) * 100).toFixed(1);
      const glareY = ((y / rect.height) * 100).toFixed(1);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`;

      // Set CSS variables for Framer spotlight
      card.style.setProperty('--mouse-x', `${glareX}%`);
      card.style.setProperty('--mouse-y', `${glareY}%`);
    };

    const onPointerLeave = () => {
      isHovering = false;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    };

    card.addEventListener('pointerenter', onPointerEnter);
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave);
  });
}

/* ---------- Global Normal Ampersand Formatter ---------- */
function initLuxuryAmpersand() {
  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue && node.nodeValue.includes('&')) {
        const parts = node.nodeValue.split('&');
        const frag = document.createDocumentFragment();
        parts.forEach((part, idx) => {
          if (part) frag.appendChild(document.createTextNode(part));
          if (idx < parts.length - 1) {
            const ampSpan = document.createElement('span');
            ampSpan.className = 'amp';
            ampSpan.textContent = '&';
            frag.appendChild(ampSpan);
          }
        });
        node.parentNode.replaceChild(frag, node);
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !node.classList.contains('amp') &&
      node.tagName !== 'SCRIPT' &&
      node.tagName !== 'STYLE' &&
      node.tagName !== 'SVG' &&
      node.tagName !== 'NOSCRIPT'
    ) {
      Array.from(node.childNodes).forEach(processNode);
    }
  };

  if (document.body && !document.body.dataset.ampApplied) {
    document.body.dataset.ampApplied = 'true';
    Array.from(document.body.childNodes).forEach(processNode);
  }
}

/* ---------- Smooth Hash Scroll & Target Reveal ---------- */
function initHashScroll() {
  const handleHash = () => {
    if (!window.location.hash) return;
    try {
      const target = document.querySelector(window.location.hash);
      if (target) {
        document.body.style.overflow = '';
        target.classList.add('visible');
        const children = target.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        children.forEach(c => c.classList.add('visible'));
      }
    } catch (e) {
      // ignore
    }
  };

  if (document.readyState === 'complete') {
    handleHash();
  } else {
    window.addEventListener('load', handleHash);
  }

  window.addEventListener('hashchange', () => {
    document.body.style.overflow = '';
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
    handleHash();
  });

  window.addEventListener('pageshow', () => {
    document.body.style.overflow = '';
  });
}






