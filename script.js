document.addEventListener('DOMContentLoaded', function() {
    // Fix the disappearing content issue immediately
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
    
    // Theme Toggle Functionality
    const initThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            htmlElement.dataset.theme = savedTheme;
        } else if (prefersDarkMode) {
            htmlElement.dataset.theme = 'dark';
        }
        
        // Toggle theme when button is clicked
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = htmlElement.dataset.theme;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                htmlElement.dataset.theme = newTheme;
                localStorage.setItem('theme', newTheme);
                
                console.log(`Theme changed to ${newTheme} mode`);
            });
        }
    };
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Language Toggle Functionality
    const initLanguageToggle = () => {
        const langToggle = document.querySelector('.lang-toggle');
        const htmlElement = document.documentElement;
        
        // Check for saved language preference or default to English
        const savedLang = localStorage.getItem('lang') || 'en';
        htmlElement.setAttribute('lang', savedLang);
        
        // Update button text based on current language
        if (langToggle) {
            langToggle.textContent = savedLang === 'ar' ? 'عربي' : 'EN';
        }
        
        // Translation data for UI elements only
        const translations = {
            en: {
                // Navigation
                home: "Home",
                learningPaths: "Learning Paths",
                about: "About",
                contact: "Contact",
                
                // Home page
                headerText: "Master Your Learning Journey",
                headerSubtext: "Curated educational plans for software developers and other professionals",
                exploreBtn: "Explore Learning Paths",
                popularPaths: "Popular Learning Paths",
                viewPath: "View Path",
                whyChoose: "Why Choose Our Learning Paths?",
                
                // Footer
                yourGuide: "Your guide to professional development",
                quickLinks: "Quick Links",
                stayUpdated: "Stay Updated",
                newsletter: "Subscribe to our newsletter for new learning paths and resources",
                yourEmail: "Your email address",
                subscribe: "Subscribe",
                copyright: "© 2025 Twentyone. All rights reserved.",
                
                // About page
                aboutTwentyone: "About Twentyone",
                ourStory: "Our Story, Mission, and the Team",
                ourMission: "Our Mission",
                ourValues: "Our Values",
                meetTeam: "Meet Our Team",
                startJourney: "Start Your Learning Journey Today",
                explorePaths: "Explore our structured learning paths and take your skills to the next level",
                viewLearningPaths: "View Learning Paths",
                contactUs: "Contact Us",
                
                // Contact page
                contactUs: "Contact Us",
                getInTouch: "Get in touch with our team for questions, feedback, or collaboration",
                sendMessage: "Send Us a Message",
                yourName: "Your Name",
                emailAddress: "Email Address",
                subject: "Subject",
                message: "Message",
                sendBtn: "Send Message",
                contactInfo: "Contact Information",
                email: "Email",
                followUs: "Follow Us",
                faq: "FAQ",
                faqTitle: "Frequently Asked Questions",
                
                // Filter section on learning paths page
                filterByField: "Filter by Field",
                allPaths: "All Paths",
                webDev: "Web Development",
                dataScience: "Data Science",
                mobileDev: "Mobile Development",
                devOps: "DevOps",
                otherFields: "Other Fields"
            },
            ar: {
                // Navigation
                home: "الرئيسية",
                learningPaths: "مسارات التعلم",
                about: "حول",
                contact: "اتصل بنا",
                
                // Home page
                headerText: "اتقن رحلة التعلم الخاصة بك",
                headerSubtext: "خطط تعليمية مختارة للمطورين والمهنيين الآخرين",
                exploreBtn: "استكشاف مسارات التعلم",
                popularPaths: "مسارات التعلم الشائعة",
                viewPath: "عرض المسار",
                whyChoose: "لماذا تختار مسارات التعلم لدينا؟",
                
                // Footer
                yourGuide: "دليلك للتطوير المهني",
                quickLinks: "روابط سريعة",
                stayUpdated: "ابق على اطلاع",
                newsletter: "اشترك في نشرتنا الإخبارية للحصول على مسارات تعليمية وموارد جديدة",
                yourEmail: "عنوان بريدك الإلكتروني",
                subscribe: "اشترك",
                copyright: "© 2025 تونتي ون. جميع الحقوق محفوظة.",
                
                // About page
                aboutTwentyone: "حول تونتي ون",
                ourStory: "قصتنا، مهمتنا، والفريق",
                ourMission: "مهمتنا",
                ourValues: "قيمنا",
                meetTeam: "تعرف على فريقنا",
                startJourney: "ابدأ رحلة التعلم اليوم",
                explorePaths: "استكشف مسارات التعلم المنظمة لدينا وارفع مهاراتك إلى المستوى التالي",
                viewLearningPaths: "عرض مسارات التعلم",
                contactUs: "اتصل بنا",
                
                // Contact page
                contactUs: "اتصل بنا",
                getInTouch: "تواصل مع فريقنا للأسئلة والتعليقات أو التعاون",
                sendMessage: "أرسل لنا رسالة",
                yourName: "اسمك",
                emailAddress: "عنوان البريد الإلكتروني",
                subject: "الموضوع",
                message: "الرسالة",
                sendBtn: "إرسال الرسالة",
                contactInfo: "معلومات الاتصال",
                email: "البريد الإلكتروني",
                followUs: "تابعنا",
                faq: "الأسئلة الشائعة",
                faqTitle: "الأسئلة المتداولة",
                
                // Filter section on learning paths page
                filterByField: "تصفية حسب المجال",
                allPaths: "جميع المسارات",
                webDev: "تطوير الويب",
                dataScience: "علوم البيانات",
                mobileDev: "تطوير الجوال",
                devOps: "ديف أوبس",
                otherFields: "مجالات أخرى"
            }
        };
        
        // Apply translations based on current language
        const applyTranslations = () => {
            const currentLang = htmlElement.getAttribute('lang');
            const t = translations[currentLang];
            
            // Update navigation links
            const navLinks = document.querySelectorAll('.nav-links a');
            if (navLinks.length >= 4) {
                navLinks[0].textContent = t.home;
                navLinks[1].textContent = t.learningPaths;
                navLinks[2].textContent = t.about;
                navLinks[3].textContent = t.contact;
            }
            
            // Home Page Elements
            translateElementIfExists('.hero h1', t.headerText);
            translateElementIfExists('.hero p', t.headerSubtext);
            translateElementIfExists('.hero .btn', t.exploreBtn);
            translateElementIfExists('.featured-paths h2', t.popularPaths);
            
            const viewPathBtns = document.querySelectorAll('.path-card .btn');
            viewPathBtns.forEach(btn => {
                btn.textContent = t.viewPath;
            });
            
            translateElementIfExists('.benefits h2', t.whyChoose);
            
            // Footer Elements
            translateElementIfExists('.footer-logo p', t.yourGuide);
            translateElementIfExists('.footer-links h3', t.quickLinks);
            translateElementIfExists('.footer-newsletter h3', t.stayUpdated);
            translateElementIfExists('.footer-newsletter p', t.newsletter);
            translateElementIfExists('.footer-newsletter input', t.yourEmail, 'placeholder');
            translateElementIfExists('.footer-newsletter button', t.subscribe);
            translateElementIfExists('.footer-bottom p', t.copyright);
            
            // About Page Elements
            translateElementIfExists('.page-header h1', t.aboutTwentyone);
            translateElementIfExists('.page-header p', t.ourStory);
            translateElementIfExists('.about-content h2', t.ourMission);
            translateElementIfExists('.values h2', t.ourValues);
            translateElementIfExists('.team h2', t.meetTeam);
            translateElementIfExists('.about-cta h2', t.startJourney);
            translateElementIfExists('.about-cta p', t.explorePaths);
            
            const ctaButtons = document.querySelectorAll('.about-cta .cta-buttons a');
            if (ctaButtons.length >= 2) {
                ctaButtons[0].textContent = t.viewLearningPaths;
                ctaButtons[1].textContent = t.contactUs;
            }
            
            // Contact Page Elements
            translateElementIfExists('.page-header h1', t.contactUs);
            translateElementIfExists('.page-header p', t.getInTouch);
            translateElementIfExists('.contact-form-container h2', t.sendMessage);
            translateElementIfExists('label[for="name"]', t.yourName);
            translateElementIfExists('label[for="email"]', t.emailAddress);
            translateElementIfExists('label[for="subject"]', t.subject);
            translateElementIfExists('label[for="message"]', t.message);
            translateElementIfExists('.contact-form button', t.sendBtn);
            translateElementIfExists('.contact-info h2', t.contactInfo);
            translateElementIfExists('.info-item h3:first-of-type', t.email);
            translateElementIfExists('.info-item h3:nth-of-type(2)', t.followUs);
            translateElementIfExists('.info-item h3:nth-of-type(3)', t.faq);
            translateElementIfExists('.faq-section h2', t.faqTitle);
            
            // Learning Paths Page - Only translate filter UI, not content
            translateElementIfExists('.path-filter h3', t.filterByField);
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            if (filterBtns.length >= 6) {
                filterBtns[0].textContent = t.allPaths;
                filterBtns[1].textContent = t.webDev;
                filterBtns[2].textContent = t.dataScience;
                filterBtns[3].textContent = t.mobileDev;
                filterBtns[4].textContent = t.devOps;
                filterBtns[5].textContent = t.otherFields;
            }
            
            // DO NOT translate learning path content - keeping it in English
            // This is intentional to preserve the technical content in its original form
        };
        
        // Helper function to translate an element if it exists
        function translateElementIfExists(selector, translation, attribute = null) {
            const element = document.querySelector(selector);
            if (element) {
                if (attribute) {
                    element.setAttribute(attribute, translation);
                } else {
                    element.textContent = translation;
                }
            }
        }
        
        // Add class to identify content that should not be translated
        document.querySelectorAll('.learning-path').forEach(path => {
            path.classList.add('no-translate');
        });
        
        // Apply translations immediately
        applyTranslations();
        
        // Toggle language when button is clicked
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const currentLang = htmlElement.getAttribute('lang');
                const newLang = currentLang === 'ar' ? 'en' : 'ar';
                
                htmlElement.setAttribute('lang', newLang);
                localStorage.setItem('lang', newLang);
                langToggle.textContent = newLang === 'ar' ? 'عربي' : 'EN';
                
                applyTranslations();
                console.log(`Language changed to ${newLang}`);
            });
        }
    };
    
    // Initialize language toggle
    initLanguageToggle();
    
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        // Create mobile nav elements only if they don't exist yet
        if (!document.querySelector('.mobile-nav-toggle')) {
            const nav = document.querySelector('nav');
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-nav-toggle';
            mobileToggle.innerHTML = '<span></span><span></span><span></span>';
            
            nav.prepend(mobileToggle);
            
            // Add mobile nav toggle functionality
            mobileToggle.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Add CSS for mobile navigation
            const style = document.createElement('style');
            style.textContent = `
                .mobile-nav-toggle {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                }
                
                .mobile-nav-toggle span {
                    display: block;
                    width: 25px;
                    height: 3px;
                    background-color: var(--secondary-color);
                    margin: 5px 0;
                    transition: all 0.3s ease;
                }
                
                .mobile-nav-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-nav-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
                
                @media (max-width: 768px) {
                    .mobile-nav-toggle {
                        display: block;
                    }
                    
                    .nav-links {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: var(--header-bg);
                        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                        flex-direction: column;
                        align-items: center;
                        padding: 20px 0;
                        display: none;
                    }
                    
                    .nav-links.active {
                        display: flex;
                    }
                    
                    .nav-links li {
                        margin: 10px 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Initialize mobile navigation
    createMobileNav();
    
    // Handle path filtering in the learning paths page
    const initPathFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const learningPaths = document.querySelectorAll('.learning-path');
        
        // Debug - log number of filter buttons and learning paths found
        console.log(`Found ${filterBtns.length} filter buttons and ${learningPaths.length} learning paths`);
        
        if (filterBtns.length > 0) {
            // Make sure all paths are visible by default
            learningPaths.forEach(path => {
                path.style.display = 'block';
            });
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    // Prevent default button behavior
                    e.preventDefault();
                    
                    // Debug - log the clicked button
                    console.log(`Clicked filter: ${this.getAttribute('data-filter')}`);
                    
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Show all sections first to reset
                    document.querySelectorAll('.path-section').forEach(section => {
                        section.style.display = 'block';
                    });
                    
                    // If "All Paths" is selected, show everything
                    if (filter === 'all') {
                        learningPaths.forEach(path => {
                            path.style.display = 'block';
                        });
                        // Make sure all sections are visible
                        document.querySelectorAll('.path-section').forEach(section => {
                            section.style.display = 'block';
                        });
                    } else {
                        // Filter learning paths - important to use consistent approach
                        learningPaths.forEach(path => {
                            const category = path.getAttribute('data-category');
                            console.log(`Path category: ${category}, filter: ${filter}`);
                            
                            if (category === filter) {
                                path.style.display = 'block';
                            } else {
                                path.style.display = 'none';
                            }
                        });
                        
                        // Show/hide section headings based on visible paths
                        // This needs to execute after the paths are shown/hidden
                        document.querySelectorAll('.path-section').forEach(section => {
                            // Check for visible paths within this section
                            const visiblePaths = section.querySelectorAll(`.learning-path[data-category="${filter}"]`);
                            console.log(`Section ${section.id} has ${visiblePaths.length} visible paths`);
                            
                            if (visiblePaths.length === 0) {
                                section.style.display = 'none';
                            } else {
                                section.style.display = 'block';
                            }
                        });
                    }
                    
                    // Scroll to the corresponding section based on filter
                    setTimeout(() => {
                        if (filter === 'data') {
                            const dataSection = document.querySelector('#data-science');
                            if (dataSection) {
                                window.scrollTo({
                                    top: dataSection.offsetTop - 100,
                                    behavior: 'smooth'
                                });
                            }
                        } else if (filter === 'web') {
                            const webSection = document.querySelector('#web-dev');
                            if (webSection) {
                                window.scrollTo({
                                    top: webSection.offsetTop - 100,
                                    behavior: 'smooth'
                                });
                            }
                        } else if (filter === 'mobile') {
                            const mobileSection = document.querySelector('#mobile-dev');
                            if (mobileSection) {
                                window.scrollTo({
                                    top: mobileSection.offsetTop - 100,
                                    behavior: 'smooth'
                                });
                            }
                        } else if (filter === 'devops') {
                            const devopsSection = document.querySelector('#devops');
                            if (devopsSection) {
                                window.scrollTo({
                                    top: devopsSection.offsetTop - 100,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }, 100); // Small delay to ensure DOM updates before scrolling
                });
            });
        }
    };
    
    // Initialize path filters if on learning paths page
    if (document.querySelector('.path-filter')) {
        initPathFilters();
        
        // Direct fix for DevOps button
        const devopsBtn = document.querySelector('.filter-btn[data-filter="devops"]');
        if (devopsBtn) {
            devopsBtn.addEventListener('click', function() {
                console.log('DevOps button clicked directly');
                
                // Hide all paths first
                document.querySelectorAll('.learning-path').forEach(path => {
                    if (path.getAttribute('data-category') === 'devops') {
                        path.style.display = 'block';
                    } else {
                        path.style.display = 'none';
                    }
                });
                
                // Show only the DevOps section
                document.querySelectorAll('.path-section').forEach(section => {
                    if (section.id === 'devops') {
                        section.style.display = 'block';
                        setTimeout(() => {
                            window.scrollTo({
                                top: section.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }, 100);
                    } else {
                        const hasVisiblePaths = section.querySelectorAll('.learning-path[data-category="devops"]').length > 0;
                        section.style.display = hasVisiblePaths ? 'block' : 'none';
                    }
                });
                
                // Update button active states
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        }
    }
    
    // Smooth scrolling for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Form validation for newsletter signup
    const initFormValidation = () => {
        const newsletterForms = document.querySelectorAll('.footer-newsletter form');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                // Basic email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailPattern.test(email)) {
                    // Show error
                    if (!this.querySelector('.form-error')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'form-error';
                        errorMsg.textContent = 'Please enter a valid email address';
                        errorMsg.style.color = '#f44336';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.style.marginTop = '5px';
                        this.appendChild(errorMsg);
                    }
                } else {
                    // Remove error if exists
                    const errorMsg = this.querySelector('.form-error');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = 'Thank you for subscribing!';
                    successMsg.style.color = '#4CAF50';
                    successMsg.style.fontSize = '0.85rem';
                    successMsg.style.marginTop = '5px';
                    
                    // Replace form with success message
                    this.innerHTML = '';
                    this.appendChild(successMsg);
                }
            });
        });
    };
    
    // Initialize form validation
    initFormValidation();
});