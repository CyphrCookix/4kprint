// Internationalization (i18n) System for 4K Print Website
// Supports: French (fr), Arabic (ar), English (en)

class I18nManager {
    constructor() {
        this.currentLanguage = 'fr'; // Default to French
        this.supportedLanguages = ['fr', 'ar', 'en'];
        this.translations = {};
        this.isRTL = false;

        // Initialize the system
        this.init();
    }

    // Translation data
    getTranslations() {
        return {
            fr: {
                // Meta tags
                'meta.title': '4K Print - Conception Graphique Professionnelle et Impression',
                'meta.description': '4K Print - Services professionnels de conception graphique et d\'impression. Logos personnalisés, flyers, impressions grand format, conception d\'emballages et vêtements personnalisés.',
                'meta.keywords': 'conception graphique, impression, conception de logo, flyers, emballage, vêtements personnalisés, impressions grand format',
                'meta.og.title': '4K Print - Conception Graphique Professionnelle et Impression',
                'meta.og.description': 'Travail de conception personnalisé, impression premium et collaboration client pour tous vos besoins en conception graphique.',

                // Navigation
                'nav.home': 'Accueil',
                'nav.services': 'Services',
                'nav.portfolio': 'Portfolio',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title': 'Conception Graphique Professionnelle et Impression Premium',
                'hero.subtitle': 'Travail de conception personnalisé et solutions d\'impression premium adaptées à votre vision',
                'hero.btn.quote': 'Obtenir un Devis',
                'hero.btn.portfolio': 'Voir le Portfolio',
                'hero.cta_quote': 'Obtenir un Devis',
                'hero.cta_portfolio': 'Voir le Portfolio',

                // About Section
                'about.title': 'À Propos de 4K Print',
                'about.description1': 'Chez 4K Print, nous croyons au pouvoir d\'une conception exceptionnelle et d\'une impression premium pour donner vie à votre vision. Notre studio se spécialise dans le travail de conception personnalisé qui reflète votre identité de marque unique et vos valeurs.',
                'about.description2': 'Nous nous engageons à collaborer avec nos clients tout au long du processus créatif, en veillant à ce que chaque projet réponde à vos spécifications exactes et dépasse vos attentes.',
                'about.mission_title': 'Notre Mission',
                'about.mission_text': 'Fournir des services exceptionnels de conception graphique et d\'impression qui aident les entreprises et les particuliers à communiquer leur message avec clarté, créativité et impact.',

                // Services Section
                'services.title': 'Nos Services',
                'services.subtitle': 'Solutions complètes de conception et d\'impression pour tous vos besoins créatifs',
                'services.logo.title': 'Conception de Logo',
                'services.logo.description': 'Conception de logo personnalisé qui capture l\'essence de votre marque et crée des impressions durables.',
                'services.flyers.title': 'Flyers',
                'services.flyers.description': 'Flyers accrocheurs et matériel promotionnel qui communiquent efficacement votre message.',
                'services.large_format.title': 'Impressions Grand Format',
                'services.large_format.description': 'Impression grand format de haute qualité pour bannières, affiches et matériel d\'affichage.',
                'services.packaging.title': 'Conception d\'Emballage',
                'services.packaging.description': 'Solutions d\'emballage innovantes qui protègent votre produit et améliorent votre marque.',
                'services.apparel.title': 'Vêtements Personnalisés',
                'services.apparel.description': 'Impression professionnelle de vêtements personnalisés pour entreprises, événements et usage personnel.',
                'services.print.title': 'Services d\'Impression',
                'services.print.description': 'Services d\'impression complets pour cartes de visite, brochures et matériel marketing.',

                // Portfolio Section
                'portfolio.title': 'Notre Portfolio',
                'portfolio.subtitle': 'Explorez nos projets récents et solutions créatives',
                'portfolio.item.brand': 'Conception d\'Identité de Marque',
                'portfolio.item.event': 'Promotion d\'Événement',
                'portfolio.item.packaging': 'Emballage de Produit',
                'portfolio.item.banner': 'Bannière de Salon',
                'portfolio.item.apparel': 'Vêtements d\'Entreprise',
                'portfolio.item.marketing': 'Matériel Marketing',
                'portfolio.category.logo': 'Conception de Logo',
                'portfolio.category.flyer': 'Conception de Flyer',
                'portfolio.category.packaging': 'Conception d\'Emballage',
                'portfolio.category.largeformat': 'Impression Grand Format',
                'portfolio.category.apparel': 'Vêtements Personnalisés',
                'portfolio.category.print': 'Services d\'Impression',
                'portfolio.view.btn': 'Voir le Projet',

                // Contact Section
                'contact.title': 'Contactez-Nous',
                'contact.subtitle': 'Prêt à donner vie à votre vision ? Discutons de votre projet',
                'contact.form.name': 'Nom *',
                'contact.form.email': 'Email *',
                'contact.form.project_type': 'Type de Projet',
                'contact.form.select_service': 'Sélectionnez un service',
                'contact.form.project.logo': 'Conception de Logo',
                'contact.form.project.flyers': 'Flyers',
                'contact.form.project.largeformat': 'Impressions Grand Format',
                'contact.form.project.packaging': 'Conception d\'Emballage',
                'contact.form.project.apparel': 'Vêtements Personnalisés',
                'contact.form.project.print': 'Services d\'Impression',
                'contact.form.project.other': 'Autre',
                'contact.form.message': 'Message *',
                'contact.form.message_placeholder': 'Parlez-nous de votre projet...',
                'contact.form.other': 'Autre',
                'contact.form.submit': 'Envoyer le Message',
                'contact.form.success': 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.',
                'contact.info.visit.title': 'Visitez Notre Studio',
                'contact.info.visit.address': '123 Rue du Design<br>Quartier Créatif<br>Ville, État 12345',
                'contact.info.contact.title': 'Contactez-Nous',
                'contact.info.contact.phone': 'Téléphone: <a href="tel:+1234567890">(123) 456-7890</a>',
                'contact.info.contact.email': 'Email: <a href="mailto:hello@4kprint.com">hello@4kprint.com</a>',
                'contact.info.hours.title': 'Heures d\'Ouverture',
                'contact.info.hours.weekdays': 'Lundi - Vendredi: 9h00 - 18h00',
                'contact.info.hours.saturday': 'Samedi: 10h00 - 16h00',
                'contact.info.hours.sunday': 'Dimanche: Fermé',

                // Footer
                'footer.description': 'Services professionnels de conception graphique et d\'impression premium pour tous vos besoins créatifs.',
                'footer.services.title': 'Services',
                'footer.links.title': 'Liens Rapides',
                'footer.social.title': 'Suivez-Nous',
                'footer.copyright': '© 2024 4K Print. Tous droits réservés.',
                'footer.backtotop': 'Retour en Haut',

                // Form Validation
                'validation.name.required': 'Le nom est requis',
                'validation.name.minlength': 'Le nom doit contenir au moins 2 caractères',
                'validation.email.required': 'L\'email est requis',
                'validation.email.invalid': 'Veuillez entrer une adresse email valide',
                'validation.message.required': 'Le message est requis',
                'validation.message.minlength': 'Le message doit contenir au moins 10 caractères',
                'validation.submit.error': 'Échec de l\'envoi du message. Veuillez réessayer.',

                // Loading states
                'loading.sending': 'Envoi en cours...',
                'loading.loading': 'Chargement...',

                // Accessibility
                'aria.menu.toggle': 'Basculer le menu de navigation',
                'aria.lightbox.close': 'Fermer la lightbox',
                'aria.lightbox.prev': 'Image précédente',
                'aria.lightbox.next': 'Image suivante',
                'aria.scroll.indicator': 'Faire défiler vers la section à propos'
            },

            ar: {
                // Meta tags
                'meta.title': '4K Print - التصميم الجرافيكي المهني والطباعة',
                'meta.description': '4K Print - خدمات التصميم الجرافيكي والطباعة المهنية. شعارات مخصصة، منشورات، طباعة كبيرة الحجم، تصميم التغليف والملابس المخصصة.',
                'meta.keywords': 'التصميم الجرافيكي، الطباعة، تصميم الشعار، المنشورات، التغليف، الملابس المخصصة، الطباعة كبيرة الحجم',
                'meta.og.title': '4K Print - التصميم الجرافيكي المهني والطباعة',
                'meta.og.description': 'أعمال تصميم مخصصة، طباعة متميزة وتعاون مع العملاء لجميع احتياجاتك في التصميم الجرافيكي.',

                // Navigation
                'nav.home': 'الرئيسية',
                'nav.services': 'الخدمات',
                'nav.portfolio': 'معرض الأعمال',
                'nav.contact': 'اتصل بنا',

                // Hero Section
                'hero.title': 'التصميم الجرافيكي المهني والطباعة المتميزة',
                'hero.subtitle': 'أعمال تصميم مخصصة وحلول طباعة متميزة مصممة خصيصاً لرؤيتك',
                'hero.btn.quote': 'احصل على عرض سعر',
                'hero.btn.portfolio': 'عرض معرض الأعمال',
                'hero.cta_quote': 'احصل على عرض سعر',
                'hero.cta_portfolio': 'عرض معرض الأعمال',

                // About Section
                'about.title': 'حول 4K Print',
                'about.description1': 'في 4K Print، نؤمن بقوة التصميم الاستثنائي والطباعة المتميزة لإحياء رؤيتك. يتخصص استوديونا في أعمال التصميم المخصصة التي تعكس هوية علامتك التجارية الفريدة وقيمك.',
                'about.description2': 'نحن ملتزمون بالتعاون مع العملاء طوال العملية الإبداعية بأكملها، مما يضمن أن كل مشروع يلبي مواصفاتك الدقيقة ويتجاوز توقعاتك.',
                'about.mission_title': 'مهمتنا',
                'about.mission_text': 'تقديم خدمات التصميم الجرافيكي والطباعة المتميزة التي تساعد الشركات والأفراد على توصيل رسالتهم بوضوح وإبداع وتأثير.',

                // Services Section
                'services.title': 'خدماتنا',
                'services.subtitle': 'حلول شاملة للتصميم والطباعة لجميع احتياجاتك الإبداعية',
                'services.logo.title': 'تصميم الشعار',
                'services.logo.description': 'تصميم شعار مخصص يلتقط جوهر علامتك التجارية ويخلق انطباعات دائمة.',
                'services.flyers.title': 'المنشورات',
                'services.flyers.description': 'منشورات جذابة ومواد ترويجية تنقل رسالتك بفعالية.',
                'services.large_format.title': 'الطباعة كبيرة الحجم',
                'services.large_format.description': 'طباعة عالية الجودة كبيرة الحجم للافتات والملصقات ومواد العرض.',
                'services.packaging.title': 'تصميم التغليف',
                'services.packaging.description': 'حلول تغليف مبتكرة تحمي منتجك وتعزز علامتك التجارية.',
                'services.apparel.title': 'الملابس المخصصة',
                'services.apparel.description': 'طباعة مهنية للملابس المخصصة للشركات والفعاليات والاستخدام الشخصي.',
                'services.print.title': 'خدمات الطباعة',
                'services.print.description': 'خدمات طباعة شاملة لبطاقات العمل والكتيبات والمواد التسويقية.',

                // Portfolio Section
                'portfolio.title': 'معرض أعمالنا',
                'portfolio.subtitle': 'استكشف مشاريعنا الحديثة والحلول الإبداعية',
                'portfolio.item.brand': 'تصميم هوية العلامة التجارية',
                'portfolio.item.event': 'ترويج الفعاليات',
                'portfolio.item.packaging': 'تغليف المنتج',
                'portfolio.item.banner': 'لافتة المعرض التجاري',
                'portfolio.item.apparel': 'ملابس الشركات',
                'portfolio.item.marketing': 'المواد التسويقية',
                'portfolio.category.logo': 'تصميم الشعار',
                'portfolio.category.flyer': 'تصميم المنشور',
                'portfolio.category.packaging': 'تصميم التغليف',
                'portfolio.category.largeformat': 'الطباعة كبيرة الحجم',
                'portfolio.category.apparel': 'الملابس المخصصة',
                'portfolio.category.print': 'خدمات الطباعة',
                'portfolio.view.btn': 'عرض المشروع',

                // Contact Section
                'contact.title': 'تواصل معنا',
                'contact.subtitle': 'مستعد لإحياء رؤيتك؟ دعنا نناقش مشروعك',
                'contact.form.name': 'الاسم *',
                'contact.form.email': 'البريد الإلكتروني *',
                'contact.form.project_type': 'نوع المشروع',
                'contact.form.select_service': 'اختر خدمة',
                'contact.form.project.logo': 'تصميم الشعار',
                'contact.form.project.flyers': 'المنشورات',
                'contact.form.project.largeformat': 'الطباعة كبيرة الحجم',
                'contact.form.project.packaging': 'تصميم التغليف',
                'contact.form.project.apparel': 'الملابس المخصصة',
                'contact.form.project.print': 'خدمات الطباعة',
                'contact.form.project.other': 'أخرى',
                'contact.form.message': 'الرسالة *',
                'contact.form.message_placeholder': 'أخبرنا عن مشروعك...',
                'contact.form.other': 'أخرى',
                'contact.form.submit': 'إرسال الرسالة',
                'contact.form.success': 'شكراً! تم إرسال رسالتك بنجاح. سنرد عليك قريباً.',
                'contact.info.visit.title': 'زر استوديونا',
                'contact.info.visit.address': '123 شارع التصميم<br>الحي الإبداعي<br>المدينة، الولاية 12345',
                'contact.info.contact.title': 'تواصل معنا',
                'contact.info.contact.phone': 'الهاتف: <a href="tel:+1234567890">(123) 456-7890</a>',
                'contact.info.contact.email': 'البريد الإلكتروني: <a href="mailto:hello@4kprint.com">hello@4kprint.com</a>',
                'contact.info.hours.title': 'ساعات العمل',
                'contact.info.hours.weekdays': 'الاثنين - الجمعة: 9:00 ص - 6:00 م',
                'contact.info.hours.saturday': 'السبت: 10:00 ص - 4:00 م',
                'contact.info.hours.sunday': 'الأحد: مغلق',

                // Footer
                'footer.description': 'خدمات التصميم الجرافيكي المهنية والطباعة المتميزة لجميع احتياجاتك الإبداعية.',
                'footer.services.title': 'الخدمات',
                'footer.links.title': 'روابط سريعة',
                'footer.social.title': 'تابعنا',
                'footer.copyright': '© 2024 4K Print. جميع الحقوق محفوظة.',
                'footer.backtotop': 'العودة للأعلى',

                // Form Validation
                'validation.name.required': 'الاسم مطلوب',
                'validation.name.minlength': 'يجب أن يحتوي الاسم على حرفين على الأقل',
                'validation.email.required': 'البريد الإلكتروني مطلوب',
                'validation.email.invalid': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
                'validation.message.required': 'الرسالة مطلوبة',
                'validation.message.minlength': 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل',
                'validation.submit.error': 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',

                // Loading states
                'loading.sending': 'جاري الإرسال...',
                'loading.loading': 'جاري التحميل...',

                // Accessibility
                'aria.menu.toggle': 'تبديل قائمة التنقل',
                'aria.lightbox.close': 'إغلاق صندوق الضوء',
                'aria.lightbox.prev': 'الصورة السابقة',
                'aria.lightbox.next': 'الصورة التالية',
                'aria.scroll.indicator': 'التمرير إلى قسم حول'
            },

            en: {
                // Meta tags
                'meta.title': '4K Print - Professional Graphic Design & Printing',
                'meta.description': '4K Print - Professional graphic design and printing services. Custom logos, flyers, large-format prints, packaging design, and custom apparel.',
                'meta.keywords': 'graphic design, printing, logo design, flyers, packaging, custom apparel, large format prints',
                'meta.og.title': '4K Print - Professional Graphic Design & Printing',
                'meta.og.description': 'Custom design work, premium printing, and client collaboration for all your graphic design needs.',

                // Navigation
                'nav.home': 'Home',
                'nav.services': 'Services',
                'nav.portfolio': 'Portfolio',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title': 'Professional Graphic Design & Premium Printing',
                'hero.subtitle': 'Custom design work and premium printing solutions tailored to your vision',
                'hero.btn.quote': 'Get a Quote',
                'hero.btn.portfolio': 'View Portfolio',
                'hero.cta_quote': 'Get a Quote',
                'hero.cta_portfolio': 'View Portfolio',

                // About Section
                'about.title': 'About 4K Print',
                'about.description1': 'At 4K Print, we believe in the power of exceptional design and premium printing to bring your vision to life. Our studio specializes in custom design work that reflects your unique brand identity and values.',
                'about.description2': 'We\'re committed to client collaboration throughout the entire creative process, ensuring that every project meets your exact specifications and exceeds your expectations.',
                'about.mission_title': 'Our Mission',
                'about.mission_text': 'To deliver outstanding graphic design and printing services that help businesses and individuals communicate their message with clarity, creativity, and impact.',

                // Services Section
                'services.title': 'Our Services',
                'services.subtitle': 'Comprehensive design and printing solutions for all your creative needs',
                'services.logo.title': 'Logo Design',
                'services.logo.description': 'Custom logo design that captures your brand\'s essence and creates lasting impressions.',
                'services.flyers.title': 'Flyers',
                'services.flyers.description': 'Eye-catching flyers and promotional materials that effectively communicate your message.',
                'services.large_format.title': 'Large-Format Prints',
                'services.large_format.description': 'High-quality large-format printing for banners, posters, and display materials.',
                'services.packaging.title': 'Packaging Design',
                'services.packaging.description': 'Innovative packaging solutions that protect your product and enhance your brand.',
                'services.apparel.title': 'Custom Apparel',
                'services.apparel.description': 'Professional custom apparel printing for businesses, events, and personal use.',
                'services.print.title': 'Print Services',
                'services.print.description': 'Comprehensive printing services for business cards, brochures, and marketing materials.',

                // Portfolio Section
                'portfolio.title': 'Our Portfolio',
                'portfolio.subtitle': 'Explore our recent projects and creative solutions',
                'portfolio.item.brand': 'Brand Identity Design',
                'portfolio.item.event': 'Event Promotion',
                'portfolio.item.packaging': 'Product Packaging',
                'portfolio.item.banner': 'Trade Show Banner',
                'portfolio.item.apparel': 'Corporate Apparel',
                'portfolio.item.marketing': 'Marketing Materials',
                'portfolio.category.logo': 'Logo Design',
                'portfolio.category.flyer': 'Flyer Design',
                'portfolio.category.packaging': 'Packaging Design',
                'portfolio.category.largeformat': 'Large Format Print',
                'portfolio.category.apparel': 'Custom Apparel',
                'portfolio.category.print': 'Print Services',
                'portfolio.view.btn': 'View Project',

                // Contact Section
                'contact.title': 'Get In Touch',
                'contact.subtitle': 'Ready to bring your vision to life? Let\'s discuss your project',
                'contact.form.name': 'Name *',
                'contact.form.email': 'Email *',
                'contact.form.project_type': 'Project Type',
                'contact.form.select_service': 'Select a service',
                'contact.form.project.logo': 'Logo Design',
                'contact.form.project.flyers': 'Flyers',
                'contact.form.project.largeformat': 'Large-Format Prints',
                'contact.form.project.packaging': 'Packaging Design',
                'contact.form.project.apparel': 'Custom Apparel',
                'contact.form.project.print': 'Print Services',
                'contact.form.project.other': 'Other',
                'contact.form.message': 'Message *',
                'contact.form.message_placeholder': 'Tell us about your project...',
                'contact.form.other': 'Other',
                'contact.form.submit': 'Send Message',
                'contact.form.success': 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
                'contact.info.visit.title': 'Visit Our Studio',
                'contact.info.visit.address': '123 Design Street<br>Creative District<br>City, State 12345',
                'contact.info.contact.title': 'Get In Touch',
                'contact.info.contact.phone': 'Phone: <a href="tel:+1234567890">(123) 456-7890</a>',
                'contact.info.contact.email': 'Email: <a href="mailto:hello@4kprint.com">hello@4kprint.com</a>',
                'contact.info.hours.title': 'Business Hours',
                'contact.info.hours.weekdays': 'Monday - Friday: 9:00 AM - 6:00 PM',
                'contact.info.hours.saturday': 'Saturday: 10:00 AM - 4:00 PM',
                'contact.info.hours.sunday': 'Sunday: Closed',

                // Footer
                'footer.description': 'Professional graphic design and premium printing services for all your creative needs.',
                'footer.services.title': 'Services',
                'footer.links.title': 'Quick Links',
                'footer.social.title': 'Follow Us',
                'footer.copyright': '© 2024 4K Print. All rights reserved.',
                'footer.backtotop': 'Back to Top',

                // Form Validation
                'validation.name.required': 'Name is required',
                'validation.name.minlength': 'Name must be at least 2 characters',
                'validation.email.required': 'Email is required',
                'validation.email.invalid': 'Please enter a valid email address',
                'validation.message.required': 'Message is required',
                'validation.message.minlength': 'Message must be at least 10 characters',
                'validation.submit.error': 'Failed to send message. Please try again.',

                // Loading states
                'loading.sending': 'Sending...',
                'loading.loading': 'Loading...',

                // Accessibility
                'aria.menu.toggle': 'Toggle navigation menu',
                'aria.lightbox.close': 'Close lightbox',
                'aria.lightbox.prev': 'Previous image',
                'aria.lightbox.next': 'Next image',
                'aria.scroll.indicator': 'Scroll to about section'
            }
        };
    }

