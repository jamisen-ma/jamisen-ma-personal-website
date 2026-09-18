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

// Footer year
const year = document.getElementById('year');
if (year) {
    year.textContent = new Date().getFullYear();
}
