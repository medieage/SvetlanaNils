'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Atmosphere from './components/Atmosphere';

const VK = 'https://vk.ru/svetikanilsla';
function Contact({ children = 'Обсудить вашу историю', className = '' }: {children?: React.ReactNode; className?: string}) {
  return <a className={`button ${className}`} href={VK} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}
function Feather({className = ''}: {className?: string}) {
  return <svg className={className} viewBox="0 0 100 150" fill="none" aria-hidden="true"><path d="M16 139C32 80 42 48 83 9C92 49 80 103 34 112M24 118L76 26M37 95L35 64M48 75L48 44M59 56L62 29M36 99L63 91M47 79L77 67M60 57L84 43" stroke="currentColor" strokeWidth="1.4"/><path d="M29 121C12 115 12 94 22 79C20 98 27 103 34 105" stroke="currentColor"/></svg>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [ghost, setGhost] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menu]);
  return <>
    <Atmosphere />
    <header className="site-header"><a href="#" className="brand" aria-label="Светлана Нильс — на главную"><Feather/><span>Светлана Нильс<small>ПЕРО ФЕНИКСА</small></span></a>
      <Contact className="header-consultation">Консультация · 2 500 ₽</Contact>
      <button id="menu-toggle" className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu ? 'Закрыть ✕' : 'Меню ☰'}</button>
      <nav aria-label="Основная навигация" id="navigation" className={menu ? 'open' : ''} onClick={() => setMenu(false)}>
        <a href="#about">Обо мне</a><a href="#mentorship">Наставничество</a><a href="#books">Книги на заказ</a><span className="soon">Мои книги <small>Скоро</small></span><span className="soon">Курсы <small>Скоро</small></span><a href="#contacts">Контакты</a><Contact className="mobile-consultation">Консультация · 2 500 ₽</Contact>
      </nav>
    </header>
    <main>
      <section className="hero">
        <div className="hero-dust" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
        <div className="hero-content"><div className="eyebrow"><span/> ПИСАТЕЛЬ · АВТОР · НАСТАВНИК</div><h1>У каждой истории<br/>есть <em>крылья.</em></h1><p className="hero-sub">Я помогу вашей — раскрыться.</p><p className="intro">Превращаю идеи в книги, а желание писать —<br className="desktop"/> в первые главы. С вниманием к вам и магией слова.</p><div className="hero-actions"><Contact/><Contact className="outline consultation-button">Консультация · 2 500 ₽</Contact></div><div className="hero-note">Всё начинается с одного сообщения во ВКонтакте</div></div>
        <div className="hero-portrait"><Image src="/images/pero-feniksa.jpg" alt="Перо Феникса: автор с пером в атмосферной библиотеке и герой её истории" width={1254} height={1254} sizes="(max-width: 760px) 90vw, 48vw" preload /><span className="portrait-caption">ТВОЯ ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</span></div>
        <a href="#about" className="scroll-hint">ЛИСТАЙТЕ, ИСТОРИЯ НАЧИНАЕТСЯ <span>↓</span></a><span className="hero-index">01 / НАЧАЛО</span>
      </section>
      <div className="ribbon"><span>Ваш замысел</span><b>✦</b><span>Моё перо</span><b>✦</b><span>Живая история</span><b>✦</b><span>Новая глава</span></div>
      <section id="about" className="about section"><div className="section-label">01 — ЗНАКОМСТВО</div><div className="about-grid"><h2>Давайте знакомиться.<br/>Я — <em>Светлана Нильс.</em></h2><div><p className="lead">Мне близки истории, в которых есть душа. И люди, которым есть что рассказать.</p><p>Пишу художественные и бизнес-книги на заказ, помогаю авторам работать над своими текстами. Вы можете прийти с готовым сюжетом, небольшой искрой идеи или желанием начать.</p><p>«Перо Феникса» — пространство, где замысел обретает голос, а чистая страница становится началом чего-то большего.</p><a className="text-link" href="https://vk.ru/club236548094" target="_blank" rel="noopener noreferrer">Заглянуть в мой мир во ВКонтакте <span>↗</span></a></div></div></section>
      <section id="consultation" className="consultation section" aria-labelledby="consultation-title"><div className="consultation-mark" aria-hidden="true"><Feather/></div><div className="consultation-copy"><div className="section-label">ЛИЧНЫЙ РАЗГОВОР О ВАШЕЙ ИСТОРИИ</div><h2 id="consultation-title">Начнём с консультации?</h2><p>Если хочется обсудить свой замысел, текст или вопрос о писательстве. Напишите мне во ВКонтакте — согласуем тему и формат встречи.</p></div><div className="consultation-action"><div className="consultation-price">2 500 <span>₽</span></div><Contact>Записаться на консультацию</Contact></div></section>
      <section id="mentorship" className="mentorship section"><div className="mentor-copy"><div className="section-label">02 — НАСТАВНИЧЕСТВО</div><h2>Ваша книга.<br/>Ваш голос.<br/><em>Поддержка рядом.</em></h2><p>Когда хочется писать, но трудно сделать следующий шаг. Вместе разберём ваш замысел, найдём опору для текста и направление для работы.</p><p className="muted">Формат, задачи и детали наставничества обсудим лично перед началом.</p></div><div className="mentor-card"><span className="eyebrow">ОТ ИДЕИ К СВОЕМУ ТЕКСТУ</span><h3>Наставничество<br/>для авторов</h3><div className="mentor-price">35 000 <span>₽</span></div><div className="fine-line"/><p>Не оставаться один на один<br/>с чистым листом.</p><Contact>Обсудить наставничество</Contact><Feather className="card-feather"/></div></section>
      <section id="books" className="books section"><div className="section-label">03 — КНИГИ НА ЗАКАЗ</div><div className="section-heading"><h2>Ваша идея.<br/><em>Моё перо.</em></h2><p>Истории для бизнеса и для души.<br/>Выберите, какую книгу мы создадим.</p></div>
        <div className="business"><div><span className="eyebrow">СМЫСЛЫ, КОТОРЫЕ РАБОТАЮТ</span><h3>Бизнес-книга</h3><p>Ваш опыт и знания — в форме книги.<br/>С готовой идеей или с замыслом, который найдём вместе.</p></div><div className="business-prices"><div><span>С вашей идеей</span><strong>25 000 ₽</strong></div><div><span>Идея с нуля</span><strong>30 000 ₽</strong></div><a href={VK} target="_blank" rel="noopener noreferrer" className="text-link">Обсудить бизнес-книгу ↗</a></div></div>
        <div className="fiction-heading"><h3>Художественная литература</h3><div className="segmented" role="group" aria-label="Авторство книги"><button onClick={() => setGhost(false)} aria-pressed={!ghost} className={!ghost ? 'active' : ''}>Моё имя на обложке</button><button onClick={() => setGhost(true)} aria-pressed={ghost} className={ghost ? 'active' : ''}>Ваше имя · Ghostwriting</button></div></div>
        <p className="mode-description" aria-live="polite">{ghost ? 'Вы даёте идею, сюжет и референсы. Я пишу в своём стиле, включаю 2 раунда правок. На обложке — ваше имя; моё имя не упоминается, работа не попадает в портфолио.' : 'Базовый вариант: я пишу вашу историю, на обложке — моё имя. От небольшой истории до целого мира между страницами.'}</p>
        <div className="price-grid">{[{n:'01',title:'Рассказ',desc:'Один момент. Целая жизнь внутри.',base:'25 000',extra:'10 000',total:'35 000'},{n:'02',title:'Повесть',desc:'История, в которой хочется остаться.',base:'55 000',extra:'22 000',total:'77 000'},{n:'03',title:'Роман',desc:'Мир, который начинается с вашей идеи.',base:'от 100 000',extra:'40 000',total:'от 140 000'}].map(item => <article className="price-card" key={item.n}><span className="card-number">{item.n} /</span><h3>{item.title}</h3><p>{item.desc}</p><div className="price">{ghost ? item.total : item.base} <span>₽</span></div><div className="price-note">{ghost ? `Доплата к базовой цене: ${item.extra} ₽` : 'Моё имя на обложке'}</div><Contact className="outline">Заказать {item.title.toLowerCase()}</Contact></article>)}</div>
        <p className="pricing-note">Объём, сроки и детали работы обсуждаются индивидуально до начала проекта.</p>
      </section>
      <section className="courses-preview section" aria-labelledby="courses-title"><div className="course-poster"><Image src="/images/kod-krovi-marathon.jpg" alt="Афиша писательского марафона «Код крови»: твоя история уже написана — осталось её расшифровать" width={1024} height={1024} sizes="(max-width: 760px) 86vw, 380px" /></div><div className="course-copy"><div className="section-label">КУРСЫ · СКОРО</div><h2 id="courses-title">Код крови.<br/><em>Разгадать свою историю.</em></h2><p>Писательский марафон «Код крови».</p><p>Раздел курсов готовится к запуску. Пока загляните в сообщество «Перо Феникса» во ВКонтакте.</p><a className="text-link" href="https://vk.ru/club236548094" target="_blank" rel="noopener noreferrer">Перейти в сообщество <span>↗</span></a></div></section>
      <section className="process section"><div className="section-label">04 — КАК ВСЁ НАЧИНАЕТСЯ</div><h2>От первой искры —<br/><em>к первой странице.</em></h2><div className="steps"><div><span>01</span><h3>Знакомимся</h3><p>Напишите мне во ВКонтакте. Расскажите об идее — даже если она пока в двух словах.</p></div><div><span>02</span><h3>Находим форму</h3><p>Обсудим вашу задачу, формат книги, условия и сроки. Договоримся о деталях.</p></div><div><span>03</span><h3>Создаём историю</h3><p>Начинаем работу над текстом. Шаг за шагом придаём вашему замыслу форму.</p></div></div></section>
      <section id="contacts" className="contact section"><span className="contact-star">✦</span><div className="section-label">СЛЕДУЮЩАЯ ГЛАВА — ВАША</div><h2>Всё начинается<br/><em>с «Здравствуйте».</em></h2><p>Есть идея, вопрос или просто желание написать книгу?<br/>Расскажите мне. Я на связи только во ВКонтакте.</p><Contact>Написать Светлане</Contact><a className="community" href="https://vk.ru/club236548094" target="_blank" rel="noopener noreferrer">Сообщество «Перо Феникса» ↗</a></section>
    </main><footer><a href="#" className="brand"><Feather/><span>Светлана Нильс<small>ПЕРО ФЕНИКСА</small></span></a><span>© {new Date().getFullYear()} Светлана Нильс</span><span className="footer-end">СЛОВА ОБРЕТАЮТ КРЫЛЬЯ</span></footer>
  </>;
}
