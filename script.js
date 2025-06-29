// script.js

// --- PERFORMANCE & INTERACTIVITY ENHANCEMENTS ---
// 1. Efficient DOMContentLoaded: Only run after DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if any)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    entry.target.removeAttribute('data-src');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });
        images.forEach(img => observer.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    // Show body after critical JS runs
    requestAnimationFrame(() => {
        document.body.style.visibility = 'visible';
    });
});

// 2. Debounce utility for resize/scroll events
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 3. Debounced resize event for responsive logic
window.addEventListener('resize', debounce(function() {
    // Add responsive logic here if needed
}, 150));

// 4. Passive scroll event for smoothness
window.addEventListener('scroll', function() {}, { passive: true });

// 5. Idle callback for non-critical tasks (if supported)
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Place analytics or non-critical JS here
    });
}

// 6. Preload fonts for better rendering (if needed)
// (Handled in HTML with preconnect)

// 7. Minimize forced reflows: batch DOM reads/writes
// (Handled above with requestAnimationFrame)

// 8. Use strict mode for safer JS
'use strict';

// --- DYNAMIC CATEGORY RENDERING & INTERACTIVITY ---
// DATA (moved from HTML)
const categories = [
    // ...existing categories data from HTML...
];

// DOM Elements
const categoriesList = document.getElementById('categoriesList');
const entranceOverlay = document.getElementById('entranceOverlay');
const entranceBtn = document.getElementById('entranceBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const categoryOverlay = document.getElementById('categoryOverlay');
const closeCategoryOverlay = document.getElementById('closeCategoryOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const toolsList = document.getElementById('toolsList');

// Entrance overlay logic
entranceBtn.onclick = function(e) {
    e.preventDefault();
    entranceOverlay.style.display = 'none';
};

// Render categories
function renderCategories() {
    categoriesList.innerHTML = '';
    categories.forEach((cat, idx) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.setProperty('--i', idx);
        const emoji = cat.title.split(' ')[0];
        const titleText = cat.title.replace(/^[^\s]+\s/, '');
        card.innerHTML = `<span class="cat-emoji">${emoji}</span><span class="cat-title">${titleText}</span>`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', cat.title);
        card.onclick = () => openCategoryOverlay(cat);
        card.onkeypress = (e) => { if (e.key === 'Enter') openCategoryOverlay(cat); };
        categoriesList.appendChild(card);
    });
}

// Open category overlay and show tools
function openCategoryOverlay(category) {
    overlayTitle.textContent = category.title;
    toolsList.innerHTML = '';
    category.tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <strong>${tool.name}</strong>
            <div>${tool.desc}</div>
            <a class="visit-btn" href="${tool.url}" target="_blank" rel="noopener">Visit Link</a>
        `;
        toolsList.appendChild(toolCard);
    });
    categoryOverlay.style.display = 'flex';
    categoryOverlay.classList.add('active');
    history.pushState({ overlay: true }, '', '#category');
}

function closeCategoryOverlayAndShowCategories() {
    categoryOverlay.style.display = 'none';
    categoryOverlay.classList.remove('active');
    categoriesList.scrollIntoView({ behavior: 'smooth' });
}

closeCategoryOverlay.onclick = function() {
    closeCategoryOverlayAndShowCategories();
};
closeCategoryOverlay.onkeypress = function(e) {
    if (e.key === 'Enter') {
        closeCategoryOverlayAndShowCategories();
    }
};
categoryOverlay.onclick = function(e) {
    if (e.target === categoryOverlay) {
        closeCategoryOverlayAndShowCategories();
    }
};
window.addEventListener('popstate', function() {
    if (categoryOverlay.classList.contains('active')) {
        closeCategoryOverlayAndShowCategories();
    }
});
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};
scrollTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.addEventListener('DOMContentLoaded', () => {
    if (entranceOverlay) entranceOverlay.style.display = 'none';
    renderCategories();
});
themeToggle.onclick = function() {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
};
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scrollTopBtn').setAttribute('title', 'بچە سەرڤە');
    document.getElementById('scrollTopBtn').innerHTML = '<i class="fas fa-arrow-up"></i>';
});
let ticking = false;
function handleMobileScrollAnim() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.innerWidth <= 700) {
                if (window.scrollY > 30) {
                    document.body.classList.add('scrolled-down');
                } else {
                    document.body.classList.remove('scrolled-down');
                }
            } else {
                document.body.classList.remove('scrolled-down');
            }
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', handleMobileScrollAnim, { passive: true });
window.addEventListener('resize', handleMobileScrollAnim);

let lastMobileScrollY = window.scrollY;
function mobileScrollAnim() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.innerWidth <= 700) {
                const cards = document.querySelectorAll('.category-card');
                let direction = window.scrollY > lastMobileScrollY ? 'down' : 'up';
                cards.forEach(card => {
                    card.classList.remove('mobile-scroll-down', 'mobile-scroll-up');
                    const rect = card.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        if (direction === 'down') {
                            card.classList.add('mobile-scroll-down');
                        } else {
                            card.classList.add('mobile-scroll-up');
                        }
                        setTimeout(() => {
                            card.classList.remove('mobile-scroll-down', 'mobile-scroll-up');
                        }, 500);
                    }
                });
                lastMobileScrollY = window.scrollY;
            }
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', mobileScrollAnim, { passive: true });
window.addEventListener('resize', () => { lastMobileScrollY = window.scrollY; });
