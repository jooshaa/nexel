export type Locale = "uz" | "ru";

export const translations = {
  uz: {
    // Header / Search
    search: "Qidirish",
    searchPlaceholder: "Mahsulotlarni qidiring...",
    searchResults: "Qidiruv natijalari",
    searching: "Qidirilmoqda...",
    cancel: "Bekor qilish",
    product: "Mahsulot",

    // MegaMenu
    featuredProducts: "Tanlangan mahsulotlar",
    accessories: "Aksessuarlar",
    allSeries: "Barchasi",
    all: "Barcha",
    comingSoon: "Tez kunda",

    // FeaturedProducts
    featured: "Tanlangan",
    trending: "Trend",
    newArrivals: "Yangi kelganlar",
    discoverDetails: "Batafsil ko'rish",
    viewProduct: "Ko'rish",

    // CategoryClient / Breadcrumb
    home: "Bosh sahifa",
    learnMore: "Batafsil",

    // ProductPageClient
    backToHome: "Bosh sahifaga",
    color: "Rang",
    addToBag: "Savatga qo'shish",
    addedToBag: "✓ Savatga qo'shildi",
    details: "Tafsilotlar",
    payments: "To'lov",
    shipping: "Yetkazib berish",
    lookingForMore: "Ko'proq ko'rmoqchimisiz?",
    more: "Ko'proq →",

    // Footer
    support: "Yordam",
    contactUs: "Biz bilan bog'laning",
    userGuide: "Foydalanish qo'llanmasi",
    warranty: "Kafolat",
    internationalWarranty: "Xalqaro kafolat",
    safetyNotice: "Xavfsizlik ogohlantirishlar",
    aboutUs: "Biz haqimizda",
    nexel: "Nexel",
    leadershipTeam: "Rahbariyat",
    privacyPolicy: "Maxfiylik siyosati",
    userAgreement: "Foydalanuvchi shartnomasi",
    integrityCompliance: "Halollik va muvofiqlik",
    followNexel: "Nexelni kuzating",
    newsletter: "Yangiliklarga obuna bo'ling",
    emailPlaceholder: "Email manzilingizni kiriting",
    allRightsReserved: "Barcha huquqlar himoyalangan.",
    cookiePolicy: "Cookie siyosati",
    sitemap: "Sayt xaritasi",
    getDirections: "Yo'nalishni olish",
    flagshipStore: "Nexel Do'koni",
    flagshipAddress: "Toshkent sh., Matbuotchilar ko'ch. (Sayilgoh), A101",
  },

  ru: {
    // Header / Search
    search: "Поиск",
    searchPlaceholder: "Поиск продуктов...",
    searchResults: "Результаты поиска",
    searching: "Поиск...",
    cancel: "Отмена",
    product: "Продукт",

    // MegaMenu
    featuredProducts: "Рекомендуемые",
    accessories: "Аксессуары",
    allSeries: "Все серии",
    all: "Все",
    comingSoon: "Скоро",

    // FeaturedProducts
    featured: "Рекомендуемые",
    trending: "В тренде",
    newArrivals: "Новинки",
    discoverDetails: "Подробнее",
    viewProduct: "Смотреть",

    // CategoryClient / Breadcrumb
    home: "Главная",
    learnMore: "Подробнее",

    // ProductPageClient
    backToHome: "На главную",
    color: "Цвет",
    addToBag: "Добавить в корзину",
    addedToBag: "✓ Добавлено в корзину",
    details: "Характеристики",
    payments: "Оплата",
    shipping: "Доставка",
    lookingForMore: "Хотите посмотреть ещё?",
    more: "Ещё →",

    // Footer
    support: "Поддержка",
    contactUs: "Свяжитесь с нами",
    userGuide: "Руководство пользователя",
    warranty: "Гарантия",
    internationalWarranty: "Международная гарантия",
    safetyNotice: "Уведомление о безопасности",
    aboutUs: "О нас",
    nexel: "Nexel",
    leadershipTeam: "Команда руководства",
    privacyPolicy: "Политика конфиденциальности",
    userAgreement: "Пользовательское соглашение",
    integrityCompliance: "Честность и соответствие",
    followNexel: "Следите за Nexel",
    newsletter: "Подпишитесь на рассылку",
    emailPlaceholder: "Введите email адрес",
    allRightsReserved: "Все права защищены.",
    cookiePolicy: "Политика cookies",
    sitemap: "Карта сайта",
    getDirections: "Получить маршрут",
    flagshipStore: "Nexel Флагман",
    flagshipAddress: "г.Ташкент, ул.Матбуотчилар (Сайилгох), A101",
  },
} as const;

export type TranslationKey = keyof typeof translations.uz;
