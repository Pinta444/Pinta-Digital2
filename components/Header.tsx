"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { BrandMark } from "./Brand";
import { Magnetic } from "./Motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap">
        <div className="bar">
          <a className="brand" href="#top">
            <BrandMark />
            {site.name}
          </a>
          <nav className="nav" aria-label="Primary">
            {nav
              .filter((n) => !n.mobileOnly)
              .map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
          </nav>
          <div className="head-actions">
            <Magnetic>
              <a className="btn btn-light" href="#contact">
                Book a call
              </a>
            </Magnetic>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="mnav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
            </button>
          </div>
        </div>
        <nav className="mnav" id="mnav" aria-label="Mobile" hidden={!open}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
