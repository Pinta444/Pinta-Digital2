"use client";

import { useEffect } from "react";

const MAX_SHIFT = 40;

/** Moves every [data-speed] element against the scroll, relative to its parent's position in the viewport. */
export default function Parallax() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-speed]"));
    let ticking = false;

    const update = () => {
      ticking = false;
      if (window.innerWidth < 700) {
        els.forEach((el) => (el.style.transform = ""));
        return;
      }
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        const shift = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, offset * -parseFloat(el.dataset.speed!)));
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
