// script.js

// Optimize DOMContentLoaded for faster rendering
window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const loadImg = (img) => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    };
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImg(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' }); // Preload before visible
        images.forEach(img => observer.observe(img));
    } else {
        images.forEach(loadImg);
    }

    // Minimize layout thrashing by batching DOM reads/writes
    requestAnimationFrame(() => {
        document.body.style.visibility = 'visible';
    });
});

// Debounce function for performance
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Debounced resize event
window.addEventListener('resize', debounce(function() {
    // Only run code if needed
}, 200));

// Use passive listeners for scroll for better performance
window.addEventListener('scroll', function() {}, { passive: true });

// Defer non-critical JS (example: analytics, widgets)
window.addEventListener('load', function() {
    // Place non-critical scripts here
});
