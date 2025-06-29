// script.js
// Add your JavaScript code here to improve performance or interactivity.

console.log('JavaScript is loaded and ready!');

// Lazy load images
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
        });
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for old browsers
        images.forEach(loadImg);
    }
});

// Debounce function for performance
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Example: Debounced resize event
window.addEventListener('resize', debounce(function() {
    console.log('Window resized!');
    // Place resize-related code here
}, 200));
