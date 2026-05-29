'use strict';

(function () {
    const CONFIG = window.SITE_CONFIG || {};

    const SELECTORS = {
        headerMount: '[data-site-header]',
        footerMount: '[data-site-footer]',
        policyBannerMount: '[data-policy-banner]',
        serviceCards: '[data-service-cards]'
    };

    const state = {
        mobileMenuOpen: false,
        previousFocus: null,
        dropdownTimer: null,
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    const getCurrentPage = () => {
        const page = window.location.pathname.split('/').pop();
        return page || 'index.html';
    };

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

    const getServices = () => Array.isArray(CONFIG.services) ? CONFIG.services : [];

    const getNavItems = () => Array.isArray(CONFIG.navigation) ? CONFIG.navigation : [];

    const icon = (name, className = '') => {
        return `<i class="${className}" data-lucide="${escapeHTML(name)}" aria-hidden="true"></i>`;
    };

    const buildLogoIcon = (idSuffix = 'main') => {
        const gradientId = `hvacLogoGradient-${idSuffix}`;

        return `
      <svg class="site-logo__svg" viewBox="0 0 100 100" role="img" aria-label="${escapeHTML(CONFIG.brand?.logoAlt || 'HVAC provider matching platform')}">
        <defs>
          <linearGradient id="${gradientId}" x1="20%" y1="10%" x2="84%" y2="92%">
            <stop offset="0%" stop-color="#ffb15a"></stop>
            <stop offset="46%" stop-color="#ff8a1f"></stop>
            <stop offset="100%" stop-color="#ff6414"></stop>
          </linearGradient>
        </defs>

        <g class="site-logo__fan" fill="url(#${gradientId})">
          <path d="M50 8c10.8 1.2 18.3 8.4 18.9 18.1.3 5.7-2.2 10.9-6.2 14.3-5.1-4.6-10.9-7.1-17.5-6.8C42.4 23.2 43.8 13.7 50 8Z"></path>
          <path d="M90.1 38.1c2.2 10.6-2.5 20-11.5 23.6-5.3 2.1-11.1 1.3-15.6-1.3 2.8-6.3 3.4-12.6 1.1-18.8 8.8-6.1 18.3-7.7 26-3.5Z"></path>
          <path d="M74.8 88.3c-9.4 5.4-19.8 3.9-26.1-3.5-3.7-4.3-5-10-4-15.1 6.9.7 13-1 18.1-5.2 8.5 6.5 12.8 15.1 12 23.8Z"></path>
          <path d="M21.3 84.9C13.2 77.7 11.4 67.3 17 59.4c3.3-4.6 8.5-7.3 13.7-7.7 1.5 6.7 5 12 10.6 15.5-3.6 10.1-10.4 16.8-20 17.7Z"></path>
          <path d="M9.7 31.4c4.4-9.9 13.8-14.7 23.2-12.2 5.5 1.5 9.9 5.3 12.1 10-5.9 3.5-10 8.3-11.8 14.7-10.7-.2-19.3-4.4-23.5-12.5Z"></path>
        </g>

        <circle class="site-logo__hub" cx="50" cy="50" r="12.4" fill="#041224"></circle>
        <circle class="site-logo__hub-ring" cx="50" cy="50" r="8.2" fill="url(#${gradientId})"></circle>
        <circle class="site-logo__hub-dot" cx="50" cy="50" r="3.3" fill="#fff7ef"></circle>
      </svg>
    `;
    };

    const buildLogo = (location = 'header') => {
        return `
      <a class="site-logo site-logo--${escapeHTML(location)}" href="index.html" aria-label="${escapeHTML(CONFIG.companyName || 'HVAC')} home">
        <span class="site-logo__icon" aria-hidden="true">
          ${buildLogoIcon(location)}
        </span>
        <span class="site-logo__text">${escapeHTML(CONFIG.brand?.shortName || CONFIG.companyName || 'HVAC')}</span>
      </a>
    `;
    };

    const buildServiceDropdown = () => {
        const services = getServices();

        return `
      <div class="services-dropdown" data-services-panel>
        <div class="services-dropdown__inner">
          ${services.map((service) => `
            <a class="services-dropdown__link" href="${escapeHTML(service.href)}">
              <span class="services-dropdown__icon">
                ${icon(service.icon || 'wind')}
              </span>
              <span class="services-dropdown__content">
                <strong>${escapeHTML(service.title)}</strong>
                <small>${escapeHTML(service.summary)}</small>
              </span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
    };

    const buildDesktopNav = () => {
        const currentPage = getCurrentPage();

        return `
      <nav class="site-nav" aria-label="Primary navigation">
        <ul class="site-nav__list">
          ${getNavItems().map((item) => {
            const isActive = currentPage === item.href || (currentPage === '' && item.href === 'index.html');

            if (item.label.toLowerCase() === 'services') {
                const serviceActive = getServices().some((service) => currentPage === service.href) || currentPage === 'services.html';

                return `
                <li class="site-nav__item site-nav__item--dropdown ${serviceActive ? 'is-active' : ''}" data-services-dropdown>
                  <a
                    class="site-nav__link"
                    href="${escapeHTML(item.href)}"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-services-trigger
                  >
                    <span>${escapeHTML(item.label)}</span>
                    ${icon('chevron-down', 'site-nav__chevron')}
                  </a>
                  ${buildServiceDropdown()}
                </li>
              `;
            }

            return `
              <li class="site-nav__item ${isActive ? 'is-active' : ''}">
                <a class="site-nav__link" href="${escapeHTML(item.href)}">
                  ${escapeHTML(item.label)}
                </a>
              </li>
            `;
        }).join('')}
        </ul>
      </nav>
    `;
    };

    const buildHeaderInner = () => {
        const phoneRaw = CONFIG.contact?.phoneRaw || '';
        const phoneDisplay = CONFIG.contact?.phoneDisplay || '';
        const email = CONFIG.contact?.email || '';

        return `
      <div class="site-header__bar">
        <div class="container site-header__inner">
          ${buildLogo('header')}

          ${buildDesktopNav()}

          <div class="site-header__actions" aria-label="Header contact actions">
            <a class="btn btn--primary site-header__phone" href="tel:${escapeHTML(phoneRaw)}">
              <span>${escapeHTML(phoneDisplay)}</span>
            </a>

            <a class="btn btn--outline site-header__email" href="mailto:${escapeHTML(email)}">
              <span>Write Us</span>
            </a>

            <button
              class="mobile-menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              data-mobile-menu-open
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    `;
    };

    const mountHeader = () => {
        const mount = qs(SELECTORS.headerMount);
        if (!mount) return;

        const tagName = mount.tagName.toLowerCase();

        if (tagName === 'header') {
            mount.className = 'site-header';
            mount.setAttribute('data-header', '');
            mount.innerHTML = buildHeaderInner();
            return;
        }

        mount.innerHTML = `
      <header class="site-header" data-header>
        ${buildHeaderInner()}
      </header>
    `;
    };

    const buildFooter = () => {
        const services = getServices();
        const navItems = getNavItems();

        return `
      <footer class="site-footer" aria-label="Site footer">
        <div class="container">
          <div class="site-footer__top">
            <div class="site-footer__brand">
              ${buildLogo('footer')}
              <p data-footer-text>${escapeHTML(CONFIG.footerText || '')}</p>
              <p class="site-footer__notice" data-legal-notice>${escapeHTML(CONFIG.legalNotice || '')}</p>
            </div>

            <div class="site-footer__column">
              <h2 class="site-footer__title">Navigation</h2>
              <ul class="site-footer__links">
                ${navItems.map((item) => `
                  <li>
                    <a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div class="site-footer__column">
              <h2 class="site-footer__title">Services</h2>
              <ul class="site-footer__links">
                ${services.map((service) => `
                  <li>
                    <a href="${escapeHTML(service.href)}">${escapeHTML(service.title)}</a>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div class="site-footer__column">
              <h2 class="site-footer__title">Contact</h2>
              <ul class="site-footer__contact">
                <li>
                  ${icon('phone')}
                  <a href="tel:${escapeHTML(CONFIG.contact?.phoneRaw || '')}" data-phone-link>
                    <span data-phone-text>${escapeHTML(CONFIG.contact?.phoneDisplay || '')}</span>
                  </a>
                </li>
                <li>
                  ${icon('mail')}
                  <a href="mailto:${escapeHTML(CONFIG.contact?.email || '')}" data-email-link>
                    <span data-email-text>${escapeHTML(CONFIG.contact?.email || '')}</span>
                  </a>
                </li>
                <li>
                  ${icon('map-pin')}
                  <span data-address-text>${escapeHTML(CONFIG.address?.full || '')}</span>
                </li>
                <li>
                  ${icon('clock')}
                  <span>${escapeHTML(CONFIG.contact?.supportHours || '')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="site-footer__middle">
            <p class="site-footer__disclaimer" data-disclaimer>
              ${escapeHTML(CONFIG.disclaimer || '')}
            </p>
          </div>

          <div class="site-footer__bottom">
            <p>
              <span data-company-id>${escapeHTML(CONFIG.companyId || '')}</span>
            </p>

            <ul class="site-footer__legal">
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="cookie-policy.html">Cookie Policy</a></li>
              <li><a href="terms-of-service.html">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    `;
    };

    const mountFooter = () => {
        const mount = qs(SELECTORS.footerMount);
        if (!mount) return;

        const tagName = mount.tagName.toLowerCase();

        if (tagName === 'footer') {
            mount.className = 'site-footer';
            mount.innerHTML = buildFooter().replace(/^<footer[^>]*>|<\/footer>$/g, '');
            return;
        }

        mount.innerHTML = buildFooter();
    };

    const buildMobileMenu = () => {
        if (qs('#mobileMenu')) return;

        const services = getServices();
        const navItems = getNavItems();

        const menu = document.createElement('aside');
        menu.className = 'mobile-menu';
        menu.id = 'mobileMenu';
        menu.setAttribute('role', 'dialog');
        menu.setAttribute('aria-modal', 'true');
        menu.setAttribute('aria-labelledby', 'mobileMenuTitle');
        menu.setAttribute('inert', '');

        menu.innerHTML = `
      <button class="mobile-menu__backdrop" type="button" aria-label="Close menu" data-mobile-menu-close></button>

      <div class="mobile-menu__panel">
        <div class="mobile-menu__head">
          ${buildLogo('mobile')}
          <button class="mobile-menu__close" type="button" aria-label="Close menu" data-mobile-menu-close>
            ${icon('x')}
          </button>
        </div>

        <div class="mobile-menu__body">
          <div>
            <p class="mobile-menu__eyebrow">Menu</p>
            <h2 class="mobile-menu__title" id="mobileMenuTitle">Compare HVAC provider options</h2>
          </div>

          <nav class="mobile-menu__nav" aria-label="Mobile navigation">
            ${navItems.map((item) => `
              <a class="mobile-menu__nav-link" href="${escapeHTML(item.href)}">
                <span>${escapeHTML(item.label)}</span>
                ${icon('arrow-up-right')}
              </a>
            `).join('')}
          </nav>

          <div class="mobile-menu__services">
            <p class="mobile-menu__eyebrow">Services</p>
            <div class="mobile-menu__service-list" data-mobile-services-list>
              ${services.map((service) => `
                <a class="mobile-menu__service" href="${escapeHTML(service.href)}">
                  <span class="mobile-menu__service-icon">
                    ${icon(service.icon || 'wind')}
                  </span>
                  <span>
                    <strong>${escapeHTML(service.title)}</strong>
                    <small>${escapeHTML(service.summary)}</small>
                  </span>
                </a>
              `).join('')}
            </div>
          </div>

          <div class="mobile-menu__contact">
            <a class="btn btn--primary" href="tel:${escapeHTML(CONFIG.contact?.phoneRaw || '')}">
              ${icon('phone')}
              <span>${escapeHTML(CONFIG.contact?.phoneDisplay || '')}</span>
            </a>

            <a class="btn btn--outline" href="mailto:${escapeHTML(CONFIG.contact?.email || '')}">
              ${icon('mail')}
              <span>${escapeHTML(CONFIG.contact?.email || '')}</span>
            </a>
          </div>
        </div>
      </div>
    `;

        document.body.appendChild(menu);
    };

    const getFocusableElements = (container) => {
        if (!container) return [];

        return qsa(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            container
        ).filter((element) => {
            return !element.hasAttribute('disabled') && element.offsetParent !== null;
        });
    };

    const setMobileMenuInert = (menu, inert) => {
        if (!menu) return;

        if ('inert' in menu) {
            menu.inert = inert;
        }

        if (inert) {
            menu.setAttribute('inert', '');
        } else {
            menu.removeAttribute('inert');
        }
    };

    const openMobileMenu = () => {
        const menu = qs('#mobileMenu');
        const trigger = qs('[data-mobile-menu-open]');
        if (!menu || state.mobileMenuOpen) return;

        state.mobileMenuOpen = true;
        state.previousFocus = document.activeElement;

        setMobileMenuInert(menu, false);

        document.documentElement.classList.add('is-menu-open');
        document.body.classList.add('is-menu-open');

        menu.classList.add('is-open');
        trigger?.setAttribute('aria-expanded', 'true');

        const focusable = getFocusableElements(menu);
        const closeButton = qs('[data-mobile-menu-close]', menu);

        window.setTimeout(() => {
            (closeButton || focusable[0])?.focus();
        }, 30);
    };

    const closeMobileMenu = () => {
        const menu = qs('#mobileMenu');
        const trigger = qs('[data-mobile-menu-open]');
        if (!menu || !state.mobileMenuOpen) return;

        state.mobileMenuOpen = false;

        document.documentElement.classList.remove('is-menu-open');
        document.body.classList.remove('is-menu-open');

        menu.classList.remove('is-open');
        trigger?.setAttribute('aria-expanded', 'false');

        window.setTimeout(() => {
            setMobileMenuInert(menu, true);
            state.previousFocus?.focus?.();
            state.previousFocus = null;
        }, 220);
    };

    const trapMobileMenuFocus = (event) => {
        if (!state.mobileMenuOpen || event.key !== 'Tab') return;

        const menu = qs('#mobileMenu');
        const focusable = getFocusableElements(menu);
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }

        if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const initMobileMenu = () => {
        buildMobileMenu();

        document.addEventListener('click', (event) => {
            const openButton = event.target.closest('[data-mobile-menu-open]');
            const closeButton = event.target.closest('[data-mobile-menu-close]');
            const mobileLink = event.target.closest('#mobileMenu a');

            if (openButton) {
                openMobileMenu();
            }

            if (closeButton || mobileLink) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }

            trapMobileMenuFocus(event);
        });
    };

    const initServicesDropdown = () => {
        const dropdowns = qsa('[data-services-dropdown]');

        dropdowns.forEach((dropdown) => {
            const trigger = qs('[data-services-trigger]', dropdown);

            const open = () => {
                window.clearTimeout(state.dropdownTimer);
                dropdown.classList.add('is-open');
                trigger?.setAttribute('aria-expanded', 'true');
            };

            const close = () => {
                state.dropdownTimer = window.setTimeout(() => {
                    dropdown.classList.remove('is-open');
                    trigger?.setAttribute('aria-expanded', 'false');
                }, 180);
            };

            dropdown.addEventListener('pointerenter', open);
            dropdown.addEventListener('pointerleave', close);

            dropdown.addEventListener('focusin', open);
            dropdown.addEventListener('focusout', (event) => {
                if (!dropdown.contains(event.relatedTarget)) {
                    close();
                }
            });
        });
    };

    const initStickyHeader = () => {
        const header = qs('[data-header]');
        if (!header) return;

        const update = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
    };

    const applyPageMeta = () => {
        const page = getCurrentPage();
        const meta = CONFIG.pageMeta?.[page];
        if (!meta) return;

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let description = qs('meta[name="description"]');

            if (!description) {
                description = document.createElement('meta');
                description.setAttribute('name', 'description');
                document.head.appendChild(description);
            }

            description.setAttribute('content', meta.description);
        }
    };

    const injectDataAttributes = () => {
        const values = {
            companyName: CONFIG.companyName || '',
            companyId: CONFIG.companyId || '',
            phoneRaw: CONFIG.contact?.phoneRaw || '',
            phoneDisplay: CONFIG.contact?.phoneDisplay || '',
            phoneButtonText: CONFIG.contact?.phoneButtonText || '',
            email: CONFIG.contact?.email || '',
            address: CONFIG.address?.full || '',
            serviceArea: CONFIG.serviceArea || '',
            footerText: CONFIG.footerText || '',
            disclaimer: CONFIG.disclaimer || '',
            legalNotice: CONFIG.legalNotice || ''
        };

        qsa('[data-company-name]').forEach((el) => {
            el.textContent = values.companyName;
        });

        qsa('[data-company-id]').forEach((el) => {
            el.textContent = values.companyId;
        });

        qsa('[data-phone-link]').forEach((el) => {
            el.setAttribute('href', `tel:${values.phoneRaw}`);
            el.setAttribute('aria-label', `Call ${values.phoneDisplay}`);
        });

        qsa('[data-phone-text]').forEach((el) => {
            const mode = el.getAttribute('data-phone-text');

            if (mode === 'button') {
                el.textContent = values.phoneButtonText || values.phoneDisplay;
            } else {
                el.textContent = values.phoneDisplay;
            }
        });

        qsa('[data-email-link]').forEach((el) => {
            el.setAttribute('href', `mailto:${values.email}`);
            el.setAttribute('aria-label', `Email ${values.email}`);
        });

        qsa('[data-email-text]').forEach((el) => {
            el.textContent = values.email;
        });

        qsa('[data-address-text]').forEach((el) => {
            el.textContent = values.address;
        });

        qsa('[data-service-area]').forEach((el) => {
            el.textContent = values.serviceArea;
        });

        qsa('[data-footer-text]').forEach((el) => {
            el.textContent = values.footerText;
        });

        qsa('[data-disclaimer]').forEach((el) => {
            el.textContent = values.disclaimer;
        });

        qsa('[data-legal-notice]').forEach((el) => {
            el.textContent = values.legalNotice;
        });
    };

    const replaceTextTokens = () => {
        const replacements = {
            '{{companyName}}': CONFIG.companyName || '',
            '{{phoneDisplay}}': CONFIG.contact?.phoneDisplay || '',
            '{{phoneRaw}}': CONFIG.contact?.phoneRaw || '',
            '{{email}}': CONFIG.contact?.email || '',
            '{{address}}': CONFIG.address?.full || '',
            '{{companyId}}': CONFIG.companyId || '',
            '{{serviceArea}}': CONFIG.serviceArea || ''
        };

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;

                    if (!parent) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT'].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return node.nodeValue.includes('{{')
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach((node) => {
            let text = node.nodeValue;

            Object.entries(replacements).forEach(([token, value]) => {
                text = text.replaceAll(token, value);
            });

            node.nodeValue = text;
        });
    };

    const buildServiceCard = (service) => {
        return `
      <article class="service-card" data-reveal>
        <a class="service-card__link" href="${escapeHTML(service.href)}" aria-label="View ${escapeHTML(service.title)} provider options">
          <img
            class="service-card__image"
            src="${escapeHTML(service.image)}"
            alt="${escapeHTML(service.title)} provider matching category"
            loading="lazy"
            width="720"
            height="640"
          >

          <span class="service-card__shade" aria-hidden="true"></span>
          <span class="service-card__scan" aria-hidden="true"></span>

          <span class="service-card__icon">
            ${icon(service.icon || 'wind')}
          </span>

          <span class="service-card__content">
            <strong>${escapeHTML(service.title)}</strong>
            <span>${escapeHTML(service.cardText || service.summary || '')}</span>
            <em>View options ${icon('arrow-right')}</em>
          </span>
        </a>
      </article>
    `;
    };

    const renderServiceCards = () => {
        const mounts = qsa(SELECTORS.serviceCards);
        if (!mounts.length) return;

        const services = getServices();

        mounts.forEach((mount) => {
            const limit = Number(mount.getAttribute('data-limit')) || services.length;
            const selected = services.slice(0, limit);

            mount.innerHTML = selected.map(buildServiceCard).join('');
        });
    };

    const buildCookieBanner = () => {
        const config = CONFIG.cookieBanner;
        if (!config?.storageKey) return '';

        const links = Array.isArray(config.links) ? config.links : [];

        return `
      <div class="cookie-banner" data-cookie-banner role="region" aria-label="Cookie preferences">
        <div class="cookie-banner__content">
          <div>
            <h2 class="cookie-banner__title">${escapeHTML(config.title || 'Cookie preferences')}</h2>
            <p class="cookie-banner__text">${escapeHTML(config.text || '')}</p>

            <ul class="cookie-banner__links">
              ${links.map((link) => `
                <li>
                  <a href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="cookie-banner__actions">
            <button class="btn btn--outline btn--small" type="button" data-cookie-choice="declined">
              ${escapeHTML(config.decline || 'Decline')}
            </button>

            <button class="btn btn--primary btn--small" type="button" data-cookie-choice="accepted">
              ${escapeHTML(config.accept || 'Accept')}
            </button>
          </div>
        </div>
      </div>
    `;
    };

    const initCookieBanner = () => {
        const config = CONFIG.cookieBanner;
        if (!config?.storageKey) return;

        let mount = qs(SELECTORS.policyBannerMount);

        if (!mount) {
            mount = document.createElement('div');
            mount.setAttribute('data-policy-banner', '');
            document.body.appendChild(mount);
        }

        const savedChoice = window.localStorage.getItem(config.storageKey);

        if (savedChoice) {
            mount.innerHTML = '';
            mount.hidden = true;
            return;
        }

        mount.hidden = false;
        mount.innerHTML = buildCookieBanner();

        mount.addEventListener('click', (event) => {
            const button = event.target.closest('[data-cookie-choice]');
            if (!button) return;

            const choice = button.getAttribute('data-cookie-choice');
            window.localStorage.setItem(config.storageKey, choice || 'selected');

            const banner = qs('[data-cookie-banner]', mount);
            banner?.classList.add('is-hiding');

            window.setTimeout(() => {
                mount.innerHTML = '';
                mount.hidden = true;
            }, 220);
        });
    };

    const initFAQAccordions = () => {
        const faqItems = qsa('[data-faq-item]');

        faqItems.forEach((item, index) => {
            const button = qs('[data-faq-button]', item);
            const panel = qs('[data-faq-panel]', item);

            if (!button || !panel) return;

            const buttonId = button.id || `faq-button-${index + 1}`;
            const panelId = panel.id || `faq-panel-${index + 1}`;

            button.id = buttonId;
            panel.id = panelId;

            button.setAttribute('aria-controls', panelId);
            button.setAttribute('aria-expanded', 'false');
            panel.setAttribute('role', 'region');
            panel.setAttribute('aria-labelledby', buttonId);
            panel.hidden = true;

            button.addEventListener('click', () => {
                const isOpen = button.getAttribute('aria-expanded') === 'true';

                button.setAttribute('aria-expanded', String(!isOpen));
                item.classList.toggle('is-open', !isOpen);
                panel.hidden = isOpen;
            });
        });
    };

    const initRevealAnimations = () => {
        const items = qsa('[data-reveal]');

        if (!items.length) return;

        if (state.reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        items.forEach((item) => observer.observe(item));
    };

    const initSmoothAnchorLinks = () => {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = qs(href);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: state.reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    };

    const refreshIcons = () => {
        if (window.lucide?.createIcons) {
            window.lucide.createIcons();
        }
    };

    const exposeHelpers = () => {
        window.HVACSite = {
            config: CONFIG,
            services: getServices(),
            currentPage: getCurrentPage(),
            refreshIcons,
            closeMobileMenu,
            escapeHTML
        };
    };

    const init = () => {
        applyPageMeta();

        mountHeader();
        mountFooter();

        renderServiceCards();

        injectDataAttributes();
        replaceTextTokens();

        initMobileMenu();
        initServicesDropdown();
        initStickyHeader();
        initCookieBanner();
        initFAQAccordions();
        initRevealAnimations();
        initSmoothAnchorLinks();

        refreshIcons();
        exposeHelpers();

        document.documentElement.classList.add('site-ready');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();