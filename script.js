// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

function setNavOpen(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    siteNav.classList.toggle('is-open', open);
}

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close mobile menu when clicking on a link
    siteNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setNavOpen(false));
    });

    // Close mobile menu with Escape and return focus to the toggle
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
            setNavOpen(false);
            navToggle.focus();
        }
    });
}

// Theme toggle (dark by default, choice remembered per browser)
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#09090b' : '#fafafa');
}

if (themeToggle) {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
    });
}

// Show the header border once the page has scrolled
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
    const updateHeader = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
}

// Fade entries in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('is-visible'));
}

// Highlight the nav link for the section currently in view
const navLinks = new Map(
    [...document.querySelectorAll('.site-nav a[href^="#"]')].map(a => [a.getAttribute('href').slice(1), a])
);
if ('IntersectionObserver' in window && navLinks.size) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('is-active'));
                navLinks.get(entry.target.id)?.classList.add('is-active');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((_, id) => {
        const section = document.getElementById(id);
        if (section) sectionObserver.observe(section);
    });
}

// Cursor-following spotlight on cards
document.querySelectorAll('.job-body, .project, .skill-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
});

// Copy email button
const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard) {
    const label = copyButton.querySelector('.copy-label');
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(copyButton.dataset.email);
            label.textContent = 'Copied!';
            copyButton.classList.add('is-copied');
            setTimeout(() => {
                label.textContent = 'Copy email';
                copyButton.classList.remove('is-copied');
            }, 2000);
        } catch (e) {}
    });
} else if (copyButton) {
    copyButton.hidden = true;
}

// Footer year
const year = document.getElementById('year');
if (year) {
    year.textContent = new Date().getFullYear();
}
