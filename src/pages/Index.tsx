import { useState } from "react";
import Icon from "@/components/ui/icon";

const COVER_IMG = "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/files/82e01712-b71f-473e-ad8f-9b49e0aff4e3.jpg";
const BANNER_IMG = "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/bucket/94365341-dd70-401e-a550-78b60c13c0f2.jpg";

type Page = "home" | "about" | "latest" | "archive" | "council" | "authors";
type Lang = "ru" | "en";

const NAV = {
  ru: [
    { id: "home" as Page, label: "Главная" },
    { id: "about" as Page, label: "О журнале" },
    { id: "latest" as Page, label: "Свежий выпуск" },
    { id: "archive" as Page, label: "Архив" },
    { id: "council" as Page, label: "Редакционный совет" },
    { id: "authors" as Page, label: "Авторам" },
  ],
  en: [
    { id: "home" as Page, label: "Home" },
    { id: "about" as Page, label: "About" },
    { id: "latest" as Page, label: "Latest Issue" },
    { id: "archive" as Page, label: "Archive" },
    { id: "council" as Page, label: "Editorial Board" },
    { id: "authors" as Page, label: "For Authors" },
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

const EDITOR_IN_CHIEF = {
  name: "Э. И. Забнева",
  photo: "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/bucket/43e6c14e-03a8-4600-9fc7-fb1ae93e3b5c.png",
  role: { ru: "Главный редактор", en: "Editor-in-Chief" },
  degree: {
    ru: "Доктор философских наук, кандидат социологических наук, доцент, ректор Института развития образования Кузбасса",
    en: "Doctor of Philosophy, PhD in Sociology, Associate Professor, Rector of the Institute for Educational Development of Kuzbass",
  },
};

const DEPUTY_EDITOR = {
  name: "Л. Ю. Логунова",
  photo: "https://cdn.poehali.dev/projects/8c94ba51-4051-48ba-bbe6-8f202ec8cdb4/bucket/e20f21cf-2225-4642-9cfd-66edcf638371.png",
  role: { ru: "Заместитель главного редактора", en: "Deputy Editor-in-Chief" },
  degree: {
    ru: "Доктор философских наук, кандидат социологических наук, доцент, профессор отдела подготовки научно-педагогических кадров и кадров высшей квалификации Института развития образования Кузбасса, г. Кемерово",
    en: "Doctor of Philosophy, PhD in Sociology, Associate Professor, Professor of the Department for Training of Scientific and Pedagogical Personnel of the Institute for Educational Development of Kuzbass, Kemerovo",
  },
};

const COUNCIL = [
  { name: "Н. П. Абаскалова", degree: { ru: "Доктор педагогических наук, профессор, профессор Новосибирского государственного педагогического университета, заслуженный работник высшей школы РФ, г. Новосибирск", en: "Doctor of Pedagogy, Professor, Professor at Novosibirsk State Pedagogical University, Honored Worker of Higher Education of the Russian Federation, Novosibirsk" } },
  { name: "Ю. В. Ануфриева", degree: { ru: "Доктор педагогических наук, доцент, профессор кафедры экономического транспорта Сибирского государственного университета путей сообщения, г. Новосибирск", en: "Doctor of Pedagogy, Associate Professor, Professor at Siberian Transport University, Novosibirsk" } },
  { name: "О. А. Донских", degree: { ru: "Доктор философских наук, профессор, заведующий кафедрой философии и гуманитарных наук, заведующий Междисциплинарной лаборатории социально-гуманитарных проблем транзитивного общества Новосибирского государственного университета экономики и управления, г. Новосибирск", en: "Doctor of Philosophy, Professor, Head of the Department of Philosophy and Humanities, NSUEM, Novosibirsk" } },
  { name: "О. И. Жукова", degree: { ru: "Доктор философских наук, профессор, заведующий кафедрой философии и общественных наук Кемеровского государственного университета, г. Кемерово", en: "Doctor of Philosophy, Professor, Head of the Department of Philosophy and Social Sciences, Kemerovo State University, Kemerovo" } },
  { name: "Н. А. Заруба", degree: { ru: "Доктор социологических наук, кандидат педагогических наук, профессор, заведующий кафедрой государственного и муниципального управления Кузбасского государственного технического университета им. Т. Ф. Горбачева, г. Кемерово", en: "Doctor of Sociology, PhD in Pedagogy, Professor, Head of the Department of Public Administration, Kuzbass State Technical University, Kemerovo" } },
  { name: "С. А. Ильиных", degree: { ru: "Доктор социологических наук, профессор, заведующий кафедрой социологии Новосибирского государственного университета экономики и управления, г. Новосибирск", en: "Doctor of Sociology, Professor, Head of the Department of Sociology, NSUEM, Novosibirsk" } },
  { name: "Э. М. Казин", degree: { ru: "Доктор биологических наук, профессор, ведущий научный сотрудник Кемеровского государственного университета, г. Кемерово", en: "Doctor of Biology, Professor, Leading Researcher at Kemerovo State University, Kemerovo" } },
  { name: "Н. А. Матвеева", degree: { ru: "Доктор социологических наук, профессор, проректор по научной работе Алтайской государственной педагогической академии, г. Барнаул", en: "Doctor of Sociology, Professor, Vice-Rector for Research, Altai State Pedagogical Academy, Barnaul" } },
  { name: "Е. В. Матвеева", degree: { ru: "Доктор политических наук, доцент, заведующий научно-исследовательской лаборатории «Политические коммуникации, медиатехнологии и связи с общественностью» Кузбасского государственного университета им. В. Н. Полецкова, заслуженный деятель науки и образования РАЕ, г. Кемерово", en: "Doctor of Political Science, Associate Professor, Head of the Research Laboratory 'Political Communications, Media Technologies and PR', Kuzbass State University, Kemerovo" } },
  { name: "О. В. Петунин", degree: { ru: "Доктор педагогических наук, профессор, профессор кафедры педагогики и психологии Института образования Кемеровского государственного университета, отличник народного просвещения, г. Кемерово", en: "Doctor of Pedagogy, Professor, Professor at the Institute of Education, Kemerovo State University, Kemerovo" } },
  { name: "Е. А. Попов", degree: { ru: "Доктор философских наук, доцент, профессор кафедры социологии и конфликтологии Института гуманитарных наук Алтайского государственного университета, г. Барнаул", en: "Doctor of Philosophy, Associate Professor, Professor at Altai State University, Barnaul" } },
  { name: "Г. С. Солодова", degree: { ru: "Доктор социологических наук, профессор кафедры социологии, психологии Сибирского государственного университета телекоммуникаций и информатики (СибГУТИ), ведущий научный сотрудник Института философии и права СО РАН, г. Новосибирск", en: "Doctor of Sociology, Professor at SibGUTI, Leading Researcher at the Institute of Philosophy and Law SB RAS, Novosibirsk" } },
  { name: "Самбалхундев Хаш-Эрденэ", degree: { ru: "Доктор философских наук, профессор, академик Академии геополитических проблем и Международной академии Чингисхана, Монголия, г. Улан-Батор", en: "Doctor of Philosophy, Professor, Academician of the Academy of Geopolitical Problems and the International Chinggis Khaan Academy, Mongolia, Ulaanbaatar" } },
  { name: "Т. М. Чурекова", degree: { ru: "Доктор педагогических наук, профессор, профессор кафедры педагогики, психологии и физической культуры Кемеровского государственного института культуры, заслуженный работник высшей школы РФ, почетный профессор Кузбасса, действительный член (академик) МАН ВШ, г. Кемерово", en: "Doctor of Pedagogy, Professor, Kemerovo State Institute of Culture, Honored Worker of Higher Education of the Russian Federation, Honorary Professor of Kuzbass, Kemerovo" } },
];

const LATEST_ARTICLES = [
  { num: "01", title: { ru: "Цифровая трансформация образовательного пространства: философский анализ", en: "Digital Transformation of Educational Space: A Philosophical Analysis" }, author: "Петров В.С., Орлова Н.А.", pages: "С. 5–18" },
  { num: "02", title: { ru: "Этические основания современной науки в контексте социальных изменений", en: "Ethical Foundations of Modern Science in the Context of Social Change" }, author: "Кириллов А.Д.", pages: "С. 19–31" },
  { num: "03", title: { ru: "Феноменология учебного опыта: от теории к практике", en: "Phenomenology of Learning Experience: From Theory to Practice" }, author: "Зайцева М.В., Громов П.Е.", pages: "С. 32–47" },
  { num: "04", title: { ru: "Социальный конструктивизм и проблема научного знания", en: "Social Constructivism and the Problem of Scientific Knowledge" }, author: "Лебедев К.И.", pages: "С. 48–59" },
];

const REQUIREMENTS = [
  { icon: "FileText", label: { ru: "Объём", en: "Length" }, text: { ru: "От 6 до 20 страниц (А4, 1,5 интервал)", en: "6 to 20 pages (A4, 1.5 line spacing)" } },
  { icon: "Globe", label: { ru: "Языки", en: "Languages" }, text: { ru: "Русский, английский", en: "Russian, English" } },
  { icon: "BookOpen", label: { ru: "Оформление", en: "Formatting" }, text: { ru: "ГОСТ Р 7.0.5–2008, список литературы в конце", en: "GOST R 7.0.5–2008, references at the end" } },
  { icon: "Users", label: { ru: "Рецензирование", en: "Peer Review" }, text: { ru: "Двойное слепое рецензирование", en: "Double-blind peer review" } },
  { icon: "Clock", label: { ru: "Сроки", en: "Timeline" }, text: { ru: "Рассмотрение в течение 30 рабочих дней", en: "Review within 30 working days" } },
  { icon: "CheckCircle", label: { ru: "Уникальность", en: "Originality" }, text: { ru: "Не менее 75% по системе Антиплагиат", en: "At least 75% originality (Antiplagiat)" } },
];

// ─── Страницы ────────────────────────────────────────────────

function PageHome({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-6">
              {lang === "ru" ? "Свидетельство ПИ № ФС 77-86126" : "Registration Certificate PI № FS 77-86126"}
            </p>
            <h1 className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-6 text-[#0D1B3E]">
              {lang === "ru" ? "Социально-философские аспекты науки и образования" : "Social and Philosophical Dimensions of Science and Education"}
            </h1>
            <p className="text-[#4A6090] text-sm tracking-wide mb-3">
              {lang === "ru" ? "Social and Philosophical Dimensions of Education" : "Социально-философские аспекты науки и образования"}
            </p>
            <div className="w-12 h-px bg-[#1A56DB] my-8" />
            <p className="text-[#4A6090] leading-relaxed mb-10 max-w-md">
              {lang === "ru"
                ? "Рецензируемое научное издание для преподавателей, исследователей и студентов в области философии, социологии и педагогики."
                : "A peer-reviewed academic journal for educators, researchers and students in the fields of philosophy, sociology and pedagogy."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("latest")} className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors">
                {lang === "ru" ? "Свежий выпуск" : "Latest Issue"}
              </button>
              <button onClick={() => setPage("authors")} className="border border-[#1A56DB] text-[#1A56DB] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#1A56DB] hover:text-white transition-colors">
                {lang === "ru" ? "Авторам" : "For Authors"}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#C8D8F0]" />
            <img src={COVER_IMG} alt="Обложка журнала" className="relative w-full object-cover aspect-[3/4] shadow-sm" />
            <div className="absolute bottom-4 right-4 bg-white border border-[#C8D8F0] px-4 py-2">
              <p className="font-cormorant text-lg font-medium text-[#0D1B3E]">{lang === "ru" ? "Выпуск № 4" : "Issue № 4"}</p>
              <p className="text-xs text-[#8AA0C8]">2024</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#C8D8F0] bg-[#F0F5FF]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "2023", ru: "Год основания", en: "Founded" },
            { num: "4", ru: "Выпуска в год", en: "Issues per year" },
            { num: "120+", ru: "Опубликованных статей", en: "Articles published" },
            { num: "ВАК", ru: "Список рекомендованных изданий", en: "Recommended journal list" },
          ].map((s) => (
            <div key={s.num}>
              <p className="font-cormorant text-4xl font-light text-[#0D2A6B] mb-1">{s.num}</p>
              <p className="text-xs text-[#4A6090] uppercase tracking-widest">{lang === "ru" ? s.ru : s.en}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PageAbout({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  const advantages = [
    {
      icon: "GraduationCap",
      ru_title: "Высокая квалификация",
      en_title: "High Qualification",
      ru_text: "Все члены редколлегии имеют учёные степени докторов наук, что гарантирует высокий уровень экспертизы.",
      en_text: "All editorial board members hold doctoral degrees, ensuring a high level of expertise.",
    },
    {
      icon: "Star",
      ru_title: "Индивидуальный подход",
      en_title: "Individual Approach",
      ru_text: "Мы стремимся к тому, чтобы каждая статья была рассмотрена с учётом её уникальности и особенностей.",
      en_text: "We ensure that each article is reviewed taking into account its uniqueness and specifics.",
    },
    {
      icon: "Zap",
      ru_title: "Оперативность рецензирования",
      en_title: "Efficient Review",
      ru_text: "Благодаря опыту и профессионализму наших экспертов, процесс рецензирования статей проходит быстро и эффективно.",
      en_text: "Thanks to the experience of our experts, the peer review process is fast and effective.",
    },
  ];

  return (
    <div>
      {/* Миссия */}
      <section className="bg-[#0D2A6B] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#7A9FD0] mb-4">{lang === "ru" ? "Миссия журнала" : "Journal Mission"}</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light leading-snug mb-6">
              {lang === "ru" ? "Развитие научного диалога" : "Advancing Scientific Dialogue"}
            </h2>
            <p className="text-[#A8C8F0] leading-relaxed">
              {lang === "ru"
                ? "Журнал ориентирован на развитие различных аспектов социокультурных проблем образования через профессиональное взаимодействие представителей научно-педагогической общественности, исследующих данную проблему в смежных сферах знаний."
                : "The journal is focused on developing various aspects of socio-cultural problems in education through professional interaction among scholars investigating this issue across related fields of knowledge."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0">
            {[
              { ru: "ISSN (печатный)", en: "ISSN (print)", val: "2949-4605" },
              { ru: "ISSN (онлайн)", en: "ISSN (online)", val: "0000-0001" },
              { ru: "Периодичность", en: "Frequency", val: lang === "ru" ? "4 раза в год" : "4 issues/year" },
              { ru: "Язык", en: "Language", val: lang === "ru" ? "Русский, Английский" : "Russian, English" },
              { ru: "Индексация", en: "Indexing", val: "ВАК РФ, РИНЦ" },
            ].map((i) => (
              <div key={i.val} className="border-t border-[#1A3D7A] py-4 flex justify-between items-center">
                <p className="text-xs text-[#7A9FD0] uppercase tracking-wide">{lang === "ru" ? i.ru : i.en}</p>
                <p className="font-medium text-white text-sm">{i.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О журнале */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "О журнале" : "About the Journal"}</p>
            <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E] leading-snug">
              {lang === "ru" ? "Академическое издание нового формата" : "An Academic Publication of a New Format"}
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-[#4A6090] leading-relaxed">
            <p>
              {lang === "ru"
                ? "Наш журнал посвящён актуальным вопросам социально-гуманитарных наук. Мы стремимся объединить исследователей, преподавателей и студентов, интересующихся философией, социологией и другими областями знаний. В журнале публикуются статьи по широкому кругу тем, включая образование, культуру, общество и науку."
                : "Our journal is dedicated to current issues in social sciences and humanities. We aim to bring together researchers, educators and students interested in philosophy, sociology and related fields. Articles cover a wide range of topics including education, culture, society and science."}
            </p>
            <p>
              {lang === "ru"
                ? "Журнал зарегистрирован Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций. Свидетельство о регистрации "
                : "The journal is registered with the Federal Service for Supervision of Communications, Information Technology and Mass Media. Registration Certificate "}
              <strong className="text-[#0D1B3E]">ПИ № ФС 77-86126</strong> {lang === "ru" ? "от 01.10.2023 г." : "dated 01.10.2023."}
            </p>
            <p>
              {lang === "ru"
                ? "Издание предназначено для преподавателей высшей школы, научных работников, аспирантов и студентов магистратуры, чьи научные интересы лежат в области социальной философии, философии образования и науковедения."
                : "The journal is aimed at university professors, researchers, postgraduate and master's students whose academic interests lie in social philosophy, philosophy of education, and science studies."}
            </p>
            <button
              onClick={() => setPage("latest")}
              className="inline-flex items-center gap-2 text-sm text-[#1A56DB] hover:text-[#0D2A6B] font-medium transition-colors mt-2"
            >
              {lang === "ru" ? "Смотреть свежий выпуск" : "View latest issue"}
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-[#F0F5FF] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "Почему мы" : "Why us"}</p>
            <h2 className="font-cormorant text-4xl font-light text-[#0D1B3E]">
              {lang === "ru" ? "Преимущества работы с нашим редакционным советом" : "Advantages of Working with Our Editorial Board"}
            </h2>
            <p className="text-[#4A6090] text-sm mt-3">
              {lang === "ru"
                ? "Опыт и профессионализм редколлегии — залог высокого качества научных публикаций."
                : "The experience and professionalism of the editorial board are the key to high-quality scholarly publications."}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.icon} className="bg-white border border-[#C8D8F0] p-8">
                <div className="w-10 h-10 bg-[#1A56DB]/10 flex items-center justify-center mb-5">
                  <Icon name={a.icon} size={20} className="text-[#1A56DB]" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-[#0D1B3E] mb-3">
                  {lang === "ru" ? a.ru_title : a.en_title}
                </h3>
                <p className="text-sm text-[#4A6090] leading-relaxed">
                  {lang === "ru" ? a.ru_text : a.en_text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Быстрые ссылки */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-[#C8D8F0] p-8 group cursor-pointer hover:border-[#1A56DB] transition-colors" onClick={() => setPage("authors")}>
            <Icon name="PenLine" size={24} className="text-[#1A56DB] mb-4" />
            <h3 className="font-cormorant text-2xl font-semibold text-[#0D1B3E] mb-3">{lang === "ru" ? "Авторам" : "For Authors"}</h3>
            <p className="text-sm text-[#4A6090] leading-relaxed mb-4">
              {lang === "ru"
                ? "Вся необходимая информация для авторов: требования к содержанию и оформлению рукописей, последовательность их подготовки к публикации и другие важные аспекты."
                : "All necessary information for authors: requirements for content and formatting of manuscripts, the sequence of their preparation for publication and other important aspects."}
            </p>
            <span className="text-xs text-[#1A56DB] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
              {lang === "ru" ? "Подробнее" : "Learn more"} <Icon name="ArrowRight" size={12} />
            </span>
          </div>
          <div className="border border-[#C8D8F0] p-8 group cursor-pointer hover:border-[#1A56DB] transition-colors" onClick={() => setPage("archive")}>
            <Icon name="Archive" size={24} className="text-[#1A56DB] mb-4" />
            <h3 className="font-cormorant text-2xl font-semibold text-[#0D1B3E] mb-3">{lang === "ru" ? "Архив" : "Archive"}</h3>
            <p className="text-sm text-[#4A6090] leading-relaxed mb-4">
              {lang === "ru"
                ? "Здесь вы можете найти все выпуски нашего журнала в формате PDF. Выберите интересующий вас выпуск и скачайте его."
                : "Here you can find all issues of our journal in PDF format. Select the issue you are interested in and download it."}
            </p>
            <span className="text-xs text-[#1A56DB] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
              {lang === "ru" ? "Перейти в архив" : "Go to archive"} <Icon name="ArrowRight" size={12} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageLatest({ lang }: { lang: Lang }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "Свежий выпуск" : "Latest Issue"}</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#0D1B3E]">
          {lang === "ru" ? "Выпуск № 4 · 2024" : "Issue № 4 · 2024"}
        </h2>
        <button className="flex items-center gap-2 text-sm text-[#1A56DB] hover:text-[#0D2A6B] transition-colors">
          {lang === "ru" ? "Скачать PDF выпуска" : "Download PDF"}
          <Icon name="Download" size={16} />
        </button>
      </div>
      <div className="space-y-0">
        {LATEST_ARTICLES.map((article) => (
          <div key={article.num} className="flex flex-col md:flex-row gap-6 py-7 border-t border-[#C8D8F0] group cursor-pointer">
            <span className="font-cormorant text-6xl font-light text-[#C8D8F0] group-hover:text-[#1A56DB] transition-colors shrink-0 leading-none">
              {article.num}
            </span>
            <div className="flex-1">
              <h3 className="font-cormorant text-xl font-light mb-2 group-hover:text-[#1A56DB] transition-colors leading-snug text-[#0D1B3E]">
                {article.title[lang]}
              </h3>
              <div className="flex flex-wrap gap-6 text-xs text-[#8AA0C8]">
                <span>{article.author}</span>
                <span>{article.pages}</span>
              </div>
            </div>
            <Icon name="ArrowUpRight" size={18} className="text-[#C8D8F0] group-hover:text-[#1A56DB] transition-colors shrink-0 mt-1" />
          </div>
        ))}
        <div className="border-t border-[#C8D8F0]" />
      </div>
    </div>
  );
}

function PageArchive({ lang }: { lang: Lang }) {
  const [activeYear, setActiveYear] = useState("2024");
  const years = ["2024", "2023"];
  const filtered = ARCHIVE.filter((a) => a.year === activeYear);
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "Архив" : "Archive"}</p>
      <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#0D1B3E] mb-10">
        {lang === "ru" ? "Все номера журнала" : "All Issues"}
      </h2>
      <div className="flex gap-1 mb-8 border-b border-[#C8D8F0]">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className={`px-5 py-2 text-sm tracking-wide transition-colors -mb-px border-b-2 ${activeYear === y ? "border-[#1A56DB] text-[#1A56DB] font-medium" : "border-transparent text-[#4A6090] hover:text-[#0D1B3E]"}`}
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
            <p className="text-xs text-[#8AA0C8]">{item.articles} {lang === "ru" ? "статей" : "articles"}</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-[#8AA0C8] group-hover:text-[#1A56DB] transition-colors">
              {lang === "ru" ? "Открыть" : "Open"} <Icon name="ChevronRight" size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageCouncil({ lang }: { lang: Lang }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "Редакция" : "Editorial"}</p>
      <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#0D1B3E] mb-10">
        {lang === "ru" ? "Редакционный совет" : "Editorial Board"}
      </h2>

      {/* Главный редактор */}
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-6 bg-[#F0F5FF] border border-[#C8D8F0] p-8">
        <img src={EDITOR_IN_CHIEF.photo} alt={EDITOR_IN_CHIEF.name} className="w-32 h-32 object-cover object-top shrink-0" />
        <div>
          <p className="text-xs text-[#1A56DB] uppercase tracking-widest mb-2">{EDITOR_IN_CHIEF.role[lang]}</p>
          <p className="font-cormorant text-2xl font-medium text-[#0D1B3E] mb-2">{EDITOR_IN_CHIEF.name}</p>
          <p className="text-sm text-[#4A6090] leading-relaxed">{EDITOR_IN_CHIEF.degree[lang]}</p>
        </div>
      </div>

      {/* Заместитель */}
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-10 bg-[#F0F5FF] border border-[#C8D8F0] p-8">
        <img src={DEPUTY_EDITOR.photo} alt={DEPUTY_EDITOR.name} className="w-32 h-32 object-cover object-top shrink-0" />
        <div>
          <p className="text-xs text-[#1A56DB] uppercase tracking-widest mb-2">{DEPUTY_EDITOR.role[lang]}</p>
          <p className="font-cormorant text-2xl font-medium text-[#0D1B3E] mb-2">{DEPUTY_EDITOR.name}</p>
          <p className="text-sm text-[#4A6090] leading-relaxed">{DEPUTY_EDITOR.degree[lang]}</p>
        </div>
      </div>

      {/* Члены совета */}
      <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-6">{lang === "ru" ? "Члены редакционного совета" : "Editorial Board Members"}</p>
      <div className="grid md:grid-cols-2 gap-0">
        {COUNCIL.map((member) => (
          <div key={member.name} className="border-t border-l border-[#C8D8F0] p-6 even:border-r">
            <p className="font-cormorant text-lg font-semibold mb-1 leading-snug text-[#0D1B3E]">{member.name}</p>
            <p className="text-xs text-[#4A6090] leading-relaxed">{member.degree[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageAuthors({ lang }: { lang: Lang }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-4">{lang === "ru" ? "Для авторов" : "For Authors"}</p>
      <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#0D1B3E] mb-12">
        {lang === "ru" ? "Требования к публикациям" : "Submission Guidelines"}
      </h2>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-[#4A6090] leading-relaxed mb-8">
            {lang === "ru"
              ? "Журнал принимает рукописи на русском и английском языках. Все материалы проходят двойное слепое рецензирование. Публикация бесплатна."
              : "The journal accepts manuscripts in Russian and English. All submissions undergo double-blind peer review. Publication is free of charge."}
          </p>
          <button className="bg-[#1A56DB] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#0D2A6B] transition-colors mb-12">
            {lang === "ru" ? "Подать статью" : "Submit Article"}
          </button>

          <div className="border-t border-[#C8D8F0] pt-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8AA0C8] mb-6">{lang === "ru" ? "Контакты редакции" : "Editorial Contacts"}</p>
            {[
              { icon: "Mail", label: "E-mail", val: "editor@spfno-journal.ru" },
              { icon: "Phone", label: lang === "ru" ? "Телефон" : "Phone", val: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: lang === "ru" ? "Адрес" : "Address", val: "Москва, ул. Примерная, д. 1" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 mb-4">
                <Icon name={c.icon} size={16} className="text-[#1A56DB] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#8AA0C8] uppercase tracking-wide mb-0.5">{c.label}</p>
                  <p className="text-sm text-[#0D1B3E]">{c.val}</p>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = NAV[lang];

  const handleNav = (id: Page) => {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-golos text-[#0D1B3E]">

      {/* BANNER */}
      <button onClick={() => handleNav("home")} className="block w-full cursor-pointer hover:opacity-95 transition-opacity">
        <img src={BANNER_IMG} alt="Социально-философские аспекты науки и образования" className="w-full object-cover" />
      </button>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#C8D8F0]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <button onClick={() => handleNav("home")} className="font-cormorant text-lg font-semibold tracking-wide text-[#0D2A6B]">
            СПФНО
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 text-sm rounded transition-colors ${
                  page === item.id
                    ? "bg-[#1A56DB] text-white"
                    : "text-[#4A6090] hover:text-[#0D2A6B] hover:bg-[#F0F5FF]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#C8D8F0] rounded overflow-hidden text-xs font-medium">
              <button onClick={() => setLang("ru")} className={`px-3 py-1.5 transition-colors ${lang === "ru" ? "bg-[#1A56DB] text-white" : "text-[#4A6090] hover:bg-[#F0F5FF]"}`}>РУ</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#1A56DB] text-white" : "text-[#4A6090] hover:bg-[#F0F5FF]"}`}>EN</button>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-[#0D2A6B]">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-[#C8D8F0] bg-white py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-6 py-3 text-sm border-b border-[#C8D8F0]/50 transition-colors ${
                  page === item.id ? "text-[#1A56DB] font-medium bg-[#F0F5FF]" : "text-[#4A6090]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* КОНТЕНТ */}
      <main>
        {page === "home" && <PageHome lang={lang} setPage={setPage} />}
        {page === "about" && <PageAbout lang={lang} setPage={setPage} />}
        {page === "latest" && <PageLatest lang={lang} />}
        {page === "archive" && <PageArchive lang={lang} />}
        {page === "council" && <PageCouncil lang={lang} />}
        {page === "authors" && <PageAuthors lang={lang} />}
      </main>

      {/* FOOTER */}
      <footer className="mt-16">
        {/* Контакты */}
        <div className="bg-[#EBEBEB] py-14 text-center">
          <p className="font-semibold text-[#0D1B3E] text-base mb-6">
            {lang === "ru" ? "По всем вопросам свяжитесь с нами любым удобным способом:" : "Contact us in any convenient way:"}
          </p>
          <div className="space-y-1.5 text-sm text-[#0D1B3E] mb-8">
            <p>Тел.: (384-2) 31-15-86</p>
            <p>Факс: (384-2) 31-16-06</p>
            <p>
              E-mail:{" "}
              <a href="mailto:ipk@kuz-edu.ru" className="text-[#1A56DB] hover:underline">
                ipk@kuz-edu.ru
              </a>
            </p>
            <p>{lang === "ru" ? "Электронная версия в интернете:" : "Online version:"}</p>
            <p>
              <a href="http://ipk@kuz-edu.ru" className="text-[#1A56DB] hover:underline">
                http:// ipk@kuz-edu.ru
              </a>
            </p>
          </div>
          <p className="text-sm text-[#0D1B3E]">
            {lang === "ru"
              ? "Адрес: 650070, Российская Федерация, Кемеровская область – Кузбасс, г. Кемерово, ул. Заузелкова, д. 3"
              : "Address: 650070, Russian Federation, Kemerovo Region – Kuzbass, Kemerovo, Zaouzelkova St., 3"}
          </p>
        </div>

        {/* Копирайт */}
        <div className="bg-[#333333] py-5 text-center">
          <p className="text-xs text-[#AAAAAA] mb-1">© {lang === "ru" ? "Все права защищены." : "All Right Reserved."} СПФНО, 2024</p>
          <p className="text-xs text-[#AAAAAA]">
            E-mail:{" "}
            <a href="mailto:ipk@kuz-edu.ru" className="hover:text-white transition-colors">
              ipk@kuz-edu.ru
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}