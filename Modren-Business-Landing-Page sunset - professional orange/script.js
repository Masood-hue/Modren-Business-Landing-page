document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isActive));
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }));
    }

    // Debounce helper for scroll
    function debounce(fn, wait = 50) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    const header = document.getElementById('header');
    window.addEventListener('scroll', debounce(() => {
        if (!header) return;
        if (window.scrollY > 50) header.classList.add('header-scrolled'); 
        else header.classList.remove('header-scrolled');
    }, 50));

    // Testimonials Slider
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalTestimonials = testimonialCards.length || 0;

    function updateSlider() {
        if (!testimonialsContainer) return;
        testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) nextBtn.addEventListener('click',
         () => { currentIndex = (currentIndex + 1) % totalTestimonials; updateSlider(); });
    if (prevBtn) prevBtn.addEventListener('click',
         () => { currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
             updateSlider(); });

    let testimonialInterval = null;
    if (totalTestimonials > 1) {
        testimonialInterval = setInterval(() => { currentIndex = (currentIndex + 1) % totalTestimonials;
             updateSlider(); }, 5000);
    }

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) 
                entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        fadeElements.forEach(element => fadeInObserver.observe(element));
    } else {
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Contact form submission (graceful, non-blocking)
    const contactForm = document.getElementById('contactForm');

    function showFormMessage(msg, type = 'success') {
        const msgEl = document.getElementById('formMessage');
        if (!msgEl) return;
        msgEl.textContent = msg;
        msgEl.className = 'form-message ' + type;
        msgEl.hidden = false;
        setTimeout(() => { msgEl.hidden = true; }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // TODO: send this data to server via fetch/POST

            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
});