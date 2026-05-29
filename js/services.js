'use strict';

(function () {
    const currentPage = window.location.pathname.split('/').pop() || 'services.html';

    const serviceLinks = Array.from(document.querySelectorAll('.services-nav-strip__link'));
    const serviceCards = Array.from(document.querySelectorAll('.service-card__link'));

    const normalizeHref = (href) => {
        if (!href) return '';

        try {
            return new URL(href, window.location.href).pathname.split('/').pop();
        } catch {
            return href.replace('./', '');
        }
    };

    const setActiveServiceLink = () => {
        serviceLinks.forEach((link) => {
            const hrefPage = normalizeHref(link.getAttribute('href'));
            const isActive = hrefPage === currentPage;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const addServiceCardLabels = () => {
        serviceCards.forEach((card) => {
            const title = card.querySelector('.service-card__content strong')?.textContent?.trim();

            if (!title) return;

            card.setAttribute(
                'aria-label',
                `View ${title} independent HVAC provider matching options`
            );
        });
    };

    const initCardKeyboardState = () => {
        serviceCards.forEach((card) => {
            card.addEventListener('focus', () => {
                card.closest('.service-card')?.classList.add('is-keyboard-active');
            });

            card.addEventListener('blur', () => {
                card.closest('.service-card')?.classList.remove('is-keyboard-active');
            });
        });
    };

    const initNavHoverState = () => {
        serviceLinks.forEach((link) => {
            link.addEventListener('pointerenter', () => {
                serviceLinks.forEach((item) => {
                    item.classList.toggle('is-muted', item !== link);
                });
            });

            link.addEventListener('pointerleave', () => {
                serviceLinks.forEach((item) => {
                    item.classList.remove('is-muted');
                });
            });

            link.addEventListener('focus', () => {
                serviceLinks.forEach((item) => {
                    item.classList.toggle('is-muted', item !== link);
                });
            });

            link.addEventListener('blur', () => {
                serviceLinks.forEach((item) => {
                    item.classList.remove('is-muted');
                });
            });
        });
    };

    const refreshIcons = () => {
        if (window.HVACSite?.refreshIcons) {
            window.HVACSite.refreshIcons();
            return;
        }

        if (window.lucide?.createIcons) {
            window.lucide.createIcons();
        }
    };

    const init = () => {
        setActiveServiceLink();
        addServiceCardLabels();
        initCardKeyboardState();
        initNavHoverState();
        refreshIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();