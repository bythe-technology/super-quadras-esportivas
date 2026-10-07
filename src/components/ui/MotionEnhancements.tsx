'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: content is visible before hydration and without JS. */
export function MotionEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('section-enter');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    const elements = document.querySelectorAll('[data-motion-heading]');
    elements.forEach((element) => observer.observe(element));
    const stopMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('section-enter'));
    };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', stopMotion);
      elements.forEach((element) => element.classList.remove('section-enter'));
    };
  }, [pathname]);
  return null;
}
