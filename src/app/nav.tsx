"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { AccessButton } from "./access-modal";
import "./nav.css";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <nav ref={navRef} aria-label="Primary" className="nav-site">
        <div ref={innerRef} className="nav-site__inner">
          <Link href="/" aria-label="Kithos" className="nav-site__brand">
            <Wordmark className="nav-site__wordmark" decorative />
          </Link>

          <AccessButton tone="accent" className="nav-site__cta" />
        </div>
      </nav>
      <div className="nav-site__spacer" aria-hidden />
    </>
  );
}
