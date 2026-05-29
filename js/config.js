'use strict';

const SHARED_TAB_IMAGES = [
    './assets/images/tab-central-air.jpg',
    './assets/images/tab-ductless-mini-split.jpg',
    './assets/images/tab-heat-pump-cooling.jpg',
    './assets/images/tab-replacement-planning.jpg'
];

window.SITE_CONFIG = {
    companyName: 'HVAC',
    companyId: 'HVAC-MATCH-2026',

    brand: {
        shortName: 'HVAC',
        tagline: 'Independent HVAC provider matching',
        logoAlt: 'HVAC provider matching platform'
    },

    contact: {
        phoneRaw: '+18885550144',
        phoneDisplay: '(888) 555-0144',
        phoneButtonText: 'Call Now',
        email: 'hello@hvacmatch.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM'
    },

    address: {
        line1: '2450 North Central Avenue',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85004',
        country: 'USA',
        full: '2450 North Central Avenue, Phoenix, AZ 85004, USA'
    },

        replaceMap: {
        companyNames: [
            'HVAC'
        ],

        emails: [
            'hello@hvacmatch.com'
        ],

        phones: [
            '+18885550144',
            '(888) 555-0144',
            '888-555-0144',
            '888 555 0144'
        ],

        addresses: [
            '2450 North Central Avenue, Phoenix, AZ 85004, USA',
            '2450 North Central Avenue',
            'Phoenix, AZ 85004, USA'
        ],

        companyIds: [
            'HVAC-MATCH-2026'
        ]
    },

    serviceArea:
        'Independent HVAC provider matching across selected areas in the United States',

    disclaimer:
        'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',

    footerText:
        'HVAC is an independent provider matching platform that helps homeowners compare local HVAC provider options for cooling, heating, repair, ventilation and maintenance needs.',

    legalNotice:
        'HVAC is not a contractor and does not perform HVAC work directly. Provider availability, service scope, pricing, licensing and insurance vary by location and provider.',

    navigation: [
        {
            label: 'Home',
            href: 'index.html'
        },
        {
            label: 'Services',
            href: 'services.html'
        },
        {
            label: 'About',
            href: 'about.html'
        },
        {
            label: 'Contact',
            href: 'contact.html'
        }
    ],

    services: [
        {
            id: 'ac-installation',
            title: 'AC Installation',
            shortTitle: 'AC Installation',
            href: 'ac-installation.html',
            icon: 'snowflake',
            image: './assets/images/service-ac-installation.jpg',
            heroImage: './assets/images/hero-ac-installation.jpg',
            summary:
                'Compare independent provider options for air conditioning installation and replacement projects.',
            heroTitle: 'Compare AC installation provider options',
            heroText:
                'Explore local provider availability, quote details, equipment options and service terms before choosing who to contact.',
            cardText:
                'Review installation categories, equipment options, quote details and local provider availability.',
            pageKicker: 'Cooling provider matching',
            pageIntro:
                'AC installation projects can vary by home layout, equipment type, efficiency goals and local provider availability. HVAC helps homeowners compare independent provider options before deciding who to contact.',
            tabs: [
                {
                    id: 'central-air',
                    label: 'Central Air',
                    image: SHARED_TAB_IMAGES[0],
                    title: 'Central Air',
                    text:
                        'Central air systems use ductwork to distribute cooled air throughout the home.',
                    compare: [
                        'System size and capacity',
                        'Equipment brand and efficiency',
                        'Installation scope',
                        'Warranty and parts coverage',
                        'Provider availability and timing'
                    ]
                },
                {
                    id: 'ductless-mini-split',
                    label: 'Ductless Mini-Split',
                    image: SHARED_TAB_IMAGES[1],
                    title: 'Ductless Mini-Split',
                    text:
                        'Ductless mini-splits may be used for targeted comfort zones or spaces without existing ductwork.',
                    compare: [
                        'Number of zones',
                        'Indoor unit placement',
                        'Efficiency ratings',
                        'Electrical requirements',
                        'Provider installation terms'
                    ]
                },
                {
                    id: 'heat-pump-cooling',
                    label: 'Heat Pump Cooling',
                    image: SHARED_TAB_IMAGES[2],
                    title: 'Heat Pump Cooling',
                    text:
                        'Heat pumps can support both cooling and heating depending on the system type and climate needs.',
                    compare: [
                        'Cooling and heating capacity',
                        'Climate suitability',
                        'Energy efficiency',
                        'Equipment options',
                        'Maintenance expectations'
                    ]
                },
                {
                    id: 'replacement-planning',
                    label: 'Replacement Planning',
                    image: SHARED_TAB_IMAGES[3],
                    title: 'Replacement Planning',
                    text:
                        'Replacement planning helps homeowners compare timing, system options and provider quote details.',
                    compare: [
                        'Existing system condition',
                        'Replacement timeline',
                        'Removal and disposal details',
                        'Permit considerations',
                        'Quote terms and exclusions'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'How do I compare AC installation providers?',
                    answer:
                        'Compare independent providers by reviewing availability, equipment options, quote details, licensing, insurance and warranty terms before choosing who to contact.'
                },
                {
                    question: 'Does HVAC install air conditioners directly?',
                    answer:
                        'No. HVAC is an independent provider matching platform and does not perform HVAC work directly.'
                },
                {
                    question: 'What affects AC installation pricing?',
                    answer:
                        'Pricing can vary by system type, capacity, ductwork needs, home layout, equipment brand, permits and provider terms.'
                },
                {
                    question: 'Should I verify license and insurance?',
                    answer:
                        'Yes. Homeowners should verify licensing, insurance, quote terms and warranty details directly with any provider.'
                }
            ]
        },

        {
            id: 'hvac-repair',
            title: 'HVAC Repair',
            shortTitle: 'HVAC Repair',
            href: 'hvac-repair.html',
            icon: 'wrench',
            image: './assets/images/service-hvac-repair.jpg',
            heroImage: './assets/images/hero-hvac-repair.jpg',
            summary:
                'Connect with independent HVAC repair providers and compare availability, diagnostic terms and quote details.',
            heroTitle: 'Find HVAC repair provider options',
            heroText:
                'Review independent provider options for heating and cooling issues, system checks and repair-related requests.',
            cardText:
                'Compare local provider options for diagnostics, repair categories, response timing and service terms.',
            pageKicker: 'Repair provider matching',
            pageIntro:
                'HVAC repair requests can involve cooling problems, heating issues, airflow concerns or system diagnostics. HVAC helps homeowners review independent local provider options.',
            tabs: [
                {
                    id: 'cooling-issues',
                    label: 'Cooling Issues',
                    image: SHARED_TAB_IMAGES[0],
                    title: 'Cooling Issues',
                    text:
                        'Cooling issues may involve poor airflow, warm air, short cycling or system performance concerns.',
                    compare: [
                        'Diagnostic visit terms',
                        'Provider availability',
                        'Parts and labor details',
                        'Repair estimate clarity',
                        'Warranty or follow-up terms'
                    ]
                },
                {
                    id: 'heating-issues',
                    label: 'Heating Issues',
                    image: SHARED_TAB_IMAGES[1],
                    title: 'Heating Issues',
                    text:
                        'Heating issues may include uneven warmth, system startup problems or reduced performance.',
                    compare: [
                        'Heating system category',
                        'Inspection scope',
                        'Estimated timeline',
                        'Safety-related checks',
                        'Provider service terms'
                    ]
                },
                {
                    id: 'airflow-problems',
                    label: 'Airflow Problems',
                    image: SHARED_TAB_IMAGES[2],
                    title: 'Airflow Problems',
                    text:
                        'Airflow concerns can relate to ducts, filters, vents, blower components or system balance.',
                    compare: [
                        'Airflow inspection scope',
                        'Filter and duct considerations',
                        'Vent or return issues',
                        'System age',
                        'Quote inclusions'
                    ]
                },
                {
                    id: 'system-diagnostics',
                    label: 'System Diagnostics',
                    image: SHARED_TAB_IMAGES[3],
                    title: 'System Diagnostics',
                    text:
                        'Diagnostic visits help identify likely system issues before repair options are reviewed.',
                    compare: [
                        'Diagnostic fee terms',
                        'Report clarity',
                        'Repair recommendations',
                        'Provider credentials',
                        'Follow-up availability'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'Can HVAC send a repair technician?',
                    answer:
                        'HVAC does not send technicians or perform repair work directly. The platform helps users compare independent provider options.'
                },
                {
                    question: 'What should I ask before choosing a repair provider?',
                    answer:
                        'Ask about diagnostic fees, licensing, insurance, repair estimate details, parts coverage, warranty terms and availability.'
                },
                {
                    question: 'Are HVAC repair quotes always free?',
                    answer:
                        'Quote and diagnostic terms vary by provider. Homeowners should confirm any fees directly before scheduling.'
                },
                {
                    question: 'Does provider availability vary?',
                    answer:
                        'Yes. Availability can vary by ZIP code, service category, season and individual provider capacity.'
                }
            ]
        },

        {
            id: 'heating-systems',
            title: 'Heating Systems',
            shortTitle: 'Heating Systems',
            href: 'heating-systems.html',
            icon: 'flame',
            image: './assets/images/service-heating.jpg',
            heroImage: './assets/images/hero-heating-systems.jpg',
            summary:
                'Compare provider options for furnaces, heat pumps and other residential heating system needs.',
            heroTitle: 'Compare heating system provider options',
            heroText:
                'Review local provider options for heating system installation, replacement, service and maintenance categories.',
            cardText:
                'Explore provider options for furnaces, heat pumps, boilers and seasonal heating checks.',
            pageKicker: 'Heating provider matching',
            pageIntro:
                'Heating system projects can involve replacement planning, system checks, efficiency upgrades or service requests. HVAC helps homeowners compare independent provider options.',
            tabs: [
                {
                    id: 'furnace-options',
                    label: 'Furnace Options',
                    image: SHARED_TAB_IMAGES[0],
                    title: 'Furnace Options',
                    text:
                        'Furnace projects can involve replacement, service, safety checks or efficiency comparisons.',
                    compare: [
                        'Fuel type',
                        'Efficiency rating',
                        'System size',
                        'Installation scope',
                        'Warranty terms'
                    ]
                },
                {
                    id: 'heat-pumps',
                    label: 'Heat Pumps',
                    image: SHARED_TAB_IMAGES[1],
                    title: 'Heat Pumps',
                    text:
                        'Heat pumps may support efficient heating and cooling depending on home needs and climate conditions.',
                    compare: [
                        'Heating and cooling capacity',
                        'Climate suitability',
                        'Energy efficiency',
                        'Equipment options',
                        'Provider maintenance terms'
                    ]
                },
                {
                    id: 'boiler-categories',
                    label: 'Boiler Categories',
                    image: SHARED_TAB_IMAGES[2],
                    title: 'Boiler Categories',
                    text:
                        'Boiler-related requests may include service categories, replacement planning or system checks.',
                    compare: [
                        'Boiler type',
                        'System age',
                        'Service scope',
                        'Safety checks',
                        'Provider experience'
                    ]
                },
                {
                    id: 'seasonal-heating-checks',
                    label: 'Seasonal Heating Checks',
                    image: SHARED_TAB_IMAGES[3],
                    title: 'Seasonal Heating Checks',
                    text:
                        'Seasonal checks can help homeowners compare maintenance options before colder months.',
                    compare: [
                        'Inspection checklist',
                        'Filter and airflow review',
                        'Safety considerations',
                        'Maintenance plan terms',
                        'Scheduling availability'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'How do I compare heating providers?',
                    answer:
                        'Review licensing, insurance, service categories, quote terms, availability, equipment options and warranty details.'
                },
                {
                    question: 'Does HVAC service heating systems directly?',
                    answer:
                        'No. HVAC is an independent matching platform and does not perform heating work directly.'
                },
                {
                    question: 'What affects heating system pricing?',
                    answer:
                        'Pricing can vary by system type, fuel source, equipment capacity, home layout, installation scope and provider terms.'
                },
                {
                    question: 'Should I compare more than one provider?',
                    answer:
                        'Homeowners often benefit from reviewing more than one provider option when available.'
                }
            ]
        },

        {
            id: 'ventilation-maintenance',
            title: 'Ventilation & Maintenance',
            shortTitle: 'Ventilation',
            href: 'ventilation-maintenance.html',
            icon: 'wind',
            image: './assets/images/service-ventilation.jpg',
            heroImage: './assets/images/hero-ventilation-maintenance.jpg',
            summary:
                'Explore provider options for ventilation, airflow, maintenance plans and indoor comfort support.',
            heroTitle: 'Compare ventilation and maintenance options',
            heroText:
                'Find independent providers that may help with airflow, ventilation, seasonal maintenance and system care.',
            cardText:
                'Compare provider options for airflow review, duct care, seasonal tune-ups and indoor comfort support.',
            pageKicker: 'Airflow and maintenance matching',
            pageIntro:
                'Ventilation and maintenance needs can vary by home, system age, airflow concerns and seasonal priorities. HVAC helps users compare independent provider options.',
            tabs: [
                {
                    id: 'airflow-review',
                    label: 'Airflow Review',
                    image: SHARED_TAB_IMAGES[0],
                    title: 'Airflow Review',
                    text:
                        'Airflow reviews may help identify comfort inconsistencies, blocked vents or system balance concerns.',
                    compare: [
                        'Inspection scope',
                        'Vent and return review',
                        'System balance considerations',
                        'Provider experience',
                        'Recommended next steps'
                    ]
                },
                {
                    id: 'filter-duct-care',
                    label: 'Filter & Duct Care',
                    image: SHARED_TAB_IMAGES[1],
                    title: 'Filter & Duct Care',
                    text:
                        'Filter and duct care categories may support airflow quality and system performance.',
                    compare: [
                        'Filter guidance',
                        'Duct condition review',
                        'Cleaning scope',
                        'Maintenance frequency',
                        'Provider terms'
                    ]
                },
                {
                    id: 'seasonal-tune-up',
                    label: 'Seasonal Tune-Up',
                    image: SHARED_TAB_IMAGES[2],
                    title: 'Seasonal Tune-Up',
                    text:
                        'Seasonal tune-ups can help homeowners compare maintenance options before peak heating or cooling seasons.',
                    compare: [
                        'Tune-up checklist',
                        'Scheduling availability',
                        'System category',
                        'Plan options',
                        'Quote details'
                    ]
                },
                {
                    id: 'indoor-comfort-support',
                    label: 'Indoor Comfort Support',
                    image: SHARED_TAB_IMAGES[3],
                    title: 'Indoor Comfort Support',
                    text:
                        'Indoor comfort support may include airflow, humidity, filtration or system performance discussions.',
                    compare: [
                        'Comfort concerns',
                        'System recommendations',
                        'Indoor air factors',
                        'Maintenance options',
                        'Provider availability'
                    ]
                }
            ],
            faqs: [
                {
                    question: 'What does ventilation provider matching include?',
                    answer:
                        'It can include independent provider options for airflow review, filter and duct care, maintenance and indoor comfort categories.'
                },
                {
                    question: 'Does HVAC perform maintenance directly?',
                    answer:
                        'No. HVAC does not perform maintenance work directly. The platform helps homeowners compare independent provider options.'
                },
                {
                    question: 'What should I compare before choosing a provider?',
                    answer:
                        'Compare availability, inspection scope, licensing, insurance, quote terms, maintenance plan details and warranty information.'
                },
                {
                    question: 'Can provider options vary by location?',
                    answer:
                        'Yes. Provider availability and service categories can vary by ZIP code, city, season and provider capacity.'
                }
            ]
        }
    ],

    comparisonFactors: [
        {
            icon: 'calendar-check',
            title: 'Availability',
            text: 'Find providers who can help when your project timing matters.'
        },
        {
            icon: 'file-text',
            title: 'Quotes',
            text: 'Compare quote details, scope of work and included service terms.'
        },
        {
            icon: 'badge-check',
            title: 'Licensing',
            text: 'Verify licenses and local requirements before choosing a provider.'
        },
        {
            icon: 'shield-check',
            title: 'Insurance',
            text: 'Confirm insurance and liability coverage directly with providers.'
        },
        {
            icon: 'wind',
            title: 'Equipment',
            text: 'Compare brands, efficiency options and system features.'
        },
        {
            icon: 'badge-help',
            title: 'Warranties',
            text: 'Review warranty coverage, maintenance terms and follow-up details.'
        }
    ],

    processSteps: [
        {
            icon: 'clipboard-list',
            title: 'Tell us about your project',
            text: 'Share basic details about your HVAC category, timing and location.'
        },
        {
            icon: 'users',
            title: 'We match you with provider options',
            text: 'Review independent local provider options based on your request.'
        },
        {
            icon: 'list-checks',
            title: 'Compare details',
            text: 'Look at availability, quote terms, licensing, insurance and service scope.'
        },
        {
            icon: 'phone-call',
            title: 'You choose who to contact',
            text: 'Decide which provider option fits your project needs.'
        }
    ],

    forms: {
        contactTitle: 'Request HVAC provider matching',
        contactText:
            'Share a few details and compare independent provider options for your HVAC project.',
        successMessage:
            'Your request has been received. A matching specialist may follow up with next steps.',
        errorMessage: 'Please check the required fields and try again.',
        consentText:
            'I agree to be contacted about my request and understand that HVAC connects users with independent provider options.'
    },

    cookieBanner: {
        storageKey: 'hvac_cookie_choice',
        title: 'Cookie preferences',
        text:
            'This website may use cookies and local storage to improve usability and remember your preferences.',
        accept: 'Accept',
        decline: 'Decline',
        links: [
            {
                label: 'Privacy Policy',
                href: 'privacy-policy.html'
            },
            {
                label: 'Cookie Policy',
                href: 'cookie-policy.html'
            },
            {
                label: 'Terms of Service',
                href: 'terms-of-service.html'
            }
        ]
    },

    pageMeta: {
        'index.html': {
            title: 'HVAC | Independent HVAC Provider Matching Platform',
            description:
                'Compare independent HVAC provider options for AC installation, repair, heating systems, ventilation and maintenance categories.'
        },
        'services.html': {
            title: 'HVAC Services | Compare Independent Provider Options',
            description:
                'Explore HVAC provider matching categories including AC installation, HVAC repair, heating systems, ventilation and maintenance.'
        },
        'about.html': {
            title: 'About HVAC | Independent HVAC Matching Platform',
            description:
                'Learn how HVAC helps homeowners compare independent local provider options without performing HVAC work directly.'
        },
        'contact.html': {
            title: 'Contact HVAC | Request Provider Matching',
            description:
                'Request HVAC provider matching and compare independent local provider options for cooling, heating, repair and ventilation needs.'
        },
        'ac-installation.html': {
            title: 'AC Installation Provider Options | HVAC',
            description:
                'Compare independent provider options for AC installation, central air, ductless mini-splits and replacement planning.'
        },
        'hvac-repair.html': {
            title: 'HVAC Repair Provider Options | HVAC',
            description:
                'Compare independent HVAC repair provider options for cooling issues, heating issues, airflow problems and diagnostics.'
        },
        'heating-systems.html': {
            title: 'Heating System Provider Options | HVAC',
            description:
                'Compare independent provider options for furnaces, heat pumps, boiler categories and seasonal heating checks.'
        },
        'ventilation-maintenance.html': {
            title: 'Ventilation & Maintenance Provider Options | HVAC',
            description:
                'Compare provider options for airflow review, filter and duct care, seasonal tune-ups and indoor comfort support.'
        },
        'privacy-policy.html': {
            title: 'Privacy Policy | HVAC',
            description:
                'Read the HVAC privacy policy for this independent HVAC provider matching platform.'
        },
        'cookie-policy.html': {
            title: 'Cookie Policy | HVAC',
            description:
                'Read the HVAC cookie policy for website cookies, local storage and preference settings.'
        },
        'terms-of-service.html': {
            title: 'Terms of Service | HVAC',
            description:
                'Read the HVAC terms of service for using this independent provider matching website.'
        }
    }
};