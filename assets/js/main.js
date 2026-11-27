/* ==========================================================================
   XAVRON PORTFOLIO — REDESIGNED MAIN APPLICATION SCRIPT
   Handles shared chrome, interactive studio switcher, Meta Ads funnel UI,
   browser-framed showcases, motion, and Formspree submission.
   ========================================================================== */

(function () {
  'use strict';

  const cfg = window.PORTFOLIO_CONFIG || {};
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. UTILITIES & ICONS
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isTodoValue(val) {
    if (!val || typeof val !== 'string') return true;
    return val.trim().toUpperCase().startsWith('TODO');
  }

  function normalizePath(pathname) {
    const clean = (pathname || '/').replace(/\/index\.html$/i, '').replace(/\/+$/, '');
    return clean === '' ? '/' : clean;
  }

  function isActiveRoute(linkHref) {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(linkHref);
    if (target === '/') return current === '/';
    return current === target || current.startsWith(target + '/');
  }

  function formatDomainLabel(urlStr) {
    try {
      const u = new URL(urlStr);
      const path = u.pathname && u.pathname !== '/' ? u.pathname.replace(/\/+$/, '') : '';
      return u.hostname + path;
    } catch (_) {
      return urlStr || 'live-app';
    }
  }

  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._hideTimer);
    toast._hideTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function createBrandMarkSvg() {
    return (
      '<span class="brand-mark" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 64 64" fill="none">' +
      '<path d="M16 16L32 31L48 16" stroke="#f4f4f6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M16 48L32 33L48 48" stroke="#8ab4f8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
      '</span>'
    );
  }

  function getIconSvg(kind) {
    const icons = {
      layout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="10" x2="9" y2="20"/></svg>',
      layers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      tool: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      target: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
      users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      pulse: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      bolt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    };
    return `<span class="icon-badge" aria-hidden="true">${icons[kind] || icons.layers}</span>`;
  }

  /* ------------------------------------------------------------------------
     2. SHARED HEADER, MOBILE MENU & FOOTER INJECTION
     ------------------------------------------------------------------------ */
  function renderHeaderAndMobileMenu() {
    const header = document.getElementById('site-header');
    const mobileRoot = document.getElementById('mobile-menu-root');
    const brand = escapeHtml(cfg.brand || 'XAVRON');
    const navLinks = Array.isArray(cfg.navLinks)
      ? cfg.navLinks
      : [
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'Services', href: '/services' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' }
        ];

    if (header) {
      const navHtml = navLinks
        .map((item) => {
          const activeClass = isActiveRoute(item.href) ? ' is-active' : '';
          const ariaCurr = isActiveRoute(item.href) ? ' aria-current="page"' : '';
          return `<a href="${escapeHtml(item.href)}" class="nav-link${activeClass}"${ariaCurr}>${escapeHtml(item.label)}</a>`;
        })
        .join('');

      header.innerHTML = `
        <div class="container header-inner">
          <a href="/" class="brand-logo" aria-label="${brand} Home">
            ${createBrandMarkSvg()}
            <span>${brand}</span>
          </a>
          <nav class="desktop-nav" aria-label="Primary navigation">
            ${navHtml}
          </nav>
          <div class="header-actions">
            <a href="/contact" class="btn btn--primary btn--sm header-hire-btn">Hire me</a>
            <button
              type="button"
              id="menu-toggle"
              class="menu-toggle"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <span class="menu-toggle-lines" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      `;
    }

    if (mobileRoot) {
      const mobileLinksHtml = navLinks
        .map((item, idx) => {
          const activeClass = isActiveRoute(item.href) ? ' is-active' : '';
          const ariaCurr = isActiveRoute(item.href) ? ' aria-current="page"' : '';
          const num = String(idx + 1).padStart(2, '0');
          return `
            <li>
              <a href="${escapeHtml(item.href)}" class="mobile-menu-link${activeClass}"${ariaCurr}>
                <span>${escapeHtml(item.label)}</span>
                <span class="mobile-menu-num">${num}</span>
              </a>
            </li>
          `;
        })
        .join('');

      const availLabel = escapeHtml(cfg.availability?.shortLabel || 'Available for freelance');
      const locShort = escapeHtml(cfg.locationShort || 'Kolkata, IN');

      mobileRoot.innerHTML = `
        <div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden="true">
          <ul class="mobile-menu-list">
            ${mobileLinksHtml}
          </ul>
          <div class="mobile-menu-footer">
            <a href="/contact" class="btn btn--primary" style="width: 100%;">Hire me</a>
            <div class="hero-meta-row">
              <span class="status-pill">
                <span class="status-dot" aria-hidden="true"></span>
                <span>${availLabel}</span>
              </span>
              <span class="mono-label">${locShort} · <span data-kolkata-time>IST</span></span>
            </div>
          </div>
        </div>
      `;
    }

    bindMobileMenuEvents();
  }

  function bindMobileMenuEvents() {
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!toggleBtn || !mobileMenu) return;

    const setMenuOpen = (open) => {
      toggleBtn.setAttribute('aria-expanded', String(open));
      toggleBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        const firstLink = mobileMenu.querySelector('.mobile-menu-link');
        if (firstLink) firstLink.focus();
      } else {
        toggleBtn.focus();
      }
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      setMenuOpen(!isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.style.overflow = '';
        mobileMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenuOpen(false);
      }
    });
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const brand = escapeHtml(cfg.brand || 'XAVRON');
    const credit = escapeHtml(cfg.footer?.credit || 'Designed & built by XAVRON');
    const year = new Date().getFullYear();
    const contact = cfg.contact || {};

    const socialLinks = [];
    if (contact.githubPersonal && !isTodoValue(contact.githubPersonal)) {
      socialLinks.push({ label: 'GitHub', href: contact.githubPersonal });
    }
    if (contact.githubOrg && !isTodoValue(contact.githubOrg)) {
      socialLinks.push({ label: 'stackotools', href: contact.githubOrg });
    }
    if (contact.telegram && !isTodoValue(contact.telegram)) {
      socialLinks.push({ label: 'Telegram', href: contact.telegram });
    }
    if (contact.instagram && !isTodoValue(contact.instagram)) {
      socialLinks.push({ label: 'Instagram', href: contact.instagram });
    }
    if (contact.email && !isTodoValue(contact.email)) {
      socialLinks.push({ label: 'Email', href: `mailto:${contact.email}` });
    }

    const socialsHtml = socialLinks
      .map(
        (s) =>
          `<a href="${escapeHtml(s.href)}" class="footer-link" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a>`
      )
      .join('');

    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-top">
          <div>
            <a href="/" class="brand-logo" aria-label="${brand} Home">
              ${createBrandMarkSvg()}
              <span>${brand}</span>
            </a>
          </div>
          <nav class="footer-links" aria-label="Footer links">
            <a href="/projects" class="footer-link">Projects</a>
            <a href="/services" class="footer-link">Services</a>
            <a href="/about" class="footer-link">About</a>
            <a href="/contact" class="footer-link">Contact</a>
            ${socialsHtml}
          </nav>
        </div>
        <div class="footer-bottom">
          <p class="footer-credit">${credit} · &copy; ${year} ${brand} (${escapeHtml(cfg.ownerName || 'Dilkash')})</p>
          <button type="button" id="back-to-top" class="btn btn--secondary btn--sm">
            Back to top ↑
          </button>
        </div>
      </div>
    `;

    const backTopBtn = document.getElementById('back-to-top');
    if (backTopBtn) {
      backTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. CHROME EFFECTS: SCROLL PROGRESS, HEADER BLUR & KOLKATA CLOCK
     ------------------------------------------------------------------------ */
  function initChromeEffects() {
    const header = document.getElementById('site-header');
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    if (!document.querySelector('.film-grain')) {
      const grain = document.createElement('div');
      grain.className = 'film-grain';
      grain.setAttribute('aria-hidden', 'true');
      document.body.appendChild(grain);
    }

    let ticking = false;
    const updateOnScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (header) {
        header.classList.toggle('is-scrolled', y > 16);
      }
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };

    updateOnScroll();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  function updateKolkataTime() {
    const targets = document.querySelectorAll('[data-kolkata-time]');
    if (!targets.length) return;
    let formatted = 'IST';
    try {
      formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: cfg.timezone || 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
    } catch (_) {
      formatted = 'IST';
    }
    targets.forEach((el) => {
      el.textContent = `${formatted} IST`;
    });
  }

  /* ------------------------------------------------------------------------
     4. INTERACTIVE HERO STUDIO PANEL & VISUAL META ADS SHOWCASE
     ------------------------------------------------------------------------ */
  function hydrateHeroStudioCard() {
    const card = document.querySelector('[data-hero-studio]');
    const tabs = cfg.hero?.studioTabs;
    if (!card || !Array.isArray(tabs) || !tabs.length) return;

    const tabsEl = card.querySelector('[data-studio-tabs]');
    const bodyEl = card.querySelector('[data-studio-body]');
    if (!tabsEl || !bodyEl) return;

    let activeId = tabs[0].id;

    const renderBody = (tab) => {
      const specsHtml = (tab.specs || [])
        .map(
          (s) =>
            `<div class="studio-spec-row"><span>${escapeHtml(s.k)}</span><span>${escapeHtml(s.v)}</span></div>`
        )
        .join('');

      bodyEl.innerHTML = `
        <div class="studio-panel-animate" style="display:flex; flex-direction:column; gap:0.85rem;">
          <div class="project-meta">
            <span class="mono-label mono-label--accent">${escapeHtml(tab.badge)}</span>
          </div>
          <h2 class="card-h3">${escapeHtml(tab.title)}</h2>
          <p class="project-desc" style="font-size:0.9rem;">${escapeHtml(tab.summary)}</p>
          <div class="studio-spec-list">${specsHtml}</div>
          <div>
            <a href="${escapeHtml(tab.ctaHref)}" class="link-slide">${escapeHtml(tab.ctaLabel)}</a>
          </div>
        </div>
      `;
    };

    const renderTabs = () => {
      tabsEl.innerHTML = tabs
        .map(
          (t) => `
          <button
            type="button"
            class="tab-btn${t.id === activeId ? ' is-active' : ''}"
            data-studio-tab="${escapeHtml(t.id)}"
            aria-pressed="${t.id === activeId ? 'true' : 'false'}"
          >
            ${escapeHtml(t.tabLabel)}
          </button>
        `
        )
        .join('');

      tabsEl.querySelectorAll('[data-studio-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeId = btn.getAttribute('data-studio-tab');
          const next = tabs.find((t) => t.id === activeId) || tabs[0];
          renderTabs();
          renderBody(next);
        });
      });
    };

    renderTabs();
    renderBody(tabs[0]);
  }

  function hydrateMetaAdsSection() {
    const m = cfg.metaAds;
    if (!m) return;

    const introEl = document.querySelector('[data-meta-ads-intro]');
    if (introEl && m.intro) introEl.textContent = m.intro;

    // 2-column visual showcase on Home
    const showcaseEl = document.querySelector('[data-meta-showcase]');
    if (showcaseEl) {
      const modes = Array.isArray(m.funnelModes) ? m.funnelModes : [];
      const pillarIcons = ['target', 'users', 'pulse', 'layout'];
      const pillarsHtml = (m.pillars || [])
        .map(
          (item, idx) => `
          <article class="surface-card pillar-row" data-reveal>
            ${getIconSvg(pillarIcons[idx % pillarIcons.length])}
            <div style="min-width:0;">
              <div class="mono-label mono-label--accent" style="margin-bottom:0.25rem;">${escapeHtml(item.number)}</div>
              <h3 class="card-h3" style="margin-bottom:0.3rem;">${escapeHtml(item.title)}</h3>
              <p class="project-desc" style="font-size:0.9rem;">${escapeHtml(item.desc)}</p>
            </div>
          </article>
        `
        )
        .join('');

      showcaseEl.innerHTML = `
        <div class="card-featured meta-visual-card" data-reveal>
          <div class="project-frame">
            <div class="browser-chrome">
              <span class="browser-dots" aria-hidden="true"><span></span><span></span><span></span></span>
              <span class="browser-url">meta-ads · pixel → landing-page</span>
            </div>
            <div class="project-media">
              <img
                src="${escapeHtml(m.image || '/assets/img/meta-ads-showcase.webp')}"
                alt="${escapeHtml(m.imageAlt || 'Meta Ads campaign funnel diagram')}"
                width="${Number(m.imageWidth) || 1008}"
                height="${Number(m.imageHeight) || 630}"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div class="meta-funnel-box">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
              <span class="mono-label mono-label--accent">Interactive Funnel Blueprint</span>
              <span class="mono-label">Select Objective</span>
            </div>
            <div class="tab-strip" data-meta-tabs></div>
            <div data-meta-funnel-body></div>
          </div>
        </div>

        <div class="meta-pillars-col">
          ${pillarsHtml}
          <div class="btn-group btn-group--stack-xs" style="margin-top:0.35rem;" data-reveal>
            <a href="/contact" class="btn btn--primary">Launch a Meta Campaign →</a>
            <a href="/services" class="btn btn--secondary">View Full Scope</a>
          </div>
        </div>
      `;

      const tabsContainer = showcaseEl.querySelector('[data-meta-tabs]');
      const funnelBody = showcaseEl.querySelector('[data-meta-funnel-body]');
      if (tabsContainer && funnelBody && modes.length) {
        let activeModeId = modes[0].id;

        const renderFunnelBody = (mode) => {
          funnelBody.innerHTML = `
            <div class="meta-funnel-steps studio-panel-animate">
              <div class="meta-step-tile">
                <span class="mono-label">Objective</span>
                <strong>${escapeHtml(mode.objective)}</strong>
              </div>
              <div class="meta-step-tile">
                <span class="mono-label">Placement</span>
                <strong>${escapeHtml(mode.placement)}</strong>
              </div>
              <div class="meta-step-tile">
                <span class="mono-label">Pixel / Tracking</span>
                <strong>${escapeHtml(mode.tracking)}</strong>
              </div>
              <div class="meta-step-tile">
                <span class="mono-label">Conversion Flow</span>
                <strong>${escapeHtml(mode.flow)}</strong>
              </div>
            </div>
          `;
        };

        const renderModeTabs = () => {
          tabsContainer.innerHTML = modes
            .map(
              (mode) => `
              <button
                type="button"
                class="tab-btn${mode.id === activeModeId ? ' is-active' : ''}"
                data-meta-tab="${escapeHtml(mode.id)}"
                aria-pressed="${mode.id === activeModeId ? 'true' : 'false'}"
              >
                ${escapeHtml(mode.tabLabel)}
              </button>
            `
            )
            .join('');

          tabsContainer.querySelectorAll('[data-meta-tab]').forEach((btn) => {
            btn.addEventListener('click', () => {
              activeModeId = btn.getAttribute('data-meta-tab');
              const found = modes.find((x) => x.id === activeModeId) || modes[0];
              renderModeTabs();
              renderFunnelBody(found);
            });
          });
        };

        renderModeTabs();
        renderFunnelBody(modes[0]);
      }
    }

    // 4-card breakdown on /services
    const pillarsEl = document.querySelector('[data-meta-ads-pillars]');
    if (pillarsEl && Array.isArray(m.pillars)) {
      const pillarIcons = ['target', 'users', 'pulse', 'layout'];
      pillarsEl.innerHTML = m.pillars
        .map(
          (item, idx) => `
          <article class="surface-card service-card" data-reveal>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              ${getIconSvg(pillarIcons[idx % pillarIcons.length])}
              <span class="mono-label mono-label--accent">${escapeHtml(item.number)}</span>
            </div>
            <h3 class="card-h3">${escapeHtml(item.title)}</h3>
            <p class="project-desc">${escapeHtml(item.desc)}</p>
          </article>
        `
        )
        .join('');
    }

    const todoNoteEl = document.querySelector('[data-meta-ads-todo]');
    if (todoNoteEl && m.caseStudyTodoNote) {
      todoNoteEl.textContent = m.caseStudyTodoNote;
    }
  }

  /* ------------------------------------------------------------------------
     5. CONFIG DATA HYDRATION ACROSS PAGES
     ------------------------------------------------------------------------ */
  function renderProjectCardHtml(project, variant) {
    const isHomeFeatured = variant === 'home';
    const isWide = variant === 'wide';
    const cardClass = isHomeFeatured
      ? 'card-featured project-card project-card--featured'
      : isWide
        ? 'card-featured project-card project-card--wide'
        : 'card-featured project-card';

    const tagsHtml = (project.tags || [])
      .map((tag) => `<span class="tech-pill">${escapeHtml(tag)}</span>`)
      .join('');

    const wakeNoteHtml = project.wakeUpNote
      ? `<p class="wake-note">⏱ ${escapeHtml(project.wakeUpNote)}</p>`
      : '';

    const domainLabel = formatDomainLabel(project.liveUrl);

    return `
      <article class="${cardClass}" data-reveal>
        <div class="project-frame">
          <div class="browser-chrome">
            <span class="browser-dots" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="browser-url">${escapeHtml(domainLabel)}</span>
          </div>
          <a href="${escapeHtml(project.caseStudyUrl)}" class="project-media" aria-label="Read ${escapeHtml(project.title)} case study">
            <img
              src="${escapeHtml(project.image)}"
              alt="${escapeHtml(project.imageAlt)}"
              width="${Number(project.imageWidth) || 1008}"
              height="${Number(project.imageHeight) || 630}"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        <div class="project-body">
          <div class="project-meta">
            <span class="mono-label mono-label--accent">${escapeHtml(project.number)} / 03</span>
            <span class="mono-label">${escapeHtml(project.subtitle)}</span>
          </div>
          <h3 class="card-h3">${escapeHtml(project.title)}</h3>
          <p class="project-desc">${escapeHtml(project.oneLiner)}</p>
          <div class="pill-list" aria-label="Technologies used">${tagsHtml}</div>
          <div>
            <div class="project-actions">
              <a href="${escapeHtml(project.liveUrl)}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">
                Live Demo ↗
              </a>
              <a href="${escapeHtml(project.repoUrl)}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">
                Source Code
              </a>
              <a href="${escapeHtml(project.caseStudyUrl)}" class="link-slide">
                Case Study →
              </a>
            </div>
            ${wakeNoteHtml}
          </div>
        </div>
      </article>
    `;
  }

  function hydrateHomePage() {
    const greetingEl = document.querySelector('[data-hero-greeting]');
    if (greetingEl && cfg.hero?.greeting) greetingEl.textContent = cfg.hero.greeting;

    const taglineEl = document.querySelector('[data-hero-tagline]');
    if (taglineEl && cfg.hero?.tagline) {
      taglineEl.innerHTML = `<span class="hero-line-mask"><span class="hero-line">${escapeHtml(cfg.hero.tagline)}</span></span>`;
    }

    const supportEl = document.querySelector('[data-hero-support]');
    if (supportEl && cfg.hero?.supportingLine) supportEl.textContent = cfg.hero.supportingLine;

    const availEl = document.querySelector('[data-availability-short]');
    if (availEl && cfg.availability?.shortLabel) availEl.textContent = cfg.availability.shortLabel;

    const statsEl = document.querySelector('[data-stats-grid]');
    if (statsEl && Array.isArray(cfg.stats)) {
      statsEl.innerHTML = cfg.stats
        .map((s) => {
          const isNum = typeof s.value === 'number' && Number.isFinite(s.value);
          const valueHtml = isNum
            ? `<span data-count-target="${s.value}" data-count-suffix="${escapeHtml(s.suffix || '')}">${s.value}${escapeHtml(s.suffix || '')}</span>`
            : `<span class="todo-badge">${escapeHtml(String(s.value))}</span>`;
          return `
            <div class="stat-item">
              <div class="stat-value">${valueHtml}</div>
              <div class="stat-label">${escapeHtml(s.label)}</div>
            </div>
          `;
        })
        .join('');
    }

    const marqueeEl = document.querySelector('[data-marquee-track]');
    if (marqueeEl && Array.isArray(cfg.marqueeItems)) {
      const groupHtml = cfg.marqueeItems
        .map(
          (item) =>
            `<span class="marquee-item"><span>${escapeHtml(item)}</span><span class="marquee-sep" aria-hidden="true"></span></span>`
        )
        .join('');
      marqueeEl.innerHTML = `<div class="marquee-group">${groupHtml}</div><div class="marquee-group" aria-hidden="true">${groupHtml}</div>`;
    }

    const homeProjectsEl = document.querySelector('[data-home-projects]');
    if (homeProjectsEl && Array.isArray(cfg.projects)) {
      homeProjectsEl.innerHTML = cfg.projects
        .map((p) => renderProjectCardHtml(p, 'home'))
        .join('');
    }

    const homeServicesEl = document.querySelector('[data-home-services]');
    if (homeServicesEl && Array.isArray(cfg.services)) {
      const icons = ['layout', 'layers', 'tool'];
      homeServicesEl.innerHTML = cfg.services
        .slice(0, 3)
        .map(
          (srv, idx) => `
          <article class="surface-card service-card" data-reveal>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              ${getIconSvg(icons[idx % icons.length])}
              <span class="mono-label mono-label--accent">${escapeHtml(srv.number)}</span>
            </div>
            <h3 class="card-h3">${escapeHtml(srv.title)}</h3>
            <p class="project-desc">${escapeHtml(srv.shortDesc)}</p>
            <a href="/services" class="link-slide" style="margin-top: auto;">View details →</a>
          </article>
        `
        )
        .join('');
    }

    const teaserEl = document.querySelector('[data-about-teaser]');
    if (teaserEl && cfg.about?.teaser) {
      teaserEl.textContent = cfg.about.teaser;
    }
  }

  function hydrateSkills() {
    const containers = document.querySelectorAll('[data-skills-groups]');
    if (!containers.length || !Array.isArray(cfg.skillGroups)) return;

    const html = cfg.skillGroups
      .map(
        (group) => `
        <div class="surface-card skill-group" data-reveal>
          <span class="mono-label mono-label--accent">${escapeHtml(group.title)}</span>
          <div class="pill-list">
            ${(group.items || []).map((skill) => `<span class="skill-chip">${escapeHtml(skill)}</span>`).join('')}
          </div>
        </div>
      `
      )
      .join('');

    containers.forEach((el) => {
      el.innerHTML = html;
    });
  }

  function hydrateProjectsPage() {
    const grid = document.querySelector('[data-all-projects]');
    if (!grid || !Array.isArray(cfg.projects)) return;
    grid.innerHTML = cfg.projects
      .map((p, idx) => renderProjectCardHtml(p, idx === 0 ? 'wide' : 'grid'))
      .join('');
  }

  function hydrateCaseStudyPage() {
    const root = document.querySelector('[data-case-study]');
    if (!root || !Array.isArray(cfg.projects)) return;

    const slug = root.getAttribute('data-project-slug');
    const project = cfg.projects.find((p) => p.slug === slug);
    if (!project) return;

    const nextProject = cfg.projects.find((p) => p.slug === project.nextSlug) || cfg.projects[0];

    const wakeHtml = project.wakeUpNote
      ? `<p class="wake-note">⏱ ${escapeHtml(project.wakeUpNote)}</p>`
      : '';

    const featuresHtml = (project.features || [])
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join('');

    const techStackHtml = (project.techStack || [])
      .map(
        (grp) => `
        <div style="margin-bottom: 1rem;">
          <div class="mono-label" style="margin-bottom: 0.5rem;">${escapeHtml(grp.group)}</div>
          <div class="pill-list">
            ${(grp.items || []).map((t) => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      `
      )
      .join('');

    const learnedHtml = (project.learned || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    const domainLabel = formatDomainLabel(project.liveUrl);

    root.innerHTML = `
      <section class="section" style="padding-top: clamp(2rem, 4vw, 3.5rem);">
        <div class="container">
          <div class="breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/projects">Projects</a>
            <span aria-hidden="true">/</span>
            <span>${escapeHtml(project.title)}</span>
          </div>

          <div class="section-head" style="margin-bottom: 1.5rem;">
            <span class="mono-label mono-label--accent">${escapeHtml(project.number)} / Case Study · ${escapeHtml(project.subtitle)}</span>
            <h1 class="page-h1">${escapeHtml(project.title)}</h1>
            <p class="lead-copy">${escapeHtml(project.oneLiner)}</p>
          </div>

          <div class="btn-group btn-group--stack-xs">
            <a href="${escapeHtml(project.liveUrl)}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Visit Live App ↗
            </a>
            <a href="${escapeHtml(project.repoUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              View Source on GitHub
            </a>
          </div>
          ${wakeHtml}

          <div class="case-hero-media project-frame" data-reveal>
            <div class="browser-chrome">
              <span class="browser-dots" aria-hidden="true"><span></span><span></span><span></span></span>
              <span class="browser-url">${escapeHtml(domainLabel)}</span>
            </div>
            <div class="project-media">
              <img
                src="${escapeHtml(project.image)}"
                alt="${escapeHtml(project.imageAlt)}"
                width="${Number(project.imageWidth) || 1008}"
                height="${Number(project.imageHeight) || 630}"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section section-border-top">
        <div class="container case-grid">
          <div>
            <div class="case-section" data-reveal>
              <span class="mono-label mono-label--accent">01 / Overview</span>
              <h2 class="section-h2">What it is</h2>
              <p class="project-desc">${escapeHtml(project.overview)}</p>
            </div>

            <div class="case-section" data-reveal>
              <span class="mono-label mono-label--accent">02 / The Problem</span>
              <h2 class="section-h2">Why I built it</h2>
              <p class="project-desc">${escapeHtml(project.problem)}</p>
            </div>

            <div class="case-section" data-reveal>
              <span class="mono-label mono-label--accent">03 / Key Features</span>
              <h2 class="section-h2">What it actually does</h2>
              <ul class="check-list">${featuresHtml}</ul>
            </div>

            <div class="case-section" data-reveal>
              <span class="mono-label mono-label--accent">04 / Technical Challenge</span>
              <h2 class="section-h2">${escapeHtml(project.challengeTitle)}</h2>
              <p class="project-desc">${escapeHtml(project.challengeDetail)}</p>
            </div>

            <div class="case-section" data-reveal>
              <span class="mono-label mono-label--accent">05 / Takeaways</span>
              <h2 class="section-h2">What I learned</h2>
              <ul class="check-list">${learnedHtml}</ul>
            </div>
          </div>

          <aside class="case-sidebar">
            <div class="surface-card" data-reveal>
              <span class="mono-label mono-label--accent" style="margin-bottom: 1rem;">Tech Stack</span>
              ${techStackHtml}
            </div>
            <div class="surface-card" data-reveal>
              <span class="mono-label mono-label--accent" style="margin-bottom: 0.75rem;">Deployment Note</span>
              <p class="project-desc">${escapeHtml(project.liveNote || 'Live deployment available via the link above.')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section class="section section-border-top">
        <div class="container">
          <a href="${escapeHtml(nextProject.caseStudyUrl)}" class="surface-card card-featured next-project-card" data-reveal>
            <div>
              <span class="mono-label mono-label--accent">Next Case Study</span>
              <h3 class="section-h2" style="margin-top: 0.4rem;">${escapeHtml(nextProject.title)}</h3>
              <p class="project-desc" style="margin-top: 0.35rem;">${escapeHtml(nextProject.subtitle)}</p>
            </div>
            <span class="btn btn--secondary">Explore →</span>
          </a>
        </div>
      </section>
    `;
  }

  function hydrateServicesPage() {
    const servicesList = document.querySelector('[data-services-list]');
    if (servicesList && Array.isArray(cfg.services)) {
      const icons = ['layout', 'layers', 'tool', 'target'];
      servicesList.innerHTML = cfg.services
        .map(
          (srv, idx) => `
          <article class="surface-card card-featured service-card" data-reveal>
            <div class="project-meta">
              <div style="display:flex; align-items:center; gap:0.7rem;">
                ${getIconSvg(icons[idx % icons.length])}
                <span class="mono-label mono-label--accent">${escapeHtml(srv.number)}</span>
              </div>
              <span class="service-price">${escapeHtml(srv.price)}</span>
            </div>
            <h2 class="card-h3">${escapeHtml(srv.title)}</h2>
            <p class="project-desc">${escapeHtml(srv.shortDesc)}</p>
            <ul class="check-list">
              ${(srv.deliverables || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
            </ul>
          </article>
        `
        )
        .join('');
    }

    const processEl = document.querySelector('[data-process-steps]');
    if (processEl && Array.isArray(cfg.processSteps)) {
      processEl.innerHTML = cfg.processSteps
        .map(
          (step) => `
          <article class="surface-card service-card" data-reveal>
            <span class="mono-label mono-label--accent">Step ${escapeHtml(step.step)}</span>
            <h3 class="card-h3">${escapeHtml(step.title)}</h3>
            <p class="project-desc">${escapeHtml(step.desc)}</p>
          </article>
        `
        )
        .join('');
    }

    const whyEl = document.querySelector('[data-why-list]');
    if (whyEl && Array.isArray(cfg.whyWorkWithMe)) {
      const icons = ['bolt', 'users', 'layout', 'tool'];
      whyEl.innerHTML = cfg.whyWorkWithMe
        .map(
          (w, idx) => `
          <article class="surface-card service-card" data-reveal>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              ${getIconSvg(icons[idx % icons.length])}
              <span class="mono-label mono-label--accent">0${idx + 1}</span>
            </div>
            <h3 class="card-h3">${escapeHtml(w.title)}</h3>
            <p class="project-desc">${escapeHtml(w.desc)}</p>
          </article>
        `
        )
        .join('');
    }
  }

  function hydrateAboutPage() {
    const introEl = document.querySelector('[data-about-intro]');
    if (introEl && cfg.about?.intro) introEl.textContent = cfg.about.intro;

    const whatEl = document.querySelector('[data-about-what]');
    if (whatEl && cfg.about?.whatIBuild) whatEl.textContent = cfg.about.whatIBuild;

    const learningEl = document.querySelector('[data-about-learning]');
    if (learningEl && cfg.about?.currentlyLearning) {
      learningEl.textContent = cfg.about.currentlyLearning;
    }

    const timelineEl = document.querySelector('[data-about-timeline]');
    if (timelineEl && Array.isArray(cfg.about?.timeline)) {
      timelineEl.innerHTML = cfg.about.timeline
        .map(
          (item) => `
          <div class="timeline-item" data-reveal>
            <div><span class="mono-label mono-label--accent">${escapeHtml(item.period)}</span></div>
            <div>
              <h3 class="card-h3" style="margin-bottom: 0.35rem;">${escapeHtml(item.title)}</h3>
              <p class="project-desc">${escapeHtml(item.detail)}</p>
            </div>
          </div>
        `
        )
        .join('');
    }

    const resumeHolder = document.querySelector('[data-resume-action]');
    if (resumeHolder) {
      const resumeUrl = cfg.contact?.resumeUrl;
      if (resumeUrl && !isTodoValue(resumeUrl)) {
        resumeHolder.innerHTML = `
          <a href="${escapeHtml(resumeUrl)}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            Download Resume ↗
          </a>
        `;
      } else {
        resumeHolder.innerHTML = `
          <button type="button" class="btn btn--secondary" disabled aria-disabled="true">
            Download Resume (TODO: add link in config.js)
          </button>
        `;
      }
    }
  }

  function hydrateContactPage() {
    const statusEl = document.querySelector('[data-contact-status]');
    if (statusEl && cfg.availability?.contactLabel) {
      statusEl.textContent = cfg.availability.contactLabel;
    }

    const reachEl = document.querySelector('[data-contact-reach]');
    if (reachEl && cfg.contact) {
      const c = cfg.contact;
      const emailDisplay = c.email || 'TODO-your-email@example.com';
      const emailHasValue = !isTodoValue(emailDisplay);

      const rows = [
        {
          label: 'Email',
          value: emailDisplay,
          valueHref: emailHasValue ? `mailto:${emailDisplay}` : null,
          actionHtml: `<button type="button" class="btn btn--secondary btn--sm" id="copy-email-btn">Copy</button>`
        },
        {
          label: 'Telegram',
          value: '@Dangerous_Bomberr',
          href: c.telegram
        },
        {
          label: 'Instagram',
          value: '@web.devlop.4u',
          href: c.instagram
        },
        {
          label: 'GitHub (Personal)',
          value: 'github.com/XAVRON-DEV',
          href: c.githubPersonal
        },
        {
          label: 'GitHub (Projects)',
          value: 'github.com/stackotools',
          href: c.githubOrg
        }
      ].filter((row) => row.actionHtml || (row.href && !isTodoValue(row.href)));

      reachEl.innerHTML = rows
        .map((row) => {
          const rightSide = row.actionHtml
            ? row.actionHtml
            : row.href
              ? `<a href="${escapeHtml(row.href)}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">Open ↗</a>`
              : `<span class="todo-badge">TODO</span>`;

          const valHtml = row.valueHref
            ? `<a href="${escapeHtml(row.valueHref)}" class="reach-item-val" style="color: var(--accent); text-decoration: underline; text-underline-offset: 3px;">${escapeHtml(row.value)}</a>`
            : `<span class="reach-item-val">${escapeHtml(row.value)}</span>`;

          return `
            <div class="reach-item">
              <div class="reach-item-text">
                <span class="mono-label">${escapeHtml(row.label)}</span>
                ${valHtml}
              </div>
              ${rightSide}
            </div>
          `;
        })
        .join('');

      const copyBtn = document.getElementById('copy-email-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const textToCopy = emailDisplay;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(textToCopy);
            } else {
              const tmp = document.createElement('textarea');
              tmp.value = textToCopy;
              tmp.setAttribute('readonly', '');
              tmp.style.position = 'fixed';
              tmp.style.left = '-9999px';
              document.body.appendChild(tmp);
              tmp.select();
              document.execCommand('copy');
              document.body.removeChild(tmp);
            }
            showToast('Copied');
          } catch (_) {
            showToast('Copy failed — please select manually');
          }
        });
      }
    }
  }

  /* ------------------------------------------------------------------------
     6. CONTACT FORM SUBMISSION (FORMSPREE)
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const typeInput = form.querySelector('#contact-type');
    const messageInput = form.querySelector('#contact-message');
    const honeypotInput = form.querySelector('input[name="_gotcha"]');
    const submitBtn = form.querySelector('#contact-submit');
    const statusBox = document.getElementById('form-status');

    const nameErr = document.getElementById('error-name');
    const emailErr = document.getElementById('error-email');
    const msgErr = document.getElementById('error-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const clearErrors = () => {
      if (nameErr) nameErr.textContent = '';
      if (emailErr) emailErr.textContent = '';
      if (msgErr) msgErr.textContent = '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      if (statusBox) {
        statusBox.hidden = true;
        statusBox.className = 'form-feedback';
        statusBox.textContent = '';
      }

      if (honeypotInput && honeypotInput.value.trim() !== '') {
        return;
      }

      const nameVal = (nameInput?.value || '').trim();
      const emailVal = (emailInput?.value || '').trim();
      const typeVal = (typeInput?.value || '').trim();
      const messageVal = (messageInput?.value || '').trim();

      let hasError = false;
      if (nameVal.length < 2) {
        if (nameErr) nameErr.textContent = 'Please enter your name.';
        hasError = true;
      }
      if (!emailRegex.test(emailVal)) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
        hasError = true;
      }
      if (messageVal.length < 10) {
        if (msgErr) msgErr.textContent = 'Please add a short note (at least 10 characters).';
        hasError = true;
      }

      if (hasError) return;

      const endpoint = cfg.contact?.formspreeEndpoint || 'https://formspree.io/f/xvkakkvr';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            projectType: typeVal || 'Not specified',
            message: messageVal,
            _gotcha: ''
          })
        });

        if (!res.ok) {
          throw new Error(`Form submission failed (${res.status})`);
        }

        form.reset();
        if (statusBox) {
          statusBox.hidden = false;
          statusBox.className = 'form-feedback form-feedback--success';
          statusBox.textContent = "Got it. I'll reply soon.";
        }
      } catch (_) {
        const fallbackEmail = cfg.contact?.email || 'webdevlop4uu@gmail.com';
        if (statusBox) {
          statusBox.hidden = false;
          statusBox.className = 'form-feedback form-feedback--error';
          statusBox.innerHTML = `Something went wrong while sending your message. You can reach me directly at <strong>${escapeHtml(fallbackEmail)}</strong>.`;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. MOTION (GSAP + SCROLLTRIGGER) & SMOOTH PAGE FADES
     ------------------------------------------------------------------------ */
  function initMotion() {
    if (prefersReducedMotion) return;
    if (typeof window.gsap === 'undefined') return;

    try {
      const gsap = window.gsap;
      if (typeof window.ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(window.ScrollTrigger);
      }

      const heroLines = document.querySelectorAll('.hero-line');
      if (heroLines.length) {
        gsap.from(heroLines, {
          yPercent: 108,
          duration: 0.78,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform'
        });
      }

      const heroItems = document.querySelectorAll('[data-hero-stagger]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          y: 18,
          opacity: 0,
          duration: 0.65,
          delay: 0.14,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        });
      }

      if (typeof window.ScrollTrigger !== 'undefined') {
        const revealEls = document.querySelectorAll('[data-reveal]');
        revealEls.forEach((el) => {
          gsap.from(el, {
            y: 18,
            opacity: 0,
            duration: 0.48,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true
            }
          });
        });

        const countEls = document.querySelectorAll('[data-count-target]');
        countEls.forEach((el) => {
          const target = Number(el.getAttribute('data-count-target'));
          const suffix = el.getAttribute('data-count-suffix') || '';
          if (!Number.isFinite(target)) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
            onComplete: () => {
              el.textContent = `${target}${suffix}`;
            }
          });
        });
      }
    } catch (_) {
      // Fail safely: elements remain visible at default CSS opacity 1
    }
  }

  function initPageTransitions() {
    if (prefersReducedMotion) return;

    document.body.classList.add('page-fade-enter');

    window.addEventListener('pageshow', () => {
      document.body.classList.remove('is-leaving');
      document.body.style.overflow = '';
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const href = link.getAttribute('href') || '';
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      let url;
      try {
        url = new URL(link.href, window.location.origin);
      } catch (_) {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.add('is-leaving');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 170);
    });
  }

  /* ------------------------------------------------------------------------
     8. BOOTSTRAP
     ------------------------------------------------------------------------ */
  function init() {
    renderHeaderAndMobileMenu();
    renderFooter();
    initChromeEffects();

    hydrateHomePage();
    hydrateHeroStudioCard();
    hydrateMetaAdsSection();
    hydrateSkills();
    hydrateProjectsPage();
    hydrateCaseStudyPage();
    hydrateServicesPage();
    hydrateAboutPage();
    hydrateContactPage();
    initContactForm();

    updateKolkataTime();
    window.setInterval(updateKolkataTime, 30000);

    initPageTransitions();
    initMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
