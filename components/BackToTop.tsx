"use client";

import { useEffect, useRef, useState } from "react";

/** Round button that fades in once the hero is behind you; its ring fills with scroll progress. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(1 - p);
      setVisible(window.scrollY > window.innerHeight * 0.8);
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

  return (
    <a className={`to-top${visible ? " show" : ""}`} href="#top" aria-label="Back to top" inert={!visible}>
      <svg className="ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="23" pathLength={1} />
        <circle ref={ring} cx="24" cy="24" r="23" pathLength={1} className="fill" />
      </svg>
      <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
