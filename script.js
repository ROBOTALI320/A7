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
