'use client';

import { useEffect } from 'react';

/** Progressive enhancement: the page stays visible without animation support. */
export default function Atmosphere() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let dispose = () => {};

    const configure = () => {
      dispose();
      if (motion.matches) return;

      const animations = new Set<Animation>();
      const cleanups: (() => void)[] = [];
      const play = (element: Element, delay = 0) => {
        if (typeof element.animate !== 'function') return;
        const animation = element.animate(
          [{ opacity: 0, translate: '0 24px' }, { opacity: 1, translate: '0 0' }],
          { duration: 800, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
        );
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            // Reveal once on entry. Never hide sections while waiting for a scroll.
            if (!entry.target.contains(document.activeElement)) {
              play(entry.target, Number((entry.target as HTMLElement).dataset.revealDelay || 0));
            }
          }
        }, { threshold: 0.08 });
        document.querySelectorAll<HTMLElement>(
          '.hero-content > *, .hero-portrait, .section > .section-label, .about-grid > *, ' +
          '.consultation-copy, .consultation-action, .mentor-copy, .mentor-card, ' +
          '.section-heading, .business, .fiction-heading, .price-card, .course-poster, ' +
          '.course-copy, .process > h2, .steps > div, .contact > h2, .contact > p',
        ).forEach(element => {
          const staggered = element.matches('.price-card, .steps > div, .hero-content > *');
          if (staggered && element.parentElement) {
            element.dataset.revealDelay = String(Math.min(Array.from(element.parentElement.children).indexOf(element) * 70, 280));
          }
          observer.observe(element);
        });
        cleanups.push(() => observer.disconnect());
      }

      if (pointer.matches) {
        document.querySelectorAll<HTMLElement>('.hero-portrait, .mentor-card, .price-card, .course-poster').forEach(element => {
          let frame = 0;
          const reset = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            element.classList.remove('tilt-active');
            for (const property of ['--tilt-x', '--tilt-y', '--light-x', '--light-y']) element.style.removeProperty(property);
          };
          const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              const bounds = element.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
              const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
              element.style.setProperty('--tilt-x', `${(0.5 - y) * 6}deg`);
              element.style.setProperty('--tilt-y', `${(x - 0.5) * 8}deg`);
              element.style.setProperty('--light-x', `${x * 100}%`);
              element.style.setProperty('--light-y', `${y * 100}%`);
              element.classList.add('tilt-active');
              frame = 0;
            });
          };
          element.classList.add('tilt-surface');
          element.addEventListener('pointermove', move, { passive: true });
          element.addEventListener('pointerleave', reset);
          element.addEventListener('pointercancel', reset);
          element.addEventListener('blur', reset, true);
          cleanups.push(() => {
            reset();
            element.classList.remove('tilt-surface');
            element.removeEventListener('pointermove', move);
            element.removeEventListener('pointerleave', reset);
            element.removeEventListener('pointercancel', reset);
            element.removeEventListener('blur', reset, true);
          });
        });
      }

      dispose = () => {
        cleanups.forEach(cleanup => cleanup());
        animations.forEach(animation => animation.cancel());
        animations.clear();
      };
    };

    configure();
    motion.addEventListener('change', configure);
    pointer.addEventListener('change', configure);
    return () => {
      dispose();
      motion.removeEventListener('change', configure);
      pointer.removeEventListener('change', configure);
    };
  }, []);

  return null;
}
