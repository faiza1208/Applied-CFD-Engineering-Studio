const navItems = [
  { page: "home", label: "Home", href: "index.html" },
  { page: "modules", label: "Modules", href: "modules.html" },
  { page: "labs", label: "Labs", href: "labs.html" },
  { page: "resources", label: "Resources", href: "resources.html" },
  { page: "instructor", label: "Instructor", href: "instructor.html" },
  { page: "about", label: "About", href: "about.html" }
];

const heroContent = {
  home: {
    kicker: "Engineering Learning Platform",
    title: "Applied CFD Engineering Studio",
    copy: "A professional course platform scaffold for future CFD engineering modules, labs, resources, and instructor materials.",
    primaryLabel: "Explore Modules",
    primaryHref: "modules.html",
    secondaryLabel: "View Labs",
    secondaryHref: "labs.html"
  },
  modules: {
    kicker: "Course Structure",
    title: "Modules",
    copy: "Placeholder module catalog for future learning content.",
    primaryLabel: "View Labs",
    primaryHref: "labs.html",
    secondaryLabel: "Resources",
    secondaryHref: "resources.html"
  },
  labs: {
    kicker: "Hands-on Practice",
    title: "Practical Labs",
    copy: "Placeholder lab workspace for future applied exercises.",
    primaryLabel: "View Resources",
    primaryHref: "resources.html",
    secondaryLabel: "Modules",
    secondaryHref: "modules.html"
  },
  resources: {
    kicker: "Reference Hub",
    title: "Resources",
    copy: "Placeholder resource library for future downloads and references.",
    primaryLabel: "View Modules",
    primaryHref: "modules.html",
    secondaryLabel: "About",
    secondaryHref: "about.html"
  },
  instructor: {
    kicker: "Course Team",
    title: "Instructor",
    copy: "Placeholder instructor profile area for future biography and credentials.",
    primaryLabel: "About",
    primaryHref: "about.html",
    secondaryLabel: "Modules",
    secondaryHref: "modules.html"
  },
  about: {
    kicker: "Program Context",
    title: "About",
    copy: "Placeholder program overview for future platform details.",
    primaryLabel: "View Modules",
    primaryHref: "modules.html",
    secondaryLabel: "Resources",
    secondaryHref: "resources.html"
  }
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function renderNavigation(target, activePage) {
  target.innerHTML = `
    <header class="site-header">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Applied CFD Engineering Studio home">
          <span class="brand-mark">CFD</span>
          <span class="brand-text">Applied CFD Engineering Studio</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav-links" aria-label="Primary navigation">
          ${navItems
            .map(
              (item) => `
                <a class="nav-link ${item.page === activePage ? "is-active" : ""}" href="${item.href}" ${
                  item.page === activePage ? 'aria-current="page"' : ""
                }>${item.label}</a>
              `
            )
            .join("")}
        </nav>
      </div>
    </header>
  `;

  const toggle = target.querySelector(".nav-toggle");
  const links = target.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

export function renderFooter(target) {
  target.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div>
          <p class="footer-title">Applied CFD Engineering Studio</p>
          <p class="footer-copy">Sprint 1 static platform scaffold. Content placeholders only.</p>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">
          ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
        </nav>
      </div>
    </footer>
  `;
}

export function renderHero(target, page) {
  const content = heroContent[page] ?? heroContent.home;
  target.className = "hero";
  target.innerHTML = `
    <div class="container hero-inner">
      <div>
        <p class="eyebrow">${escapeHtml(content.kicker)}</p>
        <h1>${escapeHtml(content.title)}</h1>
        <p class="hero-copy">${escapeHtml(content.copy)}</p>
        <div class="hero-actions">
          ${button(content.primaryLabel, content.primaryHref, "primary")}
          ${button(content.secondaryLabel, content.secondaryHref, "ghost")}
        </div>
      </div>
      <div class="hero-console" aria-label="Platform status summary">
        <div class="console-top">
          <span class="console-dot"></span>
          <span class="console-dot"></span>
          <span class="console-dot"></span>
        </div>
        <div class="console-body">
          <div class="metric-row">
            <span class="metric-label">Sprint</span>
            <span class="metric-value">01</span>
          </div>
          <div class="metric-row">
            <span class="metric-label">Pages</span>
            <span class="metric-value">06</span>
          </div>
          <div class="metric-row">
            <span class="metric-label">Content</span>
            <span class="metric-value">Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function hydrateSectionHeaders(root = document) {
  root.querySelectorAll("[data-section-header]").forEach((target) => {
    target.className = "section-heading";
    target.innerHTML = `
      <p class="eyebrow">${escapeHtml(target.dataset.kicker)}</p>
      <h2>${escapeHtml(target.dataset.title)}</h2>
      <p>${escapeHtml(target.dataset.copy)}</p>
    `;
  });
}

export function hydrateCards(root = document) {
  root.querySelectorAll("[data-card]").forEach((target) => {
    const unavailable = target.dataset.link === "#";
    target.className = "card";
    target.innerHTML = `
      <p class="card-meta">${escapeHtml(target.dataset.meta)}</p>
      <h3>${escapeHtml(target.dataset.title)}</h3>
      <p>${escapeHtml(target.dataset.copy)}</p>
      ${button(target.dataset.linkLabel, target.dataset.link, unavailable ? "disabled" : "ghost", unavailable)}
    `;
  });
}

export function hydrateProgressBars(root = document) {
  root.querySelectorAll("[data-progress]").forEach((target) => {
    const value = Math.max(0, Math.min(100, Number(target.dataset.value) || 0));
    target.className = "progress";
    target.innerHTML = `
      <div class="progress-top">
        <span>${escapeHtml(target.dataset.label)}</span>
        <span>${value}%</span>
      </div>
      <div class="progress-track" role="progressbar" aria-label="${escapeHtml(target.dataset.label)}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="--value: ${value}%"></div>
      </div>
    `;
  });
}

export function hydrateCallouts(root = document) {
  root.querySelectorAll("[data-callout]").forEach((target) => {
    const tone = target.dataset.tone || "neutral";
    target.className = `callout ${tone}`;
    target.innerHTML = `
      <h3>${escapeHtml(target.dataset.title)}</h3>
      <p>${escapeHtml(target.dataset.copy)}</p>
    `;
  });
}

function button(label, href, variant = "ghost", disabled = false) {
  if (disabled) {
    return `<span class="button ${variant}" aria-disabled="true">${escapeHtml(label)}</span>`;
  }

  return `<a class="button ${variant}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}
