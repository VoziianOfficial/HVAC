'use strict';

(function () {
    const marquee = document.querySelector('.about-marquee');
    const track = document.querySelector('[data-about-marquee-track]');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const refreshIcons = () => {
        if (window.HVACSite?.refreshIcons) {
            window.HVACSite.refreshIcons();
            return;
        }

        if (window.lucide?.createIcons) {
            window.lucide.createIcons();
        }
    };

    const setMarqueeSpeed = () => {
        if (!track || reduceMotion) return;

        const contentWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;

        const baseDuration = Math.max(24, Math.min(46, contentWidth / viewportWidth * 18));

        track.style.animationDuration = `${baseDuration}s`;
    };

    const pauseMarquee = () => {
        if (!track) return;
        track.classList.add('is-paused');
        track.style.animationPlayState = 'paused';
    };

    const resumeMarquee = () => {
        if (!track || reduceMotion) return;
        track.classList.remove('is-paused');
        track.style.animationPlayState = 'running';
    };

    const initMarquee = () => {
        if (!marquee || !track) return;

        if (reduceMotion) {
            track.style.animation = 'none';
            return;
        }

        setMarqueeSpeed();

        marquee.addEventListener('pointerenter', pauseMarquee);
        marquee.addEventListener('pointerleave', resumeMarquee);

        marquee.addEventListener('focusin', pauseMarquee);
        marquee.addEventListener('focusout', resumeMarquee);

        window.addEventListener('resize', () => {
            window.clearTimeout(window.__aboutMarqueeResizeTimer);

            window.__aboutMarqueeResizeTimer = window.setTimeout(() => {
                setMarqueeSpeed();
            }, 160);
        });
    };

    const initServiceLinks = () => {
        const links = Array.from(document.querySelectorAll('.about-marquee__item[href]'));

        links.forEach((link) => {
            const title = link.querySelector('strong')?.textContent?.trim();

            if (!title) return;

            link.setAttribute(
                'aria-label',
                `View ${title} independent HVAC provider matching category`
            );
        });
    };

    const init = () => {
        initMarquee();
        initServiceLinks();
        refreshIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();