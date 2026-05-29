'use strict';

(function () {
    const sidebarLinks = Array.from(document.querySelectorAll('.legal-sidebar__links a'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getHeaderOffset = () => {
        const header = document.querySelector('[data-header]');
        const headerHeight = header ? header.offsetHeight : 76;

        return headerHeight + 24;
    };

    const getTargetSections = () => {
        return sidebarLinks
            .map((link) => {
                const href = link.getAttribute('href');

                if (!href || !href.startsWith('#')) {
                    return null;
                }

                return document.querySelector(href);
            })
            .filter(Boolean);
    };

    const clearActiveLinks = () => {
        sidebarLinks.forEach((link) => {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
        });
    };

    const setActiveLink = (id) => {
        if (!id) return;

        clearActiveLinks();

        const activeLink = sidebarLinks.find((link) => {
            return link.getAttribute('href') === `#${id}`;
        });

        if (activeLink) {
            activeLink.classList.add('is-active');
            activeLink.setAttribute('aria-current', 'true');
        }
    };

    const initSidebarScroll = () => {
        if (!sidebarLinks.length) return;

        sidebarLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');

                if (!href || !href.startsWith('#')) return;

                const target = document.querySelector(href);
                if (!target) return;

                event.preventDefault();

                const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

                window.scrollTo({
                    top,
                    behavior: reduceMotion ? 'auto' : 'smooth'
                });

                setActiveLink(target.id);

                window.history.pushState(null, '', href);
            });
        });
    };

    const initActiveSectionTracking = () => {
        const sections = getTargetSections();

        if (!sections.length || !('IntersectionObserver' in window)) {
            const firstSection = sections[0];

            if (firstSection?.id) {
                setActiveLink(firstSection.id);
            }

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                const activeSection = visibleEntries[0]?.target;

                if (activeSection?.id) {
                    setActiveLink(activeSection.id);
                }
            },
            {
                root: null,
                threshold: [0.18, 0.3, 0.5],
                rootMargin: `-${getHeaderOffset()}px 0px -58% 0px`
            }
        );

        sections.forEach((section) => observer.observe(section));
    };

    const initExternalLegalLinks = () => {
        const links = Array.from(document.querySelectorAll('.legal-card a[href], .legal-contact-box a[href]'));

        links.forEach((link) => {
            const href = link.getAttribute('href');

            if (!href) return;

            const isExternal = /^https?:\/\//i.test(href) && !href.includes(window.location.hostname);

            if (isExternal) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    };

    const initLegalMeta = () => {
        const pageTitle = document.querySelector('.legal-hero h1')?.textContent?.trim();

        if (!pageTitle) return;

        document.body.setAttribute('data-legal-page-ready', 'true');
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
        initSidebarScroll();
        initActiveSectionTracking();
        initExternalLegalLinks();
        initLegalMeta();
        refreshIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();