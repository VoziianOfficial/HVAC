'use strict';

(function () {
    const form = document.querySelector('[data-contact-form]');
    const CONFIG = window.SITE_CONFIG || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const isEmailValid = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
    };

    const isZipValid = (value) => {
        return /^[0-9]{5}(?:-[0-9]{4})?$/.test(String(value).trim());
    };

    const setFormCopy = () => {
        const title = qs('[data-form-title]');
        const text = qs('[data-form-text]');
        const success = qs('[data-form-success]');
        const error = qs('[data-form-error]');

        if (title && CONFIG.forms?.contactTitle) {
            title.textContent = CONFIG.forms.contactTitle;
        }

        if (text && CONFIG.forms?.contactText) {
            text.textContent = CONFIG.forms.contactText;
        }

        if (success && CONFIG.forms?.successMessage) {
            success.textContent = CONFIG.forms.successMessage;
        }

        if (error && CONFIG.forms?.errorMessage) {
            error.textContent = CONFIG.forms.errorMessage;
        }
    };

    const getFieldWrapper = (field) => {
        return field.closest('.form-field');
    };

    const showFieldError = (field) => {
        const wrapper = getFieldWrapper(field);

        field.setAttribute('aria-invalid', 'true');
        wrapper?.classList.add('has-error');
    };

    const clearFieldError = (field) => {
        const wrapper = getFieldWrapper(field);

        field.removeAttribute('aria-invalid');
        wrapper?.classList.remove('has-error');
    };

    const validateField = (field) => {
        const type = field.getAttribute('type');
        const tagName = field.tagName.toLowerCase();
        const value = String(field.value || '').trim();

        if (type === 'checkbox') {
            return field.checked;
        }

        if (!value) {
            return false;
        }

        if (type === 'email') {
            return isEmailValid(value);
        }

        if (field.name === 'zipCode') {
            return isZipValid(value);
        }

        if (tagName === 'select') {
            return Boolean(value);
        }

        return true;
    };

    const validateForm = () => {
        if (!form) return false;

        const requiredFields = qsa('[data-form-required]', form);
        let isValid = true;
        let firstInvalid = null;

        requiredFields.forEach((field) => {
            const fieldValid = validateField(field);

            if (!fieldValid) {
                isValid = false;
                firstInvalid = firstInvalid || field;
                showFieldError(field);
            } else {
                clearFieldError(field);
            }
        });

        if (firstInvalid) {
            firstInvalid.focus({ preventScroll: true });
            firstInvalid.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'center'
            });
        }

        return isValid;
    };

    const showMessage = (type) => {
        const success = qs('[data-form-success]', form);
        const error = qs('[data-form-error]', form);

        success?.classList.toggle('is-visible', type === 'success');
        error?.classList.toggle('is-visible', type === 'error');
    };

    const resetMessages = () => {
        const success = qs('[data-form-success]', form);
        const error = qs('[data-form-error]', form);

        success?.classList.remove('is-visible');
        error?.classList.remove('is-visible');
    };

    const clearAllErrors = () => {
        qsa('[data-form-required]', form).forEach(clearFieldError);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        resetMessages();

        const isValid = validateForm();

        if (!isValid) {
            showMessage('error');
            return;
        }

        clearAllErrors();
        showMessage('success');

        form.reset();

        const success = qs('[data-form-success]', form);
        success?.focus?.();
    };

    const initLiveValidation = () => {
        const requiredFields = qsa('[data-form-required]', form);

        requiredFields.forEach((field) => {
            const eventName = field.type === 'checkbox' || field.tagName.toLowerCase() === 'select'
                ? 'change'
                : 'input';

            field.addEventListener(eventName, () => {
                resetMessages();

                if (validateField(field)) {
                    clearFieldError(field);
                }
            });

            field.addEventListener('blur', () => {
                if (!validateField(field) && String(field.value || '').trim()) {
                    showFieldError(field);
                }
            });
        });
    };

    const enhanceSelect = () => {
        const selects = qsa('select.form-select', form);

        selects.forEach((select) => {
            select.addEventListener('change', () => {
                select.classList.toggle('has-value', Boolean(select.value));
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
        setFormCopy();

        if (!form) {
            refreshIcons();
            return;
        }

        form.addEventListener('submit', handleSubmit);

        initLiveValidation();
        enhanceSelect();
        refreshIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();