/* =====================================================
   НАЛАШТУВАННЯ — шапка, меню й підвал беруться звідси
   і автоматично з'являються на кожній сторінці.
   Змінили тут — змінилось на всьому сайті.
   ===================================================== */

const SITE_NAME = 'Назва сайту';

// Логотип: картинка (шлях від кореня сайту) або, якщо LOGO_IMG порожній, текст
const LOGO_TEXT = 'Логотип';
const LOGO_IMG = 'img/logo.png';
const LOGO_ALT = 'Емблема Вінницького державного педагогічного університету імені Михайла Коцюбинського';

// Класи, які є в розділах «Учням/Батькам» і «Вчителям»
const GRADES = [5, 6, 7, 8, 9];

// Розділи всередині кожного класу.
// slug — назва файлу (games → games.html), children — підрозділи.
const STUDENT_TOPICS = [
  { label: 'Розвиваючі розваги (Ігри)', slug: 'games' },
  { label: 'Розклад занять',            slug: 'schedule' },
  { label: 'Матеріали',                 slug: 'materials' },
  { label: 'Відеоуроки',                slug: 'videos' },
  { label: 'Завдання',                  slug: 'tasks', children: [
      { label: 'Тести',               slug: 'tests' },
      { label: 'Практичні завдання',  slug: 'practice' },
  ] },
  { label: 'Корисно',                   slug: 'useful' },
];

const TEACHER_TOPICS = [
  { label: 'Матеріали',                        slug: 'materials' },
  { label: 'Модельні програми',                slug: 'programs' },
  { label: 'Підручники',                       slug: 'textbooks' },
  { label: 'Календарно-тематичне планування',  slug: 'planning' },
  { label: 'Корисно',                          slug: 'useful' },
];

// Будує список класів із розділами: students/5/games.html тощо
function gradeMenu(folder, topics) {
  return GRADES.map((g) => ({
    label: `${g} клас`,
    href: `${folder}/${g}/index.html`,
    children: topics.map((t) => ({
      label: t.label,
      href: `${folder}/${g}/${t.slug}.html`,
      ...(t.children && {
        children: t.children.map((c) => ({
          label: c.label,
          href: `${folder}/${g}/${c.slug}.html`,
        })),
      }),
    })),
  }));
}

// Головне меню
const NAV = [
  { label: 'Головна',           href: 'index.html' },
  { label: 'Про автора',        href: 'author.html' },
  { label: 'Учням/Батькам',     href: 'students-parents.html', children: gradeMenu('students', STUDENT_TOPICS) },
  { label: 'Вчителям',          href: 'teachers.html',         children: gradeMenu('teachers', TEACHER_TOPICS) },
  { label: 'Новинки/Цікавинки', href: 'news.html' },
];

// Контакти у підвалі
const EMAIL = 'example@email.com';
const PHONE = '+380 00 000 00 00';

const SOCIALS = [
  { label: 'Telegram',  href: 'https://t.me/your_name' },
  { label: 'Instagram', href: 'https://instagram.com/your_name' },
  { label: 'Facebook',  href: 'https://facebook.com/your_name' },
  { label: 'YouTube',   href: 'https://youtube.com/@your_name' },
];

/* =====================================================
   РЕСУРСИ — посилання, які з'являються на сторінках розділів.
   Щоб додати нове, скопіюйте будь-який блок { ... }, змініть
   рядки й додайте кому в кінці. Нічого більше правити не треба.

   type:  'pdf' | 'book' | 'doc' | 'site' | 'game' | 'video' | 'test' | 'course' | 'fact'
   official: true — додає значок «Офіційний ресурс» (МОН, Мінцифри, кіберполіція тощо)
   news — сторінка «Новинки/Цікавинки» (where: ['news'])
   where: на яких сторінках показати ресурс (адреса без .html):
     students/5/games      → Учням/Батькам → 5 клас → Розвиваючі розваги
     students/5/schedule   → … Розклад занять
     students/5/materials  → … Матеріали
     students/5/videos     → … Відеоуроки
     students/5/tests      → … Завдання → Тести
     students/5/practice   → … Завдання → Практичні завдання
     students/5/useful     → … Корисно
     teachers/5/materials  → Вчителям → 5 клас → Матеріали
     teachers/5/programs   → … Модельні програми
     teachers/5/textbooks  → … Підручники
     teachers/5/planning   → … Календарно-тематичне планування
     teachers/5/useful     → … Корисно
   Замість 5 підставте потрібний клас (5–9). Один ресурс можна
   показати на кількох сторінках одразу.
   ===================================================== */

// Допоміжне: pages('teachers', 'programs') → програми у всіх класах 5–9
const pages = (folder, slug, grades = GRADES) =>
  grades.map((g) => `${folder}/${g}/${slug}`);

const RESOURCES = [
  // ---------- Підручники: і вчителям, і учням/батькам ----------
  {
    title: 'Інформатика, 5 клас — підручник',
    desc: 'Ривкінд Й. Я. та ін. · Видавництво «Генеза», 2022.',
    type: 'pdf',
    url: 'https://www.geneza.ua/sites/default/files/ebooks/%D0%86%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0_5%20%D0%BA%D0%BB%D0%B0%D1%81_%D0%93%D0%B5%D0%BD%D0%B5%D0%B7%D0%B0.pdf',
    where: ['teachers/5/textbooks', 'students/5/materials'],
  },
  {
    title: 'Інформатика, 6 клас — підручник',
    desc: 'Електронна версія в онлайн-читалці Issuu.',
    type: 'book',
    url: 'https://e.issuu.com/embed.html?d=6-klas-informatyka-ryvkind-2023&pageLayout=singlePage&u=stankobog',
    where: ['teachers/6/textbooks', 'students/6/materials'],
  },
  {
    title: 'Інформатика, 7 клас — підручник',
    desc: 'Ривкінд Й. Я. та ін. · Видавництво «Генеза», 2024.',
    type: 'pdf',
    url: 'https://www.geneza.ua/sites/default/files/ebooks/%D0%A0%D0%B8%D0%B2%D0%BA%D1%96%D0%BD%D0%B4_%D0%86%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0_%D0%9F_7.pdf',
    where: ['teachers/7/textbooks', 'students/7/materials'],
  },
  {
    title: 'Інформатика, 8 клас — підручник',
    desc: 'Ривкінд Й. Я. та ін. · Видавництво «Генеза».',
    type: 'pdf',
    url: 'https://www.geneza.ua/sites/default/files/ebooks/%D0%A0%D0%B8%D0%B2%D0%BA%D1%96%D0%BD%D0%B4_%D0%86%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0_8_%28%D0%BD%D0%B0%20%D0%B2%D0%B8%D0%B1%D1%96%D1%80%20%D0%B2%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%96%D0%B2%29.pdf',
    where: ['teachers/8/textbooks', 'students/8/materials'],
  },
  {
    title: 'Інформатика, 9 клас — підручник',
    desc: 'Ривкінд Й. Я. та ін. · Видавництво «Генеза».',
    type: 'pdf',
    url: 'https://lms.e-school.net.ua/assets/courseware/v1/1b0be4541dfdab03714fc6d4fa105bc1/asset-v1:Geneza+Info9+2025+type@asset+block/%D0%A0%D0%B8%D0%B2%D0%BA%D1%96%D0%BD%D0%B4_%D0%86%D0%BD%D1%84%D0%BE%D1%80%D0%BC_%D0%9F_9_%D0%BF%D1%96%D0%B4%D1%80%D1%83%D1%87%D0%BD%D0%B8%D0%BA_%D0%BD%D0%B0_%D0%B3%D1%80%D0%B8%D1%84.pdf',
    where: ['teachers/9/textbooks', 'students/9/materials'],
  },

  // ---------- Для вчителів ----------
  {
    title: 'Календарно-тематичне планування, 5 клас',
    desc: 'Поурочне планування за підручником Ривкінда, 1,5 години на тиждень (Google Диск).',
    type: 'doc',
    url: 'https://drive.google.com/file/d/1EZDCK74LJk5pW5TW_7ABD0bgVi5l2meq/view',
    where: ['teachers/5/planning'],
  },
  {
    title: 'Модельна навчальна програма «Інформатика», 5–6 класи',
    desc: 'Ривкінд Й. Я., Лисенко Т. І., Чернікова Л. А., Шакотько В. В. (сайт МОН).',
    type: 'pdf',
    official: true,
    url: 'https://mon.gov.ua/static-objects/mon/sites/1/zagalna%20serednya/Navchalni.prohramy/2021/14.07/Model.navch.prohr.5-9.klas.NUSH-poetap.z.2022/Inform.osv.haluz.5-6-kl/Inform.5-6-kl.Ryvkind.ta.in.14.07.pdf',
    where: pages('teachers', 'programs', [5, 6]),
  },
  {
    title: 'Модельні навчальні програми для 5–9 класів НУШ',
    desc: 'Офіційна сторінка МОН зі всіма програмами за освітніми галузями.',
    type: 'site',
    official: true,
    url: 'https://mon.gov.ua/osvita-2/zagalna-serednya-osvita/osvitni-programi/modelni-navchalni-programi-dlya-5-9-klasiv-novoi-ukrainskoi-shkoli-zaprovadzhuyutsya-poetapno-z-2022-roku',
    where: pages('teachers', 'programs'),
  },
  {
    title: 'Сайт вчителя інформатики',
    desc: 'Корисні матеріали та підручники з інформатики.',
    type: 'site',
    url: 'https://informatik.pp.ua/pidruchniki/9-klas/pidruchnyk-informatyka-9-klas-ryvkind-2026/',
    where: ['teachers/9/useful'],
  },

  // ---------- Для учнів ----------
  {
    title: 'Interland — гра від Google',
    desc: 'Онлайн-гра про безпеку в інтернеті: чотири рівні, українською мовою.',
    type: 'game',
    url: 'https://beinternetawesome.withgoogle.com/uk_ua/interland',
    where: pages('students', 'games'),
  },

  // =====================================================================
  //  ВІДЕОУРОКИ  (Учням/Батькам → клас → Відеоуроки)
  // =====================================================================
  {
    title: 'Всеукраїнська школа онлайн',
    desc: 'Державна платформа МОН: понад 2500 відеоуроків, тестів і матеріалів для 5–11 класів, зокрема з інформатики.',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/',
    where: [...pages('students', 'videos'), ...pages('students', 'tests'), ...pages('teachers', 'useful')],
  },
  {
    title: 'Інформатика у Всеукраїнській школі онлайн',
    desc: 'Усі курси з інформатики на платформі ВШО в одному списку.',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/course_category/informatika/',
    where: pages('students', 'videos'),
  },
  {
    title: 'Інформатика. 5 клас',
    desc: 'Курс на платформі «Всеукраїнська школа онлайн».',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/courses/course-v1:UIED+Information-technology-5th-grade+2025/about',
    where: ['students/5/videos'],
  },
  {
    title: 'Інформатика, 5–6 класи (НУШ)',
    desc: 'Курс на платформі «Всеукраїнська школа онлайн».',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/courses/course-v1:Katalyst+Informatyka-NUS-5-6th+2024/about',
    where: pages('students', 'videos', [5, 6]),
  },
  {
    title: 'Інформатика, 7–9 класи (НУШ)',
    desc: 'Курс на платформі «Всеукраїнська школа онлайн».',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/courses/course-v1:Katalyst+Informatyka-NUS-7-9th+2025/about',
    where: pages('students', 'videos', [7, 8, 9]),
  },
  {
    title: 'Інформатика. 9 клас',
    desc: 'Курс на платформі «Всеукраїнська школа онлайн».',
    type: 'course',
    official: true,
    url: 'https://lms.e-school.net.ua/courses/course-v1:UIED+Information-technology-9th-grade+2025/about',
    where: ['students/9/videos'],
  },
  {
    title: 'Канал «Всеукраїнська школа онлайн» на YouTube',
    desc: 'Записи відеоуроків проєкту МОН.',
    type: 'video',
    official: true,
    url: 'https://www.youtube.com/channel/UCqSeppXKUO6x8FSCWiMD1zA/featured',
    where: pages('students', 'videos'),
  },
  {
    title: 'Цифрові навички та онлайн-безпека',
    desc: 'Освітній серіал Дія.Освіта про безпеку в мережі для підлітків і батьків. Перша серія відкрита всім, для решти потрібен вхід через Дію.',
    type: 'video',
    official: true,
    url: 'https://osvita.diia.gov.ua/courses/digital-skills-and-online-safety',
    where: pages('students', 'videos'),
  },
  {
    title: 'Khan Academy: програмування',
    desc: 'Безкоштовні відеоуроки з JavaScript і веб-розробки; український переклад у бета-версії.',
    type: 'video',
    url: 'https://uk.khanacademy.org/computing/computer-programming',
    where: pages('students', 'videos', [8, 9]),
  },
  {
    title: 'Програмування для дітей: алгоритми та проєкти в Scratch',
    desc: 'Онлайн-курс платформи Prometheus для 5 класу.',
    type: 'course',
    url: 'https://prometheus.org.ua/code/',
    where: pages('students', 'videos', [5, 6]),
  },
  {
    title: 'Основи програмування (Prometheus)',
    desc: 'Безкоштовний онлайн-курс для початківців.',
    type: 'course',
    url: 'https://prometheus.org.ua/prometheus-free/programming-basics/',
    where: [...pages('students', 'videos', [8, 9]), ...pages('teachers', 'useful', [8, 9])],
  },

  // =====================================================================
  //  ТЕСТИ  (Учням/Батькам → клас → Завдання → Тести)
  // =====================================================================
  // Для кожного класу 5–9 створюється своя картка (адреса змінюється за номером класу)
  ...GRADES.map((g) => ({
    title: `Тести з інформатики, ${g} клас`,
    desc: 'Тисячі тестів від вчителів на платформі «На Урок»: оберіть тему й проходьте онлайн.',
    type: 'test',
    url: `https://naurok.com.ua/test/informatika/klas-${g}`,
    where: [`students/${g}/tests`, `teachers/${g}/materials`],
  })),
  {
    title: 'Підсумковий тест з інформатики, 5 клас',
    desc: 'Тест на платформі «Всеосвіта»: перевірте себе після теми.',
    type: 'test',
    url: 'https://vseosvita.ua/test/pidsumkovyi-test-z-informatyky-dlia-5-klasu-913224.html',
    where: ['students/5/tests'],
  },
  {
    title: 'Історія обчислювальних і комп’ютерних пристроїв',
    desc: 'Тест для 8 класу (НУШ) на платформі «На Урок».',
    type: 'test',
    url: 'https://naurok.com.ua/test/3-5-8-nush-istoriya-obchislyuvalnih-i-komp-yuternih-pristro-v-3543365.html',
    where: ['students/8/tests'],
  },

  // =====================================================================
  //  ПРАКТИЧНІ ЗАВДАННЯ  (Учням/Батькам → клас → Завдання → Практичні)
  // =====================================================================
  {
    title: 'Клавіатурний тренажер Ratatype: уроки українською',
    desc: '19 безкоштовних уроків сліпого друку з українською розкладкою.',
    type: 'site',
    url: 'https://www.ratatype.com/courses/ukrainian/',
    where: pages('students', 'practice'),
  },

  // =====================================================================
  //  РОЗВИВАЮЧІ ІГРИ  (Учням/Батькам → клас → Розвиваючі розваги)
  // =====================================================================
  {
    title: 'Симулятор онлайн-безпеки для дітей',
    desc: 'Інтерактивний симулятор від Мінцифри: незнайомі контакти, захист пристроїв і акаунтів, розпізнавання шахраїв.',
    type: 'game',
    official: true,
    url: 'https://osvita.diia.gov.ua/simulators/e-safety-children-simulator',
    where: pages('students', 'games'),
  },
  {
    title: 'Spoofy — гра про кібербезпеку',
    desc: 'Гра-пригода для дітей 7–12 років від компанії CGI: безкоштовно, без реєстрації, українською (сторінка на Дія.Освіта).',
    type: 'game',
    url: 'https://osvita.diia.gov.ua/news/spoofy-ditaca-gra-pro-kiberbezpeku-vid-cgi-dostupna-ukrainskou-movou',
    where: pages('students', 'games', [5, 6]),
  },
  {
    title: 'Ratarace — гонки на клавіатурі',
    desc: 'Безкоштовна гра від Ratatype: чим точніше й швидше друкуєш, тим швидше біжить персонаж.',
    type: 'game',
    url: 'https://www.ratatype.com/typing-games/race/',
    where: pages('students', 'games'),
  },
  {
    title: 'Ratashooter — гра на швидкість друку',
    desc: 'Безкоштовна гра від Ratatype для дітей і дорослих.',
    type: 'game',
    url: 'https://www.ratatype.com/typing-games/shooter/',
    where: pages('students', 'games'),
  },
  {
    title: 'Scratch',
    desc: 'Безкоштовне середовище блокового програмування: створюйте власні ігри, історії й анімації та діліться ними.',
    type: 'site',
    url: 'https://scratch.mit.edu/',
    where: [
      ...pages('students', 'games', [5, 6, 7]),
      ...pages('students', 'practice', [5, 6, 7]),
      ...pages('teachers', 'useful', [5, 6, 7]),
    ],
  },
  {
    title: 'Blockly Games — ігри-головоломки з кодом',
    desc: 'Серія навчальних ігор із блоковим програмуванням для початківців.',
    type: 'game',
    url: 'https://blockly.games/?lang=uk',
    where: [...pages('students', 'games', [5, 6, 7]), ...pages('students', 'practice', [5, 6, 7])],
  },
  {
    title: 'Wordwall: інформатика',
    desc: 'Понад 10 000 вікторин і ігор від вчителів, переважно українською. Частина матеріалів потребує платної підписки.',
    type: 'game',
    url: 'https://wordwall.net/uk-ua/community/%D1%96%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0',
    where: [...pages('students', 'games'), ...pages('teachers', 'useful')],
  },

  // =====================================================================
  //  КОРИСНО  (безпека в інтернеті, для батьків і вчителів)
  // =====================================================================
  {
    title: 'Безпека дітей в інтернеті: поради кіберполіції',
    desc: 'Для батьків: налаштування пристроїв, паролі, приватність і розмова з дитиною про безпеку.',
    type: 'doc',
    official: true,
    url: 'https://cyberpolice.gov.ua/article/bezpeka-ditej-v-interneti-porady-kiberpolicziyi-3851/',
    where: pages('students', 'useful'),
  },
  {
    title: 'Кібербрама: матеріали для навчання учнів кібербезпеці',
    desc: 'Уроки «Моя приватність» (PDF) для 5–8 і 9–11 класів.',
    type: 'pdf',
    official: true,
    url: 'https://stopfraud.gov.ua/en/cybersecurity-in-education/materialy-dlya-navchannya-uchniv-kiberbezpetsi-i568',
    where: [...pages('students', 'useful'), ...pages('teachers', 'materials')],
  },
  {
    title: 'Цифрові навички для вчителів',
    desc: 'Освітній серіал Дія.Освіта з цифрової грамотності для вчителів.',
    type: 'course',
    official: true,
    url: 'https://osvita.diia.gov.ua/courses/serial-iz-tsyfrovoi-hramotnosti-dlia-vchyteliv',
    where: pages('teachers', 'useful'),
  },
  {
    title: 'Година коду (Hour of Code)',
    desc: 'Сторінка українською: як провести годину програмування та де знайти заняття для класу.',
    type: 'site',
    url: 'https://hourofcode.com/ua/how-to',
    where: pages('teachers', 'useful'),
  },
  {
    title: 'Bebras — конкурс з інформатики та комп’ютерного мислення',
    desc: 'Міжнародний конкурс, сайт англійською. Приклади завдань для розвитку логіки й алгоритмічного мислення.',
    type: 'site',
    url: 'https://www.bebras.org/',
    where: pages('teachers', 'useful'),
  },

  // =====================================================================
  //  ЦІКАВИНКИ  (сторінка «Новинки/Цікавинки»)
  // =====================================================================
  {
    title: 'МЕСМ — перший комп’ютер, створений у Києві',
    desc: 'Мала електронна обчислювальна машина: перший запуск — 6 листопада 1950 року, державні випробування — 25 грудня 1951 року. Збудована під керівництвом Сергія Лебедєва у Феофанії біля Києва, мала близько 6000 електронних ламп.',
    type: 'fact',
    url: 'https://uk.wikipedia.org/wiki/%D0%9C%D0%B0%D0%BB%D0%B0_%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%BD%D0%B0_%D0%BE%D0%B1%D1%87%D0%B8%D1%81%D0%BB%D1%8E%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0_%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D0%B0',
    where: ['news'],
  },
  {
    title: 'Перший комп’ютер у Києві був завбільшки як будинок',
    desc: 'Стаття Укрінформу з архівними фото: машина займала кімнату площею 60 м², містила близько 6000 електронних ламп і споживала приблизно 25 кВт.',
    type: 'fact',
    url: 'https://www.ukrinform.ua/rubric-other_news/1617050-pershiy_kompyuter_u_kie_vi_buv_rozmirom_iz_budinok_foto_z_arhivu_1907697.html',
    where: ['news'],
  },
  {
    title: 'Комп’ютер «Київ»: історія з білими плямами',
    desc: 'DEV.UA розповідає про радянську машину «Київ» 1950-х і про те, чому дати та авторство в її історії досі неясні.',
    type: 'fact',
    url: 'https://dev.ua/news/kompiuter-kyiv',
    where: ['news'],
  },
  {
    title: 'Хронологія розвитку обчислювальної техніки в Україні',
    desc: 'Віхи української комп’ютерної історії за роками — стаття у Вікіпедії.',
    type: 'fact',
    url: 'https://uk.wikipedia.org/wiki/%D0%A5%D1%80%D0%BE%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F_%D1%80%D0%BE%D0%B7%D0%B2%D0%B8%D1%82%D0%BA%D1%83_%D0%BE%D0%B1%D1%87%D0%B8%D1%81%D0%BB%D1%8E%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%97_%D1%82%D0%B5%D1%85%D0%BD%D1%96%D0%BA%D0%B8_%D0%B2_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96',
    where: ['news'],
  },
  {
    title: '20 цікавих фактів про комп’ютери',
    desc: 'Добірка цікавих фактів про комп’ютери, інтернет і комп’ютерну культуру на платформі «Всеосвіта».',
    type: 'fact',
    url: 'https://vseosvita.ua/blogs/20-tsikavykh-faktiv-pro-kompiutery-104760.html',
    where: ['news'],
  },
];

const RESOURCE_TYPES = {
  pdf: 'PDF',
  book: 'Книга',
  doc: 'Документ',
  site: 'Сайт',
  game: 'Гра',
  video: 'Відео',
  test: 'Тест',
  course: 'Курс',
  fact: 'Цікавинка',
};

/* ===================================================== */

// Шлях до кореня сайту: '' для головних сторінок, '../../' для вкладених
const ROOT = document.body.dataset.root || '';

// Адреса поточної сторінки відносно кореня сайту: students/5/materials
const siteBase = decodeURIComponent(new URL(ROOT || './', location.href).pathname);
const pageKey = decodeURIComponent(location.pathname)
  .slice(siteBase.length)
  .replace(/\.html$/, '');

const normPath = (p) => decodeURIComponent(p).replace(/index\.html$/, '');
const here = normPath(location.pathname);

const itemUrl = (item) => ROOT + item.href;
const isCurrent = (item) =>
  normPath(new URL(itemUrl(item), location.href).pathname) === here;
const inBranch = (item) =>
  isCurrent(item) || (item.children || []).some(inBranch);

function renderItems(items, level = 0) {
  return items
    .map((item) => {
      const current = isCurrent(item);
      const branch = inBranch(item);
      const link = `<a href="${itemUrl(item)}"${
        current ? ' class="is-active" aria-current="page"' : ''
      }>${item.label}</a>`;

      if (!item.children) {
        return `<li class="menu__item${branch ? ' is-active-branch' : ''}">
          <div class="menu__row">${link}</div>
        </li>`;
      }

      // Вкладені рівні одразу розгортаємо, якщо ми на цій гілці
      const open = level > 0 && branch;
      return `<li class="menu__item has-sub${open ? ' is-open' : ''}${branch ? ' is-active-branch' : ''}">
        <div class="menu__row">
          ${link}
          <button type="button" class="sub-toggle" aria-expanded="${open}" aria-label="Підрозділи: ${item.label}"></button>
        </div>
        <ul class="submenu">${renderItems(item.children, level + 1)}</ul>
      </li>`;
    })
    .join('');
}

function setOpen(li, open) {
  li.classList.toggle('is-open', open);
  const btn = li.querySelector(':scope > .menu__row > .sub-toggle');
  if (btn) btn.setAttribute('aria-expanded', String(open));
}

function renderHeader() {
  const header = document.querySelector('#site-header');
  if (!header) return;

  const logo = LOGO_IMG
    ? `<img src="${ROOT}${LOGO_IMG}" alt="${LOGO_ALT}" class="logo__img" width="48" height="48">`
    : LOGO_TEXT;

  header.innerHTML = `
    <div class="container header__inner">
      <a href="${ROOT}index.html" class="logo" aria-label="На головну сторінку">${logo}</a>
      <button class="nav-toggle" aria-label="Відкрити меню" aria-expanded="false" aria-controls="nav">☰</button>
      <nav id="nav" class="nav" aria-label="Основна навігація">
        <ul class="menu">${renderItems(NAV)}</ul>
      </nav>
    </div>
  `;

  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('#nav');

  // Мобільне меню (гамбургер)
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Кнопки ▾ розгортають і згортають списки
  nav.addEventListener('click', (event) => {
    const btn = event.target.closest('.sub-toggle');
    if (!btn) return;

    const li = btn.closest('.has-sub');
    const willOpen = !li.classList.contains('is-open');

    // На одному рівні відкритим лишається один пункт
    li.parentElement
      .querySelectorAll(':scope > .has-sub.is-open')
      .forEach((sibling) => setOpen(sibling, false));

    setOpen(li, willOpen);
  });

  // Закриваємо випадаючі списки кліком повз меню або клавішею Esc
  const closeTopLevel = () =>
    nav.querySelectorAll('.menu > .has-sub.is-open').forEach((li) => setOpen(li, false));

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) closeTopLevel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTopLevel();
  });
}

function renderFooter() {
  const footer = document.querySelector('#site-footer');
  if (!footer) return;

  const phoneDigits = PHONE.replace(/[^\d+]/g, '');

  const socials = SOCIALS.map(
    ({ label, href }) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
  ).join('');

  footer.innerHTML = `
    <div class="container">
      <h2 class="footer__title">Зв'язок</h2>
      <div class="footer__grid">
        <div>
          <span class="footer__label">Електронна адреса</span>
          <a href="mailto:${EMAIL}">${EMAIL}</a>
        </div>
        <div>
          <span class="footer__label">Номер телефону</span>
          <a href="tel:${phoneDigits}">${PHONE}</a>
        </div>
        <div>
          <span class="footer__label">Соцмережі</span>
          <div class="socials">${socials}</div>
        </div>
      </div>
      <p class="footer__copy">© ${new Date().getFullYear()} ${SITE_NAME}</p>
    </div>
  `;
}

const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

// Картки ресурсів на сторінках розділів (список RESOURCES угорі файлу)
function renderResources() {
  const items = RESOURCES.filter((r) => r.where.includes(pageKey));
  if (!items.length) return;

  const container = document.querySelector('main .section .container');
  if (!container) return;

  // Там, де є ресурси, текст-заглушка вже не потрібен
  container.querySelectorAll('.placeholder').forEach((el) => el.remove());

  const cards = items
    .map(
      (r) => `
      <li>
        <a class="resource resource--${esc(r.type)}" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
          <span class="resource__tags">
            <span class="resource__type">${esc(RESOURCE_TYPES[r.type] || 'Посилання')}</span>
            ${r.official ? '<span class="resource__official">Офіційний ресурс</span>' : ''}
          </span>
          <span class="resource__title">${esc(r.title)}</span>
          <span class="resource__desc">${esc(r.desc)}</span>
          <span class="resource__go">Відкрити ↗</span>
        </a>
      </li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', `<ul class="resources">${cards}</ul>`);
}

// Українська множина: 1 клас, 2 класи, 5 класів
const plural = (n, [one, few, many]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

// Лічильники на головній рахуються зі списків угорі файлу (GRADES, RESOURCES):
// додали ресурс — число оновилось само, нічого міняти вручну не треба
function renderStats() {
  const box = document.querySelector('[data-stats]');
  if (!box) return;

  const urls = new Set(RESOURCES.map((r) => r.url));
  const official = new Set(RESOURCES.filter((r) => r.official).map((r) => r.url));
  const sites = new Set(RESOURCES.map((r) => new URL(r.url).hostname.replace(/^www\./, '')));

  const values = {
    grades: [GRADES.length, ['клас', 'класи', 'класів']],
    resources: [urls.size, ['ресурс', 'ресурси', 'ресурсів']],
    official: [official.size, ['офіційний ресурс', 'офіційні ресурси', 'офіційних ресурсів']],
    sites: [sites.size, ['сайт-джерело', 'сайти-джерела', 'сайтів-джерел']],
  };

  Object.entries(values).forEach(([key, [n, forms]]) => {
    const num = box.querySelector(`[data-stat="${key}"]`);
    const label = box.querySelector(`[data-label="${key}"]`);
    if (num) num.textContent = n;
    if (label) label.textContent = plural(n, forms);
  });
}

renderHeader();
renderFooter();
renderResources();
renderStats();
