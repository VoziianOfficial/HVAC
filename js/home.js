'use strict';

(function () {
    const root = document.querySelector('.home-hero');
    if (!root) return;

    const slides = Array.from(document.querySelectorAll('[data-home-hero-slide]'));
    const dots = Array.from(document.querySelectorAll('[data-home-hero-dot]'));
    const prevButton = document.querySelector('[data-home-hero-prev]');
    const nextButton = document.querySelector('[data-home-hero-next]');

    if (!slides.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentIndex = 0;
    let autoplayTimer = null;
    let isPaused = false;

    const AUTOPLAY_DELAY = 5200;

    const setSlide = (index) => {
        const normalizedIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === normalizedIndex;

            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === normalizedIndex;

            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        currentIndex = normalizedIndex;
    };

    const goNext = () => {
        setSlide(currentIndex + 1);
    };

    const goPrev = () => {
        setSlide(currentIndex - 1);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const startAutoplay = () => {
        if (reduceMotion || slides.length < 2 || isPaused) return;

        stopAutoplay();

        autoplayTimer = window.setInterval(() => {
            goNext();
        }, AUTOPLAY_DELAY);
    };

    const pauseAutoplay = () => {
        isPaused = true;
        stopAutoplay();
    };

    const resumeAutoplay = () => {
        isPaused = false;
        startAutoplay();
    };

    const initDots = () => {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                setSlide(index);
                startAutoplay();
            });
        });
    };

    const initButtons = () => {
        prevButton?.addEventListener('click', () => {
            goPrev();
            startAutoplay();
        });

        nextButton?.addEventListener('click', () => {
            goNext();
            startAutoplay();
        });
    };

    const initPauseEvents = () => {
        root.addEventListener('pointerenter', pauseAutoplay);
        root.addEventListener('pointerleave', resumeAutoplay);

        root.addEventListener('focusin', pauseAutoplay);
        root.addEventListener('focusout', resumeAutoplay);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });
    };

    const initKeyboardControls = () => {
        root.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                goPrev();
                startAutoplay();
            }

            if (event.key === 'ArrowRight') {
                goNext();
                startAutoplay();
            }
        });
    };

    const init = () => {
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });

        dots.forEach((dot, index) => {
            dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
        });

        setSlide(0);

        initDots();
        initButtons();
        initPauseEvents();
        initKeyboardControls();
        startAutoplay();
    };

    init();
})();