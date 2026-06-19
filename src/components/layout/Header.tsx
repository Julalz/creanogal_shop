"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./Logo";
import { HeaderCartLink } from "./HeaderCartLink";
import "./header.css";
import "./logo.css";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Quooker", href: "/quooker" },
  { label: "Tienda", href: "/productos" },
  { label: "Cocinas", href: "/cocinas" },
  { label: "Carpintería", href: "/carpinteria" },
  { label: "Reformas", href: "/reformas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header">
        <Link href="/" className="header__logo-link">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="header__link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <HeaderCartLink />
          <button
            type="button"
            className="header__menu-btn"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`header__mobile-overlay${open ? " header__mobile-overlay--open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <nav
        id="mobile-menu"
        className={`header__mobile${open ? " header__mobile--open" : ""}`}
        aria-label="Navegación móvil"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="header__mobile-link"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
