import type { Metadata } from 'next';

export const SITE_URL = 'https://svetlananils.ru';
const title = 'Светлана Нильс — книги на заказ и наставничество | Перо Феникса';
const description = 'Написание художественных и бизнес-книг на заказ, ghostwriting и наставничество для авторов. Консультация — 2 500 ₽. Светлана Нильс. Связь во ВКонтакте.';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: 'Перо Феникса — Светлана Нильс',
  authors: [{ name: 'Светлана Нильс', url: 'https://vk.ru/svetikanilsla' }],
  creator: 'Светлана Нильс',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website', locale: 'ru_RU', url: SITE_URL,
    siteName: 'Светлана Нильс — Перо Феникса', title, description,
  },
  twitter: { card: 'summary_large_image', title, description, images: [{ url: '/opengraph-image', alt: 'Светлана Нильс — книги на заказ и наставничество' }] },
};

const authorId = `${SITE_URL}/#author`;
const websiteId = `${SITE_URL}/#website`;
const pageId = `${SITE_URL}/#webpage`;

const services = [
  { name: 'Консультация по писательству', price: 2500, anchor: 'consultation' },
  { name: 'Наставничество для авторов', price: 35000, anchor: 'mentorship' },
  { name: 'Бизнес-книга с вашей идеей', price: 25000, anchor: 'books' },
  { name: 'Бизнес-книга с разработкой идеи с нуля', price: 30000, anchor: 'books' },
  { name: 'Рассказ — имя Светланы Нильс на обложке', price: 25000, anchor: 'books' },
  { name: 'Повесть — имя Светланы Нильс на обложке', price: 55000, anchor: 'books' },
  { name: 'Роман — имя Светланы Нильс на обложке', price: 100000, anchor: 'books', from: true },
  { name: 'Рассказ — ghostwriting', price: 35000, anchor: 'books' },
  { name: 'Повесть — ghostwriting', price: 77000, anchor: 'books' },
  { name: 'Роман — ghostwriting', price: 140000, anchor: 'books', from: true },
];

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', '@id': authorId, name: 'Светлана Нильс',
      url: SITE_URL, jobTitle: 'Писательница, автор книг и наставник',
      sameAs: ['https://vk.ru/svetikanilsla', 'https://vk.ru/club236548094'],
      description: 'Написание книг на заказ и наставничество для авторов. Перо Феникса.',
    },
    {
      '@type': 'WebSite', '@id': websiteId, url: `${SITE_URL}/`,
      name: 'Светлана Нильс — Перо Феникса', inLanguage: 'ru-RU',
      publisher: { '@id': authorId },
    },
    {
      '@type': 'WebPage', '@id': pageId, url: `${SITE_URL}/`, name: title,
      description, inLanguage: 'ru-RU', isPartOf: { '@id': websiteId },
      about: { '@id': authorId }, mainEntity: { '@id': `${SITE_URL}/#services` },
    },
    {
      '@type': 'OfferCatalog', '@id': `${SITE_URL}/#services`, name: 'Услуги Светланы Нильс',
      itemListElement: services.map(service => ({
        '@type': 'Offer', url: `${SITE_URL}/#${service.anchor}`,
        seller: { '@id': authorId },
        ...(service.from
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: service.price, priceCurrency: 'RUB' } }
          : { price: service.price, priceCurrency: 'RUB' }),
        itemOffered: {
          '@type': 'Service', name: service.name, provider: { '@id': authorId },
          url: `${SITE_URL}/#${service.anchor}`,
        },
      })),
    },
  ],
};
