import { useState } from "react";
import Icon from "@/components/ui/icon";

const COVER_IMG = "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/files/82e01712-b71f-473e-ad8f-9b49e0aff4e3.jpg";

const NAV_ITEMS = [
  { label: "О журнале", href: "#about" },
  { label: "Свежий выпуск", href: "#latest" },
  { label: "Архив", href: "#archive" },
  { label: "Редсовет", href: "#council" },
  { label: "Авторам", href: "#authors" },
];

const ARCHIVE = [
  { num: "№ 3", year: "2024", theme: "Образование и цифровая среда", articles: 12 },
  { num: "№ 2", year: "2024", theme: "Философия педагогики", articles: 10 },
  { num: "№ 1", year: "2024", theme: "Наука и общество", articles: 11 },
  { num: "№ 4", year: "2023", theme: "Этика в образовании", articles: 9 },
  { num: "№ 3", year: "2023", theme: "Методология науки", articles: 13 },
  { num: "№ 2", year: "2023", theme: "Социология знания", articles: 10 },
];

const COUNCIL = [
  { name: "Иванов Александр Петрович", role: "Главный редактор", degree: "д-р филос. наук, профессор" },
  { name: "Смирнова Елена Викторовна", role: "Зам. главного редактора", degree: "д-р пед. наук, профессор" },
  { name: "Козлов Михаил Андреевич", role: "Ответственный секретарь", degree: "канд. филос. наук, доцент" },
  { name: "Новикова Ирина Сергеевна", role: "Член редколлегии", degree: "д-р социол. наук, профессор" },
  { name: "Фёдоров Дмитрий Николаевич", role: "Член редколлегии", degree: "д-р психол. наук, профессор" },
  { name: "Белова Анна Юрьевна", role: "Член редколлегии", degree: "канд. пед. наук, доцент" },
];

const LATEST_ARTICLES = [
  {
    num: "01",
    title: "Цифровая трансформация образовательного пространства: философский анализ",
    author: "Петров В.С., Орлова Н.А.",
    pages: "С. 5–18",
  },
  {
    num: "02",
    title: "Этические основания современной науки в контексте социальных изменений",
    author: "Кириллов А.Д.",
    pages: "С. 19–31",
  },
  {
    num: "03",
    title: "Феноменология учебного опыта: от теории к практике",
    author: "Зайцева М.В., Громов П.Е.",
    pages: "С. 32–47",
  },
  {
    num: "04",
    title: "Социальный конструктивизм и проблема научного знания",
    author: "Лебедев К.И.",
    pages: "С. 48–59",
  },
];

const REQUIREMENTS = [
  { icon: "FileText", label: "Объём", text: "От 6 до 20 страниц (А4, 1,5 интервал)" },
  { icon: "Globe", label: "Языки", text: "Русский, английский" },
  { icon: "BookOpen", label: "Оформление", text: "ГОСТ Р 7.0.5–2008, список литературы в конце" },
  { icon: "Users", label: "Рецензирование", text: "Двойное слепое рецензирование" },
  { icon: "Clock", label: "Сроки", text: "Рассмотрение в течение 30 рабочих дней" },
  { icon: "CheckCircle", label: "Уникальность", text: "Не менее 75% по системе Антиплагиат" },
];

// Цветовая палитра: синий + белый
const C = {
  bg: "bg-white",
  bgMuted: "bg-[#F0F5FF]",
  bgDark: "bg-[#0D2A6B]",
  bgDeep: "bg-[#071A4A]",
  text: "text-[#0D1B3E]",
  textMuted: "text-[#4A6090]",
  textLight: "text-[#8AA0C8]",
  border: "border-[#C8D8F0]",
  accent: "#1A56DB",
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("2024");

  const years = ["2024", "2023"];
  const filtered = ARCHIVE.filter((a) => a.year === activeTab);

  return (
    <div className="min-h-screen bg-white font-golos text-[#0D1B3E]">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#C8D8F0]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="font-cormorant text-xl font-semibold tracking-wide text-[#0D2A6B]">
            СПФНО
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#4A6090] hover:text-[#0D2A6B] transition-colors tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[#0D2A6B]">
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#C8D8F0] bg-white">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm text-[#4A6090] hover:text-[#0D2A6B] border-b border-[#C8D8F0]/50"
              >
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
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-6">
              Свидетельство ПИ № ФС 77-86126
            </p>
            <h1 className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-6 text-[#0D1B3E]">
              Социально-философские аспекты науки и образования
            </h1>
            <p className="text-[#4A6090] leading-relaxed mb-3 text-sm tracking-wide">
              Social and Philosophical Dimensions of Education
            </p>
            <div className="w-12 h-px bg-[#1A56DB] my-8" />
            <p className="text-[#4A6090] leading-relaxed mb-10 max-w-md">
              Рецензируемое научное издание для преподавателей, исследователей
              и студентов в области философии, социологии и педагогики.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#latest"
                className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors"
              >
                Свежий выпуск
              </a>
              <a
                href="#authors"
                className="border border-[#1A56DB] text-[#1A56DB] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#1A56DB] hover:text-white transition-colors"
              >
                Авторам
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#C8D8F0]" />
            <img
              src={COVER_IMG}
              alt="Обложка журнала"
              className="relative w-full object-cover aspect-[3/4] shadow-sm"
            />
            <div className="absolute bottom-4 right-4 bg-white border border-[#C8D8F0] px-4 py-2">
              <p className="font-cormorant text-lg font-medium text-[#0D1B3E]">Выпуск № 4</p>
              <p className="text-xs text-[#8AA0C8]">2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#C8D8F0] bg-[#F0F5FF]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "2023", label: "Год основания" },
            { num: "4", label: "Выпуска в год" },
            { num: "120+", label: "Опубликованных статей" },
            { num: "ВАК", label: "Список рекомендованных изданий" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-cormorant text-4xl font-light text-[#0D2A6B] mb-1">{s.num}</p>
              <p className="text-xs text-[#4A6090] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">О журнале</p>
            <h2 className="font-cormorant text-4xl font-light leading-snug text-[#0D1B3E]">
              Академическое издание нового формата
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-[#4A6090] leading-relaxed">
            <p>
              Журнал «Социально-философские аспекты науки и образования» — рецензируемое
              научное периодическое издание, публикующее оригинальные статьи, обзоры
              и дискуссионные материалы по актуальным проблемам на стыке философии,
              социологии и теории образования.
            </p>
            <p>
              Журнал зарегистрирован Федеральной службой по надзору в сфере связи,
              информационных технологий и массовых коммуникаций. Свидетельство о
              регистрации <strong className="text-[#0D1B3E]">ПИ № ФС 77-86126</strong> от
              01.10.2023 г.
            </p>
            <p>
              Издание предназначено для преподавателей высшей школы, научных работников,
              аспирантов и студентов магистратуры, чьи научные интересы лежат в области
              социальной философии, философии образования и науковедения.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                { label: "ISSN (печатный)", val: "0000-0000" },
                { label: "ISSN (онлайн)", val: "0000-0001" },
                { label: "Периодичность", val: "4 раза в год" },
                { label: "Язык", val: "Русский, Английский" },
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
              <p className="text-xs tracking-[0.2em] uppercase text-[#7A9FD0] mb-4">Свежий выпуск</p>
              <h2 className="font-cormorant text-4xl font-light">Выпуск № 4 · 2024</h2>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[#7A9FD0] hover:text-white transition-colors"
            >
              Читать полный выпуск
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
          <div className="space-y-0">
            {LATEST_ARTICLES.map((article) => (
              <div
                key={article.num}
                className="flex flex-col md:flex-row gap-6 py-7 border-t border-[#1A3D7A] group cursor-pointer"
              >
                <span className="font-cormorant text-6xl font-light text-[#1A3D7A] group-hover:text-[#2A5AA0] transition-colors shrink-0 leading-none">
                  {article.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-cormorant text-xl font-light mb-2 group-hover:text-[#A8C8F0] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-xs text-[#7A9FD0]">
                    <span>{article.author}</span>
                    <span>{article.pages}</span>
                  </div>
                </div>
                <Icon
                  name="ArrowUpRight"
                  size={18}
                  className="text-[#2A5AA0] group-hover:text-white transition-colors shrink-0 mt-1"
                />
              </div>
            ))}
          </div>
          <div className="border-t border-[#1A3D7A] pt-8 mt-2">
            <button className="border border-[#2A5AA0] text-white px-8 py-3 text-sm tracking-widest uppercase hover:border-white transition-colors">
              Скачать PDF выпуска
            </button>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">Архив</p>
          <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E]">Все номера журнала</h2>
        </div>
        <div className="flex gap-1 mb-8 border-b border-[#C8D8F0]">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActiveTab(y)}
              className={`px-5 py-2 text-sm tracking-wide transition-colors -mb-px border-b-2 ${
                activeTab === y
                  ? "border-[#1A56DB] text-[#1A56DB] font-medium"
                  : "border-transparent text-[#4A6090] hover:text-[#0D1B3E]"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.num + item.year}
              className="border border-[#C8D8F0] p-6 hover:border-[#1A56DB] transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-cormorant text-3xl font-light text-[#0D1B3E]">{item.num}</span>
                <span className="text-xs text-[#4A6090] bg-[#F0F5FF] px-2 py-1">{item.year}</span>
              </div>
              <p className="text-sm text-[#0D1B3E] mb-3 leading-snug">{item.theme}</p>
              <p className="text-xs text-[#8AA0C8]">{item.articles} статей</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#8AA0C8] group-hover:text-[#1A56DB] transition-colors">
                Открыть <Icon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNCIL */}
      <section id="council" className="bg-[#F0F5FF] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">Редакция</p>
            <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E]">Редакционный совет</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {COUNCIL.map((member) => (
              <div key={member.name} className="border-t border-l border-[#C8D8F0] p-6 last:border-r">
                <p className="font-cormorant text-lg font-medium mb-1 leading-snug text-[#0D1B3E]">{member.name}</p>
                <p className="text-xs text-[#1A56DB] uppercase tracking-wide mb-2">{member.role}</p>
                <p className="text-xs text-[#4A6090]">{member.degree}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <section id="authors" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">Для авторов</p>
            <h2 className="font-cormorant text-4xl font-light leading-snug text-[#0D1B3E] mb-6">
              Требования к публикациям
            </h2>
            <p className="text-[#4A6090] leading-relaxed mb-8">
              Журнал принимает рукописи на русском и английском языках.
              Все материалы проходят двойное слепое рецензирование. Публикация бесплатна.
            </p>
            <button className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors">
              Подать статью
            </button>
          </div>
          <div className="grid grid-cols-1 gap-0">
            {REQUIREMENTS.map((req) => (
              <div key={req.label} className="flex gap-4 py-5 border-b border-[#C8D8F0] first:border-t">
                <div className="w-8 shrink-0 pt-0.5">
                  <Icon name={req.icon} size={16} className="text-[#1A56DB]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8AA0C8] mb-1">{req.label}</p>
                  <p className="text-sm text-[#0D1B3E]">{req.text}</p>
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
            <h2 className="font-cormorant text-4xl font-light mb-4">Связаться с редакцией</h2>
            <p className="text-[#7A9FD0] leading-relaxed">
              По вопросам публикации, подписки и сотрудничества пишите нам на электронную почту
              или звоните в рабочие часы.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: "Mail", label: "E-mail", val: "editor@spfno-journal.ru" },
              { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: "Адрес", val: "Москва, ул. Примерная, д. 1" },
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
          <p className="font-cormorant text-base text-[#0D2A6B] font-semibold">
            Социально-философские аспекты науки и образования
          </p>
          <p>© 2024 СПФНО</p>
          <p>ПИ № ФС 77-86126</p>
        </div>
      </footer>
    </div>
  );
}
