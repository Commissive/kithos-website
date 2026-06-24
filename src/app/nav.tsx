"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { AccessButton } from "./access-modal";
import "./nav.css";

const NAV_LINKS = [{ href: "/#capabilities", label: "What it does" }] as const;

const SCROLL_SOLID_THRESHOLD = 8;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const navEl = navRef.current;
    if (!navEl) return;

    const syncNavHeight = () => {
      root.style.setProperty(
        "--nav-h",
        `${Math.ceil(navEl.getBoundingClientRect().height)}px`,
      );
    };

    syncNavHeight();

    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(syncNavHeight);
    resizeObserver.observe(navEl);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const syncScrolled = () => {
      setScrolled(window.scrollY > SCROLL_SOLID_THRESHOLD);
    };

    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
    return () => window.removeEventListener("scroll", syncScrolled);
  }, []);

  // While the mobile menu is open: close on Escape, close when the viewport
  // grows back to desktop, and lock body scroll behind the panel.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className="nav-site"
        data-menu-open={menuOpen || undefined}
        data-scrolled={scrolled || undefined}
      >
        <div className="nav-site__inner">
          <Link href="/" aria-label="Kithos" className="nav-site__brand">
            <Wordmark className="nav-site__wordmark" decorative />
          </Link>

          <div className="nav-site__links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-site__link ui"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <AccessButton tone="accent" className="nav-site__cta" />

          <button
            type="button"
            className="nav-site__toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden
            >
              {menuOpen ? (
                <path d="M6 6 L18 18 M18 6 L6 18" />
              ) : (
                <path d="M3 7 H21 M3 12 H21 M3 17 H21" />
              )}
            </svg>
          </button>
        </div>

        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          className="nav-site__scrim"
          onClick={() => setMenuOpen(false)}
        />

        <div id="nav-mobile-menu" className="nav-site__mobile">
          <ul className="nav-site__mobile-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-site__mobile-link ui"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="nav-site__mobile-cta"
            onClickCapture={() => setMenuOpen(false)}
          >
            <AccessButton size="lg" tone="accent" />
          </div>
        </div>
      </nav>
      <div className="nav-site__spacer" aria-hidden />
    </>
  );
}
