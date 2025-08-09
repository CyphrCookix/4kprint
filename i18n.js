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
                'meta.title': '4K Print - Panneaux Publicitaires et Impression Numérique',
                'meta.description': '4K Print - Spécialisé dans la fabrication de panneaux publicitaires et l\'impression numérique. Étiquettes de produits, flyers, bannières PVC, vinyle, conception de logos et plus.',
                'meta.keywords': 'panneaux publicitaires, impression numérique, étiquettes produits, flyers, bannières PVC, vinyle, conception logo, autocollants personnalisés',
                'meta.og.title': '4K Print - Print & Pub - Panneaux Publicitaires et Impression',
                'meta.og.description': 'Nous aidons les créateurs à concrétiser leurs idées et les propriétaires d\'entreprises à améliorer leur publicité avec nos services d\'impression et panneaux publicitaires.',

                // Navigation
                'nav.home': 'Accueil',
                'nav.services': 'Services',
                'nav.portfolio': 'Portfolio',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title': 'Print & Pub - Panneaux Publicitaires et Impression Numérique',
                'hero.subtitle': 'Spécialisé dans la fabrication de panneaux publicitaires et l\'impression numérique pour concrétiser vos idées',
                'hero.btn.quote': 'Obtenir un Devis',
                'hero.btn.portfolio': 'Voir le Portfolio',
                'hero.cta_quote': 'Obtenir un Devis',
                'hero.cta_portfolio': 'Voir le Portfolio',

                // About Section
                'about.title': 'À Propos de 4K Print',
                'about.description1': 'Chez 4K Print, nous sommes une entreprise spécialisée dans la fabrication de panneaux publicitaires et l\'impression numérique. Nous nous spécialisons dans la création de designs numériques pour de multiples besoins, l\'impression et les panneaux publicitaires.',
                'about.description2': 'Nous aidons les créateurs créatifs à concrétiser leurs idées et les propriétaires d\'entreprises à améliorer leur publicité. Nous offrons de multiples services pour répondre à tous vos besoins en communication visuelle.',
                'about.mission_title': 'Notre Mission',
                'about.mission_text': 'Aider les créateurs créatifs à concrétiser leurs idées et les propriétaires d\'entreprises à améliorer leur publicité grâce à nos services spécialisés en panneaux publicitaires et impression numérique.',

                // Services Section
                'services.title': 'Nos Services',
                'services.subtitle': 'Solutions complètes de panneaux publicitaires et d\'impression numérique pour tous vos besoins',
                'services.advertising_panels.title': 'Panneaux Publicitaires',
                'services.advertising_panels.description': 'Panneaux publicitaires professionnels pour une promotion efficace de votre entreprise et une visibilité de marque optimale.',
                'services.product_labels.title': 'Étiquettes de Produits',
                'services.product_labels.description': 'Étiquettes de produits de haute qualité et étiquettes d\'emballage pour vos besoins commerciaux.',
                'services.pvc_vinyl.title': 'Bannières PVC et Vinyle',
                'services.pvc_vinyl.description': 'Bannières PVC durables et impression vinyle pour la publicité extérieure et intérieure.',
                'services.business_cards.title': 'Cartes de Visite et Brochures',
                'services.business_cards.description': 'Cartes de visite professionnelles, brochures et matériel marketing de haute qualité.',
                'services.stickers.title': 'Autocollants Personnalisés',
                'services.stickers.description': 'Autocollants personnalisés pour l\'image de marque, la promotion et à des fins décoratives.',
                'services.decals.title': 'Décalcomanies de Fenêtre et Voiture',
                'services.decals.description': 'Décalcomanies professionnelles pour fenêtres et voitures pour la publicité d\'entreprise et l\'usage personnel.',
                'services.vision_film.title': 'Film Vision Unique',
                'services.vision_film.description': 'Film vision unique pour la publicité sur fenêtre qui maintient la visibilité depuis l\'intérieur.',
                'services.logo.title': 'Conception de Logo et Image de Marque',
                'services.logo.description': 'Conception de logo personnalisé et développement d\'image de marque qui capture l\'essence de votre entreprise.',
                'services.flyers.title': 'Flyers et Brochures',
                'services.flyers.description': 'Flyers professionnels et brochures d\'entreprise pour promouvoir efficacement vos services et produits.',
                'services.large_format.title': 'Impressions Grand Format',
                'services.large_format.description': 'Impressions grand format de haute qualité pour tous vos besoins d\'affichage et de communication.',
                'services.packaging.title': 'Étiquettes de Produits et Emballage',
                'services.packaging.description': 'Étiquettes de produits et étiquettes d\'emballage professionnelles pour valoriser vos produits.',
                'services.apparel.title': 'Panneaux Publicitaires',
                'services.apparel.description': 'Fabrication de panneaux publicitaires professionnels pour votre communication extérieure et intérieure.',
                'services.print.title': 'Impression Numérique',
                'services.print.description': 'Services d\'impression numérique complets incluant bannières PVC, vinyle, autocollants personnalisés, décalcomanies et film vision unique.',

                // Portfolio Section
                'portfolio.title': 'Notre Portfolio',
                'portfolio.subtitle': 'Découvrez nos réalisations récentes et nos solutions créatives pour l\'impression et la publicité',
                'portfolio.item.advertising': '4K Print - Conception et Fabrication de Panneaux Publicitaires',
                'portfolio.item.labels': '4K Print - Étiquettes de Produits et Emballage',
                'portfolio.item.pvc_vinyl': '4K Print - Bannières PVC et Impression Vinyle',
                'portfolio.item.large_format': '4K Print - Impressions Grand Format et Impression Numérique',
                'portfolio.item.stickers': '4K Print - Autocollants Personnalisés et Décalcomanies de Fenêtre',
                'portfolio.item.logo_cards': '4K Print - Conception de Logo et Cartes de Visite',
                'portfolio.category.advertising': 'Panneaux Publicitaires',
                'portfolio.category.labels': 'Étiquettes de Produits et Emballage',
                'portfolio.category.pvc_vinyl': 'Bannières PVC et Vinyle',
                'portfolio.category.large_format': 'Impressions Grand Format',
                'portfolio.category.stickers': 'Autocollants et Décalcomanies',
                'portfolio.category.branding': 'Logo et Image de Marque',
                'portfolio.view.btn': 'Voir le Projet',

                // Contact Section
                'contact.title': 'Contactez-Nous',
                'contact.subtitle': 'Prêt à donner vie à votre vision ? Discutons de votre projet',
                'contact.form.name': 'Nom *',
                'contact.form.email': 'Email *',
                'contact.form.project_type': 'Type de Projet',
                'contact.form.select_service': 'Sélectionnez un service',
                'contact.form.project.logo': 'Conception de Logo et Image de Marque',
                'contact.form.project.flyers': 'Flyers et Brochures',
                'contact.form.project.largeformat': 'Impressions Grand Format',
                'contact.form.project.packaging': 'Étiquettes de Produits et Emballage',
                'contact.form.project.apparel': 'Panneaux Publicitaires',
                'contact.form.project.print': 'Impression Numérique',
                'contact.form.project.other': 'Autre',
                'contact.form.message': 'Message *',
                'contact.form.message_placeholder': 'Parlez-nous de votre projet...',
                'contact.form.other': 'Autre',
                'contact.form.submit': 'Envoyer le Message',
                'contact.form.success': 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.',
                'contact.info.visit.title': 'Visitez Notre Atelier',
                'contact.info.visit.address': 'Errahma - Casablanca<br>Maroc',
                'contact.info.contact.title': 'Contactez-Nous',
                'contact.info.contact.phone': 'Téléphone: <a href="https://api.whatsapp.com/message/BMEHYYEJEZLQI1" target="_blank">+212 622-646474</a>',
                'contact.info.contact.email': 'Email: <a href="mailto:graphienet@gmail.com">graphienet@gmail.com</a>',
                'contact.info.hours.title': 'Heures d\'Ouverture',
                'contact.info.hours.weekdays': 'Lundi - Jeudi: 9h00 - 13h00 ; 14h30 - 19h00',
                'contact.info.hours.friday': 'Vendredi: 9h00 - 13h00 ; 14h45 - 19h00',
                'contact.info.hours.saturday': 'Samedi: 9h00 - 13h00 ; 14h30 - 19h00',
                'contact.info.hours.sunday': 'Dimanche: Fermé',

                // Footer
                'footer.description': 'Entreprise spécialisée dans la fabrication de panneaux publicitaires et l\'impression numérique. Nous aidons les créateurs créatifs à concrétiser leurs idées et les propriétaires d\'entreprises à améliorer leur publicité.',
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
                'meta.title': '4K Print - اللوحات الإعلانية والطباعة الرقمية',
                'meta.description': '4K Print - شركة متخصصة في تصنيع اللوحات الإعلانية والطباعة الرقمية. ملصقات المنتجات والتغليف، منشورات، لافتات PVC، فينيل، تصميم الشعارات، بطاقات العمل، طباعة كبيرة الحجم، ملصقات مخصصة، ملصقات النوافذ والسيارات، فيلم الرؤية الواحدة.',
                'meta.keywords': 'اللوحات الإعلانية، الطباعة الرقمية، ملصقات المنتجات، ملصقات التغليف، منشورات، لافتات PVC، فينيل، تصميم الشعار، بطاقات العمل، كتيبات، طباعة كبيرة الحجم، ملصقات مخصصة، ملصقات النوافذ والسيارات، فيلم الرؤية الواحدة',
                'meta.og.title': '4K Print - Print & Pub - اللوحات الإعلانية والطباعة الرقمية',
                'meta.og.description': 'نساعد المبدعين على تحقيق أفكارهم وأصحاب الأعمال على تحسين إعلاناتهم. نقدم خدمات متعددة مثل اللوحات الإعلانية، ملصقات المنتجات والتغليف، منشورات، لافتات PVC، فينيل، تصميم الشعارات، بطاقات العمل، طباعة كبيرة الحجم، ملصقات مخصصة، ملصقات النوافذ والسيارات، وفيلم الرؤية الواحدة.',

                // Navigation
                'nav.home': 'الرئيسية',
                'nav.services': 'الخدمات',
                'nav.portfolio': 'معرض الأعمال',
                'nav.contact': 'اتصل بنا',

                // Hero Section
                'hero.title': 'Print & Pub - اللوحات الإعلانية والطباعة الرقمية',
                'hero.subtitle': 'متخصصون في تصنيع اللوحات الإعلانية والطباعة الرقمية لتحقيق أفكارك',
                'hero.btn.quote': 'احصل على عرض سعر',
                'hero.btn.portfolio': 'عرض معرض الأعمال',
                'hero.cta_quote': 'احصل على عرض سعر',
                'hero.cta_portfolio': 'عرض معرض الأعمال',

                // About Section
                'about.title': 'حول 4K Print',
                'about.description1': 'في 4K Print، نحن شركة متخصصة في تصنيع اللوحات الإعلانية والطباعة الرقمية. نتخصص في إنشاء التصاميم الرقمية لاحتياجات متعددة، والطباعة واللوحات الإعلانية.',
                'about.description2': 'نساعد المبدعين على تحقيق أفكارهم وأصحاب الأعمال على تحسين إعلاناتهم. نقدم خدمات متعددة مثل اللوحات الإعلانية، ملصقات المنتجات والتغليف، منشورات، لافتات PVC، فينيل، تصميم الشعارات والعلامة التجارية، بطاقات العمل والكتيبات، طباعة كبيرة الحجم، ملصقات مخصصة، ملصقات النوافذ والسيارات، وفيلم الرؤية الواحدة.',
                'about.mission_title': 'مهمتنا',
                'about.mission_text': 'نساعد المبدعين على تحقيق أفكارهم وأصحاب الأعمال على تحسين إعلاناتهم من خلال خدماتنا المتخصصة في اللوحات الإعلانية والطباعة الرقمية.',

                // Services Section
                'services.title': 'خدماتنا',
                'services.subtitle': 'حلول شاملة للوحات الإعلانية والطباعة الرقمية لجميع احتياجاتك',
                'services.advertising_panels.title': 'اللوحات الإعلانية',
                'services.advertising_panels.description': 'لوحات إعلانية مهنية لترويج فعال للأعمال ورؤية مثلى للعلامة التجارية.',
                'services.product_labels.title': 'ملصقات المنتجات',
                'services.product_labels.description': 'ملصقات منتجات عالية الجودة وملصقات تغليف لاحتياجاتك التجارية.',
                'services.pvc_vinyl.title': 'لافتات PVC والفينيل',
                'services.pvc_vinyl.description': 'لافتات PVC متينة وطباعة فينيل للإعلان الخارجي والداخلي.',
                'services.business_cards.title': 'بطاقات العمل والكتيبات',
                'services.business_cards.description': 'بطاقات عمل مهنية وكتيبات ومواد تسويقية عالية الجودة.',
                'services.stickers.title': 'ملصقات مخصصة',
                'services.stickers.description': 'ملصقات مخصصة للعلامة التجارية والترويج والأغراض الزخرفية.',
                'services.decals.title': 'ملصقات النوافذ والسيارات',
                'services.decals.description': 'ملصقات مهنية للنوافذ والسيارات للإعلان التجاري والاستخدام الشخصي.',
                'services.vision_film.title': 'فيلم الرؤية الواحدة',
                'services.vision_film.description': 'فيلم الرؤية الواحدة للإعلان على النوافذ مع الحفاظ على الرؤية من الداخل.',
                'services.logo.title': 'تصميم الشعار والعلامة التجارية',
                'services.logo.description': 'تصميم شعار مخصص وتطوير هوية تجارية تلتقط جوهر شركتك وتترك انطباعاً دائماً.',
                'services.flyers.title': 'المنشورات',
                'services.flyers.description': 'منشورات جذابة ومواد ترويجية تنقل رسالتك بفعالية وتجذب انتباه العملاء.',
                'services.large_format.title': 'الطباعة كبيرة الحجم',
                'services.large_format.description': 'طباعة عالية الجودة كبيرة الحجم للافتات والملصقات ومواد العرض المختلفة.',
                'services.packaging.title': 'ملصقات المنتجات والتغليف',
                'services.packaging.description': 'حلول تغليف مبتكرة وملصقات منتجات مهنية تحمي منتجك وتعزز علامتك التجارية.',
                'services.apparel.title': 'اللوحات الإعلانية',
                'services.apparel.description': 'تصنيع لوحات إعلانية مهنية عالية الجودة للتواصل الخارجي والداخلي.',
                'services.print.title': 'خدمات الطباعة',
                'services.print.description': 'خدمات طباعة شاملة تشمل بطاقات العمل والكتيبات ومواد التسويق المختلفة بجودة عالية.',

                // Portfolio Section
                'portfolio.title': 'معرض أعمالنا',
                'portfolio.subtitle': 'اكتشف إنجازاتنا الحديثة وحلولنا الإبداعية في الطباعة والإعلان',
                'portfolio.item.advertising': '4K Print - تصميم وتصنيع اللوحات الإعلانية',
                'portfolio.item.labels': '4K Print - ملصقات المنتجات والتغليف',
                'portfolio.item.pvc_vinyl': '4K Print - لافتات PVC وطباعة الفينيل',
                'portfolio.item.large_format': '4K Print - الطباعة كبيرة الحجم والطباعة الرقمية',
                'portfolio.item.stickers': '4K Print - ملصقات مخصصة وملصقات النوافذ',
                'portfolio.item.logo_cards': '4K Print - تصميم الشعار وبطاقات العمل',
                'portfolio.category.advertising': 'اللوحات الإعلانية',
                'portfolio.category.labels': 'ملصقات المنتجات والتغليف',
                'portfolio.category.pvc_vinyl': 'لافتات PVC والفينيل',
                'portfolio.category.large_format': 'الطباعة كبيرة الحجم',
                'portfolio.category.stickers': 'الملصقات والديكالات',
                'portfolio.category.branding': 'الشعار والهوية التجارية',
                'portfolio.view.btn': 'عرض المشروع',

                // Contact Section
                'contact.title': 'تواصل معنا',
                'contact.subtitle': 'مستعد لإحياء رؤيتك؟ دعنا نناقش مشروعك',
                'contact.form.name': 'الاسم *',
                'contact.form.email': 'البريد الإلكتروني *',
                'contact.form.project_type': 'نوع المشروع',
                'contact.form.select_service': 'اختر خدمة',
                'contact.form.project.logo': 'تصميم الشعار والعلامة التجارية',
                'contact.form.project.flyers': 'المنشورات',
                'contact.form.project.largeformat': 'الطباعة كبيرة الحجم',
                'contact.form.project.packaging': 'ملصقات المنتجات والتغليف',
                'contact.form.project.apparel': 'اللوحات الإعلانية',
                'contact.form.project.print': 'خدمات الطباعة',
                'contact.form.project.other': 'أخرى',
                'contact.form.message': 'الرسالة *',
                'contact.form.message_placeholder': 'أخبرنا عن مشروعك...',
                'contact.form.other': 'أخرى',
                'contact.form.submit': 'إرسال الرسالة',
                'contact.form.success': 'شكراً! تم إرسال رسالتك بنجاح. سنرد عليك قريباً.',
                'contact.info.visit.title': 'زر ورشتنا',
                'contact.info.visit.address': 'الرحمة - الدار البيضاء<br>المغرب',
                'contact.info.contact.title': 'تواصل معنا',
                'contact.info.contact.phone': 'الهاتف: <a href="https://api.whatsapp.com/message/BMEHYYEJEZLQI1" target="_blank">+212 622-646474</a>',
                'contact.info.contact.email': 'البريد الإلكتروني: <a href="mailto:graphienet@gmail.com">graphienet@gmail.com</a>',
                'contact.info.hours.title': 'ساعات العمل',
                'contact.info.hours.weekdays': 'الاثنين - الخميس: 9:00 ص - 1:00 م ; 2:30 م - 7:00 م',
                'contact.info.hours.friday': 'الجمعة: 9:00 ص - 1:00 م ; 2:45 م - 7:00 م',
                'contact.info.hours.saturday': 'السبت: 9:00 ص - 1:00 م ; 2:30 م - 7:00 م',
                'contact.info.hours.sunday': 'الأحد: مغلق',

                // Footer
                'footer.description': 'شركة متخصصة في تصنيع اللوحات الإعلانية والطباعة الرقمية. نساعد المبدعين على تحقيق أفكارهم وأصحاب الأعمال على تحسين إعلاناتهم.',
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
                'meta.title': '4K Print - Advertising Panels and Digital Printing',
                'meta.description': '4K Print - Specialized in manufacturing advertising panels and digital printing. Product labels, packaging labels, flyers, PVC banners, vinyl, logo design, business cards, large format prints, custom stickers, window and car decals, one-way vision film.',
                'meta.keywords': 'advertising panels, digital printing, product labels, packaging labels, flyers, PVC banners, vinyl, logo design, business cards, brochures, large format prints, custom stickers, window and car decals, one-way vision film',
                'meta.og.title': '4K Print - Print & Pub - Advertising Panels and Printing',
                'meta.og.description': 'We help creative creators to bring their ideas to reality and business owners to enhance their advertising. We offer multiple services such as advertising panels, product labels and packaging labels, flyers, PVC banners, vinyl, logo design and branding, business cards and brochures, large format prints, custom stickers, window and car decals, and one-way vision film.',

                // Navigation
                'nav.home': 'Home',
                'nav.services': 'Services',
                'nav.portfolio': 'Portfolio',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title': 'Print & Pub - Advertising Panels and Digital Printing',
                'hero.subtitle': 'Specialized in manufacturing advertising panels and digital printing to bring your ideas to reality',
                'hero.btn.quote': 'Get a Quote',
                'hero.btn.portfolio': 'View Portfolio',
                'hero.cta_quote': 'Get a Quote',
                'hero.cta_portfolio': 'View Portfolio',

                // About Section
                'about.title': 'About 4K Print',
                'about.description1': 'At 4K Print, we are a company specializing in manufacturing advertising panels and digital printing. We specialize in creation of digital designs for multiple needs, printing, and advertising panels.',
                'about.description2': 'We help creative creators to bring their ideas to reality and business owners to enhance their advertising. We offer multiple services to meet all your visual communication needs.',
                'about.mission_title': 'Our Mission',
                'about.mission_text': 'Help creative creators to bring their ideas to reality and business owners to enhance their advertising through our specialized services in advertising panels and digital printing.',

                // Services Section
                'services.title': 'Our Services',
                'services.subtitle': 'Complete advertising panels and digital printing solutions for all your needs',
                'services.advertising_panels.title': 'Advertising Panels',
                'services.advertising_panels.description': 'Professional advertising panels for effective business promotion and brand visibility.',
                'services.product_labels.title': 'Product Labels',
                'services.product_labels.description': 'High-quality product labels and packaging labels for your business needs.',
                'services.pvc_vinyl.title': 'PVC Banner & Vinyl',
                'services.pvc_vinyl.description': 'Durable PVC banners and vinyl printing for outdoor and indoor advertising.',
                'services.business_cards.title': 'Business Cards & Brochures',
                'services.business_cards.description': 'Professional business cards, brochures, and marketing materials.',
                'services.stickers.title': 'Custom Stickers',
                'services.stickers.description': 'Custom stickers for branding, promotion, and decorative purposes.',
                'services.decals.title': 'Window & Car Decals',
                'services.decals.description': 'Professional window and car decals for business advertising and personal use.',
                'services.vision_film.title': 'One-way Vision Film',
                'services.vision_film.description': 'One-way vision film for window advertising that maintains visibility from inside.',
                'services.logo.title': 'Logo Design and Branding',
                'services.logo.description': 'Custom logo design and brand development that captures your company\'s essence and leaves a lasting impression.',
                'services.flyers.title': 'Flyers',
                'services.flyers.description': 'Professional flyers and business brochures to effectively promote your services and products.',
                'services.large_format.title': 'Large Format Prints',
                'services.large_format.description': 'High-quality large format printing for all your display and communication needs.',
                'services.packaging.title': 'Product Labels and Packaging',
                'services.packaging.description': 'Professional product labels and packaging labels to enhance your products.',
                'services.apparel.title': 'Advertising Panels',
                'services.apparel.description': 'Manufacturing professional advertising panels for your outdoor and indoor communication.',
                'services.print.title': 'Digital Printing',
                'services.print.description': 'Complete digital printing services including PVC banners, vinyl, custom stickers, decals, and one-way vision film.',

                // Portfolio Section
                'portfolio.title': 'Our Portfolio',
                'portfolio.subtitle': 'Discover our recent achievements and creative solutions in printing and advertising',
                'portfolio.item.advertising': '4K Print - Advertising Panel Design and Manufacturing',
                'portfolio.item.labels': '4K Print - Product Labels and Packaging Labels',
                'portfolio.item.pvc_vinyl': '4K Print - PVC Banner and Vinyl Printing',
                'portfolio.item.large_format': '4K Print - Large Format Prints and Digital Printing',
                'portfolio.item.stickers': '4K Print - Custom Stickers and Window Decals',
                'portfolio.item.logo_cards': '4K Print - Logo Design and Business Cards',
                'portfolio.category.advertising': 'Advertising Panels',
                'portfolio.category.labels': 'Product Labels and Packaging',
                'portfolio.category.pvc_vinyl': 'PVC Banners and Vinyl',
                'portfolio.category.large_format': 'Large Format Prints',
                'portfolio.category.stickers': 'Stickers and Decals',
                'portfolio.category.branding': 'Logo and Branding',
                'portfolio.view.btn': 'View Project',

                // Contact Section
                'contact.title': 'Get In Touch',
                'contact.subtitle': 'Ready to bring your vision to life? Let\'s discuss your project',
                'contact.form.name': 'Name *',
                'contact.form.email': 'Email *',
                'contact.form.project_type': 'Project Type',
                'contact.form.select_service': 'Select a service',
                'contact.form.project.logo': 'Logo Design and Branding',
                'contact.form.project.flyers': 'Flyers',
                'contact.form.project.largeformat': 'Large Format Prints',
                'contact.form.project.packaging': 'Product Labels and Packaging',
                'contact.form.project.apparel': 'Advertising Panels',
                'contact.form.project.print': 'Digital Printing',
                'contact.form.project.other': 'Other',
                'contact.form.message': 'Message *',
                'contact.form.message_placeholder': 'Tell us about your project...',
                'contact.form.other': 'Other',
                'contact.form.submit': 'Send Message',
                'contact.form.success': 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
                'contact.info.visit.title': 'Visit Our Workshop',
                'contact.info.visit.address': 'Errahma - Casablanca<br>Morocco',
                'contact.info.contact.title': 'Contact Us',
                'contact.info.contact.phone': 'Phone: <a href="https://api.whatsapp.com/message/BMEHYYEJEZLQI1" target="_blank">+212 622-646474</a>',
                'contact.info.contact.email': 'Email: <a href="mailto:graphienet@gmail.com">graphienet@gmail.com</a>',
                'contact.info.hours.title': 'Business Hours',
                'contact.info.hours.weekdays': 'Monday - Thursday: 9:00 AM - 1:00 PM ; 2:30 PM - 7:00 PM',
                'contact.info.hours.friday': 'Friday: 9:00 AM - 1:00 PM ; 2:45 PM - 7:00 PM',
                'contact.info.hours.saturday': 'Saturday: 9:00 AM - 1:00 PM ; 2:30 PM - 7:00 PM',
                'contact.info.hours.sunday': 'Sunday: Closed',

                // Footer
                'footer.description': 'Company specializing in the manufacture of advertising panels and digital printing. We help creative creators bring their ideas to reality and business owners enhance their advertising.',
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
        // Check if translation exists in current language
        const currentLangTranslation = this.translations[this.currentLanguage]?.[key];
        const fallbackTranslation = this.translations['fr']?.[key];
        
        let translation;
        
        // Log warning if translation key is missing
        if (!currentLangTranslation && !fallbackTranslation) {
            console.warn(`⚠️ Missing translation key: "${key}" for language "${this.currentLanguage}"`);
            // Create user-friendly fallback from key name
            translation = this.createFallbackText(key);
        } else if (!currentLangTranslation && fallbackTranslation) {
            console.warn(`⚠️ Missing translation key: "${key}" for language "${this.currentLanguage}", using French fallback`);
            translation = fallbackTranslation;
        } else {
            translation = currentLangTranslation;
        }

        // Simple parameter replacement
        let result = translation;
        Object.keys(params).forEach(param => {
            result = result.replace(`{{${param}}}`, params[param]);
        });

        return result;
    }

    // Create user-friendly fallback text from translation key
    createFallbackText(key) {
        // Extract the last part of the key (after the last dot)
        const keyParts = key.split('.');
        const lastPart = keyParts[keyParts.length - 1];
        
        // Skip if it's just 'title' or 'description'
        if (lastPart === 'title' || lastPart === 'description') {
            // Use the second-to-last part if available
            const servicePart = keyParts.length > 1 ? keyParts[keyParts.length - 2] : lastPart;
            return this.formatKeyToReadableText(servicePart);
        }
        
        return this.formatKeyToReadableText(lastPart);
    }

    // Format a key part into readable text
    formatKeyToReadableText(keyPart) {
        return keyPart
            .split('_') // Split on underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join with spaces
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