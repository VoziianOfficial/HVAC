'use strict';

(function () {
    const CONFIG = window.SITE_CONFIG || {};
    const currentServiceId = document.body?.dataset?.servicePage || '';

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const escapeHTML = (value) => {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    };

    const getCurrentService = () => {
        const services = Array.isArray(CONFIG.services) ? CONFIG.services : [];

        if (currentServiceId) {
            return services.find((service) => service.id === currentServiceId);
        }

        const page = window.location.pathname.split('/').pop();

        return services.find((service) => service.href === page || service.href === `./${page}`);
    };

    const currentService = getCurrentService();

    const refreshIcons = () => {
        if (window.HVACSite?.refreshIcons) {
            window.HVACSite.refreshIcons();
            return;
        }

        if (window.lucide?.createIcons) {
            window.lucide.createIcons();
        }
    };

    const setTabPanelContent = (tabData) => {
        if (!tabData) return;

        const image = qs('[data-service-tab-image]');
        const title = qs('[data-service-tab-title]');
        const text = qs('[data-service-tab-text]');
        const list = qs('[data-service-tab-list]');

        if (image && tabData.image) {
            image.src = tabData.image;
            image.alt = `${tabData.title || tabData.label} HVAC provider comparison category`;
        }

        if (title) {
            title.textContent = tabData.title || tabData.label || '';
        }

        if (text) {
            text.textContent = tabData.text || '';
        }

        if (list && Array.isArray(tabData.compare)) {
            list.innerHTML = tabData.compare
                .map((item) => `<li>${escapeHTML(item)}</li>`)
                .join('');
        }
    };

    const setActiveTab = (index, shouldFocus = false) => {
        const tabsRoot = qs('[data-service-tabs]');
        if (!tabsRoot || !currentService?.tabs?.length) return;

        const buttons = qsa('[data-service-tab]', tabsRoot);
        const panel = qs('[data-service-tab-panel]', tabsRoot);
        const tabData = currentService.tabs[index];

        if (!tabData) return;

        buttons.forEach((button, buttonIndex) => {
            const isActive = buttonIndex === index;

            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', String(isActive));
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        if (panel) {
            const activeButton = buttons[index];

            if (activeButton?.id) {
                panel.setAttribute('aria-labelledby', activeButton.id);
            }
        }

        setTabPanelContent(tabData);

        if (shouldFocus) {
            buttons[index]?.focus();
        }

        refreshIcons();
    };

    const initTabs = () => {
        const tabsRoot = qs('[data-service-tabs]');
        if (!tabsRoot || !currentService?.tabs?.length) return;

        const buttons = qsa('[data-service-tab]', tabsRoot);

        if (!buttons.length) return;

        buttons.forEach((button, index) => {
            const tabData = currentService.tabs[index];

            if (tabData?.label) {
                button.textContent = tabData.label;
            }

            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            button.setAttribute('tabindex', index === 0 ? '0' : '-1');

            button.addEventListener('click', () => {
                setActiveTab(index, false);
            });

            button.addEventListener('keydown', (event) => {
                const lastIndex = buttons.length - 1;
                let nextIndex = index;

                if (event.key === 'ArrowRight') {
                    nextIndex = index === lastIndex ? 0 : index + 1;
                } else if (event.key === 'ArrowLeft') {
                    nextIndex = index === 0 ? lastIndex : index - 1;
                } else if (event.key === 'Home') {
                    nextIndex = 0;
                } else if (event.key === 'End') {
                    nextIndex = lastIndex;
                } else {
                    return;
                }

                event.preventDefault();
                setActiveTab(nextIndex, true);
            });
        });

        setActiveTab(0, false);
    };

    const initFaqSchema = () => {
        if (!currentService?.faqs?.length) return;

        const schema = qs('[data-faq-schema]');
        if (!schema) return;

        const data = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: currentService.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        };

        schema.textContent = JSON.stringify(data, null, 2);
    };

    const initServiceCopyFromConfig = () => {
        if (!currentService) return;

        qsa('[data-current-service-title]').forEach((element) => {
            element.textContent = currentService.title || '';
        });

        qsa('[data-current-service-short-title]').forEach((element) => {
            element.textContent = currentService.shortTitle || currentService.title || '';
        });

        qsa('[data-current-service-summary]').forEach((element) => {
            element.textContent = currentService.summary || '';
        });

        qsa('[data-current-service-hero-title]').forEach((element) => {
            element.textContent = currentService.heroTitle || '';
        });

        qsa('[data-current-service-hero-text]').forEach((element) => {
            element.textContent = currentService.heroText || '';
        });

        qsa('[data-current-service-page-intro]').forEach((element) => {
            element.textContent = currentService.pageIntro || '';
        });

        qsa('[data-current-service-kicker]').forEach((element) => {
            element.textContent = currentService.pageKicker || '';
        });
    };

    const initFaqLabels = () => {
        const faqButtons = qsa('[data-faq-button]');

        faqButtons.forEach((button, index) => {
            const text = button.textContent.trim();

            if (!button.id) {
                button.id = `serviceFaqButton${index + 1}`;
            }

            if (text) {
                button.setAttribute('aria-label', text);
            }
        });
    };

    const initServiceHeroImage = () => {
        if (!currentService?.heroImage) return;

        const heroImage = qs('[data-current-service-hero-image]');

        if (heroImage) {
            heroImage.src = currentService.heroImage;
            heroImage.alt = '';
        }
    };

    const initServiceImage = () => {
        if (!currentService?.image) return;

        const serviceImage = qs('[data-current-service-image]');

        if (serviceImage) {
            serviceImage.src = currentService.image;
            serviceImage.alt = `${currentService.title} provider matching category`;
        }
    };

    const initRelatedServiceLinks = () => {
        const relatedMount = qs('[data-related-service-links]');
        if (!relatedMount) return;

        const services = Array.isArray(CONFIG.services) ? CONFIG.services : [];

        relatedMount.innerHTML = services
            .filter((service) => service.id !== currentServiceId)
            .map((service) => `
        <a class="service-related-link" href="${escapeHTML(service.href)}">
          <span class="service-related-link__icon">
            <i data-lucide="${escapeHTML(service.icon || 'wind')}" aria-hidden="true"></i>
          </span>

          <span>
            <strong>${escapeHTML(service.title)}</strong>
            <small>${escapeHTML(service.summary || '')}</small>
          </span>
        </a>
      `)
            .join('');
    };

    const init = () => {
        initServiceCopyFromConfig();
        initServiceHeroImage();
        initServiceImage();
        initTabs();
        initFaqSchema();
        initFaqLabels();
        initRelatedServiceLinks();
        refreshIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();