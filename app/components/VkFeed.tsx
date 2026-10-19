'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

type VkApi = { Widgets: { Group: (id: string, options: Record<string, string | number>, group: number) => unknown } };
const getApi = () => (window as Window & { VK?: VkApi }).VK;
let apiPromise: Promise<VkApi> | undefined;

function loadApi(): Promise<VkApi> {
  const existing = getApi();
  if (existing?.Widgets?.Group) return Promise.resolve(existing);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<VkApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://vk.com/js/api/openapi.js?169';
    script.async = true;
    const fail = () => {
      window.clearTimeout(timeout);
      script.remove();
      reject(new Error('VK widget API unavailable'));
    };
    const timeout = window.setTimeout(fail, 12000);
    script.onerror = fail;
    script.onload = () => {
      const api = getApi();
      if (!api?.Widgets?.Group) { fail(); return; }
      window.clearTimeout(timeout);
      resolve(api);
    };
    document.head.appendChild(script);
  }).catch(error => { apiPromise = undefined; throw error; });
  return apiPromise;
}

export default function VkFeed() {
  const section = useRef<HTMLElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'waiting' | 'loading' | 'ready' | 'error'>('waiting');

  useEffect(() => {
    const host = container.current;
    const root = section.current;
    if (!host || !root) return;
    let cancelled = false;
    let started = false;
    let resizeTimer = 0;
    let frameTimeout = 0;
    let resizeObserver: ResizeObserver | undefined;
    let frameObserver: MutationObserver | undefined;
    let lastWidth = 0;

    const start = async () => {
      if (started) return;
      started = true;
      setStatus('loading');
      try {
        const api = await loadApi();
        if (cancelled) return;
        const render = () => {
          if (cancelled) return;
          const width = host.clientWidth;
          // Ignore fractional layout rounding; rebuild only on a real width change.
          if (!width || Math.abs(width - lastWidth) <= 2) return;
          lastWidth = width;
          frameObserver?.disconnect();
          window.clearTimeout(frameTimeout);
          host.replaceChildren();
          setStatus('loading');
          // VK may insert or replace its iframe asynchronously. Its cross-origin
          // load event cannot reliably indicate whether the feed is displayed.
          const detectFrame = () => {
            const frame = host.querySelector('iframe');
            if (!frame || cancelled) return;
            frame.title = 'Записи сообщества «Светлана Нильс: Перо Феникса» ВКонтакте';
            window.clearTimeout(frameTimeout);
            setStatus('ready');
          };
          frameObserver = new MutationObserver(detectFrame);
          frameObserver.observe(host, { childList: true, subtree: true });
          frameTimeout = window.setTimeout(() => {
            if (cancelled) return;
            if (host.querySelector('iframe')) detectFrame();
            else setStatus('error');
          }, 12000);
          try {
            api.Widgets.Group(host.id, {
              mode: 4, wide: 1, no_cover: 1, width: String(width), height: 600,
              color1: '191916', color2: 'EEE9DE', color3: 'CFB181',
            }, 236548094);
            detectFrame();
          } catch {
            window.clearTimeout(frameTimeout);
            if (host.querySelector('iframe')) detectFrame();
            else setStatus('error');
          }
        };
        render();
        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(() => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(render, 200);
          });
          resizeObserver.observe(host);
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          void start();
        }
      }, { rootMargin: '350px' })
      : null;
    if (observer) observer.observe(root);
    else void start();

    return () => {
      cancelled = true;
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.clearTimeout(resizeTimer);
      window.clearTimeout(frameTimeout);
      frameObserver?.disconnect();
      host.replaceChildren();
    };
  }, []);

  return <section id="journal" className="vk-journal section" ref={section} aria-labelledby="journal-title">
    <div className="journal-intro">
      <div className="section-label">ИЗ МОЕГО АВТОРСКОГО ДНЕВНИКА</div>
      <h2 id="journal-title">Между строк.<br /><em>И за страницами.</em></h2>
      <p>Записи, истории и новости из сообщества «Перо Феникса» — здесь, на сайте.</p>
      <a className="text-link" href="https://vk.ru/club236548094" target="_blank" rel="noopener noreferrer"><Icon name="vk" />Открыть сообщество<Icon name="arrow" /></a>
    </div>
    <div className="vk-feed-panel" data-status={status}>
      <div className="vk-feed-heading"><Icon name="vk" /><span>Перо Феникса</span><small>ВКонтакте</small></div>
      <div className="vk-feed-status" role="status" aria-live="polite">
        {status === 'waiting' && 'Лента записей ВКонтакте'}
        {status === 'loading' && 'Загружаем записи сообщества…'}
        {status === 'error' && 'Не удалось загрузить ленту. Записи можно прочитать в сообществе ВКонтакте.'}
      </div>
      <div id="vk-community-feed" ref={container} className="vk-feed-host" />
      <a className="vk-feed-fallback" href="https://vk.ru/club236548094" target="_blank" rel="noopener noreferrer">Читать записи во ВКонтакте<Icon name="arrow" /></a>
    </div>
  </section>;
}
