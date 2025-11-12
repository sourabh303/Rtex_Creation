/* ============================================
   RTEX REVOLUTIONARY - Dual Theme Toggle
   Dark/Light Mode Switcher
   ============================================ */

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateToggleIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    let theme = html.getAttribute('data-theme');
    theme = theme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
});

// Update icon based on theme
function updateToggleIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.textContent = icon;
}

// DOM Elements for other functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu-revolutionary');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
function animateCounter() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-revolutionary')) {
                animateCounter();
            }
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        orb.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form-revolutionary');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Netlify will handle form submission
        // Add any custom validation here if needed
    });
}

// Add scroll animation class
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-revolutionary');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(102, 126, 234, 0.3)';
    } else {
        navbar.style.borderBottomColor = 'rgba(102, 126, 234, 0.1)';
    }
});

// Dynamic background based on scroll
document.addEventListener('DOMContentLoaded', () => {
    console.log('RTEX Revolutionary website with Dual Theme loaded successfully! 🚀');
});

// System preference detection (optional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode
    if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', 'dark');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
    }
});