    // Initialize the i18n system
    init() {
        this.translations = this.getTranslations();

        // Detect language from URL, localStorage, or browser
        this.detectLanguage();

        // Set up language switching
        this.setupLanguageSwitcher();

        // Apply initial translations
        this.applyTranslations();

        // Set up RTL support
        this.setupRTL();

        console.log(`✅ I18n initialized with language: ${this.currentLanguage}`);
    }

    // Detect the current language
    detectLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');

        // Check localStorage
        const storedLang = localStorage.getItem('4kprint-language');

        // Check browser language
        const browserLang = navigator.language.split('-')[0];

        // Priority: URL > localStorage > browser > default (French)
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLanguage = urlLang;
        } else if (storedLang && this.supportedLanguages.includes(storedLang)) {
            this.currentLanguage = storedLang;
        } else if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
        } else {
            this.currentLanguage = 'fr'; // Default to French
        }

        // Store the selected language
        localStorage.setItem('4kprint-language', this.currentLanguage);
    }

    // Set up language switcher
    setupLanguageSwitcher() {
        // Remove any old language selectors that might conflict
        const oldSelectors = document.querySelectorAll('.language-selector, .language-dropdown:not(.lang-dropdown)');
        oldSelectors.forEach(selector => selector.remove());
        
        // Create language switcher if it doesn't exist
        if (!document.querySelector('.language-switcher')) {
            this.createLanguageSwitcher();
        }

        // Add event listeners to language switcher
        const languageButtons = document.querySelectorAll('.lang-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    // Create language switcher UI
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-current" aria-label="Select language">
                    <span class="lang-flag">${this.getLanguageFlag(this.currentLanguage)}</span>
                    <span class="lang-name">${this.getLanguageName(this.currentLanguage)}</span>
                    <span class="lang-arrow">▼</span>
                </button>
                <div class="lang-options">
                    <button class="lang-btn" data-lang="fr">
                        <span class="lang-flag">🇫🇷</span>
                        <span class="lang-name">Français</span>
                    </button>
                    <button class="lang-btn" data-lang="ar">
                        <span class="lang-flag">🇸🇦</span>
                        <span class="lang-name">العربية</span>
                    </button>
                    <button class="lang-btn" data-lang="en">
                        <span class="lang-flag">🇺🇸</span>
                        <span class="lang-name">English</span>
                    </button>
                </div>
            </div>
        `;

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(switcher);
        }

        // Add dropdown functionality
        const dropdown = switcher.querySelector('.lang-dropdown');
        const current = dropdown.querySelector('.lang-current');
        const options = dropdown.querySelector('.lang-options');

        current.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Get language flag emoji
    getLanguageFlag(lang) {
        const flags = {
            'fr': '🇫🇷',
            'ar': '🇸🇦',
            'en': '🇺🇸'
        };
        return flags[lang] || '🌐';
    }

    // Get language name
    getLanguageName(lang) {
        const names = {
            'fr': 'Français',
            'ar': 'العربية',
            'en': 'English'
        };
        return names[lang] || lang.toUpperCase();
    }

    // Switch language with enhanced animations
    switchLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} is not supported`);
            return;
        }

        // Prevent multiple simultaneous language switches
        if (this.isSwitching) {
            return;
        }

        this.isSwitching = true;
        const previousLang = this.currentLanguage;
        
        // Add loading state to body
        document.body.classList.add('language-switching');
        
        // Update language immediately for internal logic
        this.currentLanguage = lang;
        localStorage.setItem('4kprint-language', lang);

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);

        // Close dropdown immediately
        document.querySelector('.lang-dropdown')?.classList.remove('active');

        // Animate language switch
        this.animateLanguageSwitch(previousLang, lang).then(() => {
            // Clean up after animation
            document.body.classList.remove('language-switching');
            this.isSwitching = false;
            
            console.log(`Language switched from ${previousLang} to ${lang}`);
        });
    }

    // Animate the complete language switching process
    async animateLanguageSwitch(fromLang, toLang) {
        return new Promise((resolve) => {
            // Phase 1: Setup RTL changes first (affects layout)
            this.setupRTL();
            
            // Phase 2: Apply translations with staggered animations
            setTimeout(() => {
                this.applyTranslations(true);
            }, 100);

            // Phase 3: Update language switcher display
            setTimeout(() => {
                this.updateLanguageSwitcher();
            }, 200);

            // Phase 4: Complete the animation
            setTimeout(() => {
                resolve();
            }, 800); // Total animation duration
        });
    }

    // Update language switcher display
    updateLanguageSwitcher() {
        const current = document.querySelector('.lang-current');
        if (current) {
            current.innerHTML = `
                <span class="lang-flag">${this.getLanguageFlag(this.currentLanguage)}</span>
                <span class="lang-name">${this.getLanguageName(this.currentLanguage)}</span>
                <span class="lang-arrow">▼</span>
            `;
        }
    }

    // Set up RTL support
    setupRTL() {
        this.isRTL = this.currentLanguage === 'ar';

        // Update HTML attributes
        document.documentElement.setAttribute('lang', this.currentLanguage);
        document.documentElement.setAttribute('dir', this.isRTL ? 'rtl' : 'ltr');

        // Add/remove RTL class
        document.body.classList.toggle('rtl', this.isRTL);
        document.body.classList.toggle('ltr', !this.isRTL);

        // Update meta tags
        this.updateMetaTags();
    }

    // Update meta tags for current language
    updateMetaTags() {
        const metaTags = [
            { selector: 'title', key: 'meta.title' },
            { selector: 'meta[name="description"]', key: 'meta.description', attr: 'content' },
            { selector: 'meta[name="keywords"]', key: 'meta.keywords', attr: 'content' },
            { selector: 'meta[property="og:title"]', key: 'meta.og.title', attr: 'content' },
            { selector: 'meta[property="og:description"]', key: 'meta.og.description', attr: 'content' },
            { selector: 'meta[name="twitter:title"]', key: 'meta.og.title', attr: 'content' },
            { selector: 'meta[name="twitter:description"]', key: 'meta.og.description', attr: 'content' }
        ];

        metaTags.forEach(({ selector, key, attr }) => {
            const element = document.querySelector(selector);
            const translation = this.t(key);

            if (element && translation) {
                if (attr) {
                    element.setAttribute(attr, translation);
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    // Apply translations to the page with smooth animations
    applyTranslations(animate = false) {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');

        if (animate) {
            this.animateTranslations(elements);
        } else {
            this.applyTranslationsImmediate(elements);
        }

        // Update meta tags
        this.updateMetaTags();

        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage, isRTL: this.isRTL }
        }));
    }

    // Apply translations immediately without animation (for initial load)
    applyTranslationsImmediate(elements) {
        elements.forEach(element => {
            this.updateElementContent(element);
        });
    }

    // Apply translations with smooth animations
    animateTranslations(elements) {
        // Group elements by animation type for better performance
        const textElements = [];
        const attributeElements = [];
        
        elements.forEach(element => {
            if (element.hasAttribute('data-i18n-placeholder') || 
                element.hasAttribute('placeholder') || 
                element.hasAttribute('aria-label')) {
                attributeElements.push(element);
            } else {
                textElements.push(element);
            }
        });

        // Animate text elements with staggered timing
        this.animateTextElements(textElements);
        
        // Update attribute elements immediately (no visual animation needed)
        attributeElements.forEach(element => {
            this.updateElementContent(element);
        });
    }

    // Animate text elements with sophisticated transitions
    animateTextElements(elements) {
        const animationDuration = 400;
        const staggerDelay = 50;
        
        elements.forEach((element, index) => {
            // Skip if element is not visible
            if (!this.isElementVisible(element)) {
                this.updateElementContent(element);
                return;
            }

            const delay = index * staggerDelay;
            
            // Add animation class
            element.classList.add('i18n-transitioning');
            
            // Phase 1: Fade out current content
            setTimeout(() => {
                element.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                element.style.opacity = '0';
                element.style.transform = this.getExitTransform(element);
            }, delay);

            // Phase 2: Update content and fade in
            setTimeout(() => {
                this.updateElementContent(element);
                
                // Force reflow to ensure the content change is applied
                element.offsetHeight;
                
                // Fade in with new content
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
                
                // Clean up after animation
                setTimeout(() => {
                    element.style.transition = '';
                    element.style.transform = '';
                    element.classList.remove('i18n-transitioning');
                }, animationDuration);
                
            }, delay + animationDuration / 2);
        });
    }

    // Get appropriate exit transform based on element type
    getExitTransform(element) {
        const tagName = element.tagName.toLowerCase();
        
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
            return 'translateY(-10px) scale(0.98)';
        } else if (element.classList.contains('btn')) {
            return 'translateY(5px) scale(0.95)';
        } else if (element.classList.contains('nav-link')) {
            return 'translateX(' + (this.isRTL ? '10px' : '-10px') + ') scale(0.95)';
        } else {
            return 'translateY(8px) scale(0.98)';
        }
    }

    // Check if element is visible in viewport
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top < windowHeight &&
            rect.bottom > 0 &&
            rect.left < windowWidth &&
            rect.right > 0
        );
    }

    // Update element content based on its type
    updateElementContent(element) {
        const key = element.getAttribute('data-i18n');
        const translation = this.t(key);

        if (translation) {
            // Check if it's a placeholder attribute
            if (element.hasAttribute('data-i18n-placeholder')) {
                const placeholderKey = element.getAttribute('data-i18n-placeholder');
                const placeholderTranslation = this.t(placeholderKey);
                if (placeholderTranslation) {
                    element.setAttribute('placeholder', placeholderTranslation);
                }
            }
            // Check if it's a regular placeholder
            else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            }
            // Check if it's an aria-label
            else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translation);
            }
            // Check if it should be HTML content
            else if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
            }
            // Default to text content
            else {
                element.textContent = translation;
            }
        }
    }

    // Get translation for a key
    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage]?.[key] ||
            this.translations['fr']?.[key] || // Fallback to French
            key; // Fallback to key itself

        // Simple parameter replacement
        let result = translation;
        Object.keys(params).forEach(param => {
            result = result.replace(`{{${param}}}`, params[param]);
        });

        return result;
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Check if current language is RTL
    isRTLLanguage() {
        return this.isRTL;
    }

    // Get supported languages
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
}

// Initialize i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    window.i18n = new I18nManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}