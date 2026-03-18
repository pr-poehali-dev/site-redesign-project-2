import { useState } from "react";
import Icon from "@/components/ui/icon";

const COVER_IMG = "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/files/82e01712-b71f-473e-ad8f-9b49e0aff4e3.jpg";
const BANNER_IMG = "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/bucket/94365341-dd70-401e-a550-78b60c13c0f2.jpg";

const NAV_ITEMS = {
  ru: [
    { label: "О журнале", href: "#about" },
    { label: "Свежий выпуск", href: "#latest" },
    { label: "Архив", href: "#archive" },
    { label: "Редсовет", href: "#council" },
    { label: "Авторам", href: "#authors" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Latest Issue", href: "#latest" },
    { label: "Archive", href: "#archive" },
    { label: "Editorial Board", href: "#council" },
    { label: "For Authors", href: "#authors" },
  ],
};

const ARCHIVE = [
  { num: "№ 3", year: "2024", theme: { ru: "Образование и цифровая среда", en: "Education and Digital Environment" }, articles: 12 },
  { num: "№ 2", year: "2024", theme: { ru: "Философия педагогики", en: "Philosophy of Pedagogy" }, articles: 10 },
  { num: "№ 1", year: "2024", theme: { ru: "Наука и общество", en: "Science and Society" }, articles: 11 },
  { num: "№ 4", year: "2023", theme: { ru: "Этика в образовании", en: "Ethics in Education" }, articles: 9 },
  { num: "№ 3", year: "2023", theme: { ru: "Методология науки", en: "Methodology of Science" }, articles: 13 },
  { num: "№ 2", year: "2023", theme: { ru: "Социология знания", en: "Sociology of Knowledge" }, articles: 10 },
];

const COUNCIL = [
  { name: "Иванов Александр Петрович", role: { ru: "Главный редактор", en: "Editor-in-Chief" }, degree: { ru: "д-р филос. наук, профессор", en: "Dr. of Philosophy, Professor" } },
  { name: "Смирнова Елена Викторовна", role: { ru: "Зам. главного редактора", en: "Deputy Editor-in-Chief" }, degree: { ru: "д-р пед. наук, профессор", en: "Dr. of Pedagogy, Professor" } },
  { name: "Козлов Михаил Андреевич", role: { ru: "Ответственный секретарь", en: "Executive Secretary" }, degree: { ru: "канд. филос. наук, доцент", en: "PhD in Philosophy, Associate Professor" } },
  { name: "Новикова Ирина Сергеевна", role: { ru: "Член редколлегии", en: "Editorial Board Member" }, degree: { ru: "д-р социол. наук, профессор", en: "Dr. of Sociology, Professor" } },
  { name: "Фёдоров Дмитрий Николаевич", role: { ru: "Член редколлегии", en: "Editorial Board Member" }, degree: { ru: "д-р психол. наук, профессор", en: "Dr. of Psychology, Professor" } },
  { name: "Белова Анна Юрьевна", role: { ru: "Член редколлегии", en: "Editorial Board Member" }, degree: { ru: "канд. пед. наук, доцент", en: "PhD in Pedagogy, Associate Professor" } },
];

const LATEST_ARTICLES = [
  {
    num: "01",
    title: { ru: "Цифровая трансформация образовательного пространства: философский анализ", en: "Digital Transformation of Educational Space: A Philosophical Analysis" },
    author: "Петров В.С., Орлова Н.А.",
    pages: "P. 5–18",
  },
  {
    num: "02",
    title: { ru: "Этические основания современной науки в контексте социальных изменений", en: "Ethical Foundations of Modern Science in the Context of Social Change" },
    author: "Кириллов А.Д.",
    pages: "P. 19–31",
  },
  {
    num: "03",
    title: { ru: "Феноменология учебного опыта: от теории к практике", en: "Phenomenology of Learning Experience: From Theory to Practice" },
    author: "Зайцева М.В., Громов П.Е.",
    pages: "P. 32–47",
  },
  {
    num: "04",
    title: { ru: "Социальный конструктивизм и проблема научного знания", en: "Social Constructivism and the Problem of Scientific Knowledge" },
    author: "Лебедев К.И.",
    pages: "P. 48–59",
  },
];

const REQUIREMENTS = [
  { icon: "FileText", label: { ru: "Объём", en: "Length" }, text: { ru: "От 6 до 20 страниц (А4, 1,5 интервал)", en: "6 to 20 pages (A4, 1.5 line spacing)" } },
  { icon: "Globe", label: { ru: "Языки", en: "Languages" }, text: { ru: "Русский, английский", en: "Russian, English" } },
  { icon: "BookOpen", label: { ru: "Оформление", en: "Formatting" }, text: { ru: "ГОСТ Р 7.0.5–2008, список литературы в конце", en: "GOST R 7.0.5–2008, references at the end" } },
  { icon: "Users", label: { ru: "Рецензирование", en: "Peer Review" }, text: { ru: "Двойное слепое рецензирование", en: "Double-blind peer review" } },
  { icon: "Clock", label: { ru: "Сроки", en: "Timeline" }, text: { ru: "Рассмотрение в течение 30 рабочих дней", en: "Review within 30 working days" } },
  { icon: "CheckCircle", label: { ru: "Уникальность", en: "Originality" }, text: { ru: "Не менее 75% по системе Антиплагиат", en: "At least 75% originality (Antiplagiat)" } },
];

const T = {
  ru: {
    cert: "Свидетельство ПИ № ФС 77-86126",
    h1: "Социально-философские аспекты науки и образования",
    subtitle: "Social and Philosophical Dimensions of Education",
    desc: "Рецензируемое научное издание для преподавателей, исследователей и студентов в области философии, социологии и педагогики.",
    btnLatest: "Свежий выпуск",
    btnAuthors: "Авторам",
    statsLabels: ["Год основания", "Выпуска в год", "Опубликованных статей", "Список рекомендованных изданий"],
    aboutTag: "О журнале",
    aboutTitle: "Академическое издание нового формата",
    aboutText1: "Журнал «Социально-философские аспекты науки и образования» — рецензируемое научное периодическое издание, публикующее оригинальные статьи, обзоры и дискуссионные материалы по актуальным проблемам на стыке философии, социологии и теории образования.",
    aboutText2: "Журнал зарегистрирован Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций. Свидетельство о регистрации",
    aboutText3: "Издание предназначено для преподавателей высшей школы, научных работников, аспирантов и студентов магистратуры, чьи научные интересы лежат в области социальной философии, философии образования и науковедения.",
    issnPrint: "ISSN (печатный)",
    issnOnline: "ISSN (онлайн)",
    freq: "Периодичность",
    freqVal: "4 раза в год",
    lang: "Язык",
    langVal: "Русский, Английский",
    latestTag: "Свежий выпуск",
    latestTitle: "Выпуск № 4 · 2024",
    readFull: "Читать полный выпуск",
    downloadPdf: "Скачать PDF выпуска",
    archiveTag: "Архив",
    archiveTitle: "Все номера журнала",
    articlesWord: "статей",
    open: "Открыть",
    councilTag: "Редакция",
    councilTitle: "Редакционный совет",
    authorsTag: "Для авторов",
    authorsTitle: "Требования к публикациям",
    authorsDesc: "Журнал принимает рукописи на русском и английском языках. Все материалы проходят двойное слепое рецензирование. Публикация бесплатна.",
    submitBtn: "Подать статью",
    contactTitle: "Связаться с редакцией",
    contactDesc: "По вопросам публикации, подписки и сотрудничества пишите нам на электронную почту или звоните в рабочие часы.",
    emailLabel: "E-mail",
    phoneLabel: "Телефон",
    addrLabel: "Адрес",
    footerName: "Социально-философские аспекты науки и образования",
    issueLabel: "Выпуск № 4",
  },
  en: {
    cert: "Registration Certificate PI № FS 77-86126",
    h1: "Social and Philosophical Dimensions of Science and Education",
    subtitle: "Социально-философские аспекты науки и образования",
    desc: "A peer-reviewed academic journal for educators, researchers and students in the fields of philosophy, sociology and pedagogy.",
    btnLatest: "Latest Issue",
    btnAuthors: "For Authors",
    statsLabels: ["Founded", "Issues per year", "Articles published", "Recommended journal list"],
    aboutTag: "About the Journal",
    aboutTitle: "An Academic Publication of a New Format",
    aboutText1: "The journal 'Social and Philosophical Dimensions of Science and Education' is a peer-reviewed scholarly periodical publishing original articles, reviews, and discussion papers on current issues at the intersection of philosophy, sociology, and educational theory.",
    aboutText2: "The journal is registered with the Federal Service for Supervision of Communications, Information Technology and Mass Media. Registration Certificate",
    aboutText3: "The journal is aimed at university professors, researchers, postgraduate and master's students whose academic interests lie in social philosophy, philosophy of education, and science studies.",
    issnPrint: "ISSN (print)",
    issnOnline: "ISSN (online)",
    freq: "Frequency",
    freqVal: "4 issues per year",
    lang: "Language",
    langVal: "Russian, English",
    latestTag: "Latest Issue",
    latestTitle: "Issue № 4 · 2024",
    readFull: "Read full issue",
    downloadPdf: "Download PDF",
    archiveTag: "Archive",
    archiveTitle: "All Issues",
    articlesWord: "articles",
    open: "Open",
    councilTag: "Editorial",
    councilTitle: "Editorial Board",
    authorsTag: "For Authors",
    authorsTitle: "Submission Guidelines",
    authorsDesc: "The journal accepts manuscripts in Russian and English. All submissions undergo double-blind peer review. Publication is free of charge.",
    submitBtn: "Submit Article",
    contactTitle: "Contact the Editorial Office",
    contactDesc: "For questions about publication, subscription, and collaboration, please write to us or call during working hours.",
    emailLabel: "E-mail",
    phoneLabel: "Phone",
    addrLabel: "Address",
    footerName: "Social and Philosophical Dimensions of Science and Education",
    issueLabel: "Issue № 4",
  },
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("2024");
  const [lang, setLang] = useState<"ru" | "en">("ru");

  const t = T[lang];
  const years = ["2024", "2023"];
  const filtered = ARCHIVE.filter((a) => a.year === activeTab);

  return (
    <div className="min-h-screen bg-white font-golos text-[#0D1B3E]">

      {/* BANNER */}
      <a href="/" className="block w-full cursor-pointer hover:opacity-95 transition-opacity">
        <img src={BANNER_IMG} alt="Социально-философские аспекты науки и образования" className="w-full object-cover" />
      </a>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#C8D8F0]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="font-cormorant text-xl font-semibold tracking-wide text-[#0D2A6B]">
            СПФНО
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS[lang].map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-[#4A6090] hover:text-[#0D2A6B] transition-colors tracking-wide">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Переключатель языка */}
            <div className="flex items-center border border-[#C8D8F0] rounded overflow-hidden text-xs font-medium">
              <button
                onClick={() => setLang("ru")}
                className={`px-3 py-1.5 transition-colors ${lang === "ru" ? "bg-[#1A56DB] text-white" : "text-[#4A6090] hover:bg-[#F0F5FF]"}`}
              >
                РУ
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#1A56DB] text-white" : "text-[#4A6090] hover:bg-[#F0F5FF]"}`}
              >
                EN
              </button>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[#0D2A6B]">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#C8D8F0] bg-white">
            {NAV_ITEMS[lang].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-[#4A6090] hover:text-[#0D2A6B] border-b border-[#C8D8F0]/50">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-6">{t.cert}</p>
            <h1 className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-6 text-[#0D1B3E]">
              {t.h1}
            </h1>
            <p className="text-[#4A6090] leading-relaxed mb-3 text-sm tracking-wide">{t.subtitle}</p>
            <div className="w-12 h-px bg-[#1A56DB] my-8" />
            <p className="text-[#4A6090] leading-relaxed mb-10 max-w-md">{t.desc}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#latest" className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors">
                {t.btnLatest}
              </a>
              <a href="#authors" className="border border-[#1A56DB] text-[#1A56DB] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#1A56DB] hover:text-white transition-colors">
                {t.btnAuthors}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#C8D8F0]" />
            <img src={COVER_IMG} alt="Обложка журнала" className="relative w-full object-cover aspect-[3/4] shadow-sm" />
            <div className="absolute bottom-4 right-4 bg-white border border-[#C8D8F0] px-4 py-2">
              <p className="font-cormorant text-lg font-medium text-[#0D1B3E]">{t.issueLabel}</p>
              <p className="text-xs text-[#8AA0C8]">2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#C8D8F0] bg-[#F0F5FF]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["2023", "4", "120+", "ВАК"].map((num, i) => (
            <div key={i}>
              <p className="font-cormorant text-4xl font-light text-[#0D2A6B] mb-1">{num}</p>
              <p className="text-xs text-[#4A6090] uppercase tracking-widest">{t.statsLabels[i]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{t.aboutTag}</p>
            <h2 className="font-cormorant text-4xl font-light leading-snug text-[#0D1B3E]">{t.aboutTitle}</h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-[#4A6090] leading-relaxed">
            <p>{t.aboutText1}</p>
            <p>
              {t.aboutText2}{" "}
              <strong className="text-[#0D1B3E]">ПИ № ФС 77-86126</strong> от 01.10.2023 г.
            </p>
            <p>{t.aboutText3}</p>
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                { label: t.issnPrint, val: "2949-4605" },
                { label: t.issnOnline, val: "0000-0001" },
                { label: t.freq, val: t.freqVal },
                { label: t.lang, val: t.langVal },
              ].map((i) => (
                <div key={i.label} className="border-t border-[#C8D8F0] pt-3">
                  <p className="text-xs text-[#8AA0C8] uppercase tracking-wide mb-1">{i.label}</p>
                  <p className="font-medium text-[#0D1B3E] text-sm">{i.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ISSUE */}
      <section id="latest" className="bg-[#0D2A6B] text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#7A9FD0] mb-4">{t.latestTag}</p>
              <h2 className="font-cormorant text-4xl font-light">{t.latestTitle}</h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-sm text-[#7A9FD0] hover:text-white transition-colors">
              {t.readFull} <Icon name="ArrowRight" size={16} />
            </a>
          </div>
          <div className="space-y-0">
            {LATEST_ARTICLES.map((article) => (
              <div key={article.num} className="flex flex-col md:flex-row gap-6 py-7 border-t border-[#1A3D7A] group cursor-pointer">
                <span className="font-cormorant text-6xl font-light text-[#1A3D7A] group-hover:text-[#2A5AA0] transition-colors shrink-0 leading-none">
                  {article.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-cormorant text-xl font-light mb-2 group-hover:text-[#A8C8F0] transition-colors leading-snug">
                    {article.title[lang]}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-xs text-[#7A9FD0]">
                    <span>{article.author}</span>
                    <span>{article.pages}</span>
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={18} className="text-[#2A5AA0] group-hover:text-white transition-colors shrink-0 mt-1" />
              </div>
            ))}
          </div>
          <div className="border-t border-[#1A3D7A] pt-8 mt-2">
            <button className="border border-[#2A5AA0] text-white px-8 py-3 text-sm tracking-widest uppercase hover:border-white transition-colors">
              {t.downloadPdf}
            </button>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{t.archiveTag}</p>
          <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E]">{t.archiveTitle}</h2>
        </div>
        <div className="flex gap-1 mb-8 border-b border-[#C8D8F0]">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActiveTab(y)}
              className={`px-5 py-2 text-sm tracking-wide transition-colors -mb-px border-b-2 ${
                activeTab === y ? "border-[#1A56DB] text-[#1A56DB] font-medium" : "border-transparent text-[#4A6090] hover:text-[#0D1B3E]"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.num + item.year} className="border border-[#C8D8F0] p-6 hover:border-[#1A56DB] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-cormorant text-3xl font-light text-[#0D1B3E]">{item.num}</span>
                <span className="text-xs text-[#4A6090] bg-[#F0F5FF] px-2 py-1">{item.year}</span>
              </div>
              <p className="text-sm text-[#0D1B3E] mb-3 leading-snug">{item.theme[lang]}</p>
              <p className="text-xs text-[#8AA0C8]">{item.articles} {t.articlesWord}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#8AA0C8] group-hover:text-[#1A56DB] transition-colors">
                {t.open} <Icon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNCIL */}
      <section id="council" className="bg-[#F0F5FF] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{t.councilTag}</p>
            <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E]">{t.councilTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {COUNCIL.map((member) => (
              <div key={member.name} className="border-t border-l border-[#C8D8F0] p-6 last:border-r">
                <p className="font-cormorant text-lg font-medium mb-1 leading-snug text-[#0D1B3E]">{member.name}</p>
                <p className="text-xs text-[#1A56DB] uppercase tracking-wide mb-2">{member.role[lang]}</p>
                <p className="text-xs text-[#4A6090]">{member.degree[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <section id="authors" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{t.authorsTag}</p>
            <h2 className="font-cormorant text-4xl font-light leading-snug text-[#0D1B3E] mb-6">{t.authorsTitle}</h2>
            <p className="text-[#4A6090] leading-relaxed mb-8">{t.authorsDesc}</p>
            <button className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors">
              {t.submitBtn}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-0">
            {REQUIREMENTS.map((req) => (
              <div key={req.icon} className="flex gap-4 py-5 border-b border-[#C8D8F0] first:border-t">
                <div className="w-8 shrink-0 pt-0.5">
                  <Icon name={req.icon} size={16} className="text-[#1A56DB]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8AA0C8] mb-1">{req.label[lang]}</p>
                  <p className="text-sm text-[#0D1B3E]">{req.text[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#071A4A] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-cormorant text-4xl font-light mb-4">{t.contactTitle}</h2>
            <p className="text-[#7A9FD0] leading-relaxed">{t.contactDesc}</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: "Mail", label: t.emailLabel, val: "editor@spfno-journal.ru" },
              { icon: "Phone", label: t.phoneLabel, val: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: t.addrLabel, val: "Москва, ул. Примерная, д. 1" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-8 shrink-0 pt-0.5">
                  <Icon name={c.icon} size={16} className="text-[#7A9FD0]" />
                </div>
                <div>
                  <p className="text-xs text-[#7A9FD0] uppercase tracking-wide mb-0.5">{c.label}</p>
                  <p className="text-sm text-white">{c.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#C8D8F0] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8AA0C8]">
          <p className="font-cormorant text-base text-[#0D2A6B] font-semibold">{t.footerName}</p>
          <p>© 2024 СПФНО</p>
          <p>ПИ № ФС 77-86126</p>
        </div>
      </footer>
    </div>
  );
}
