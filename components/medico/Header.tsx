"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { MedicoLink } from "./MedicoLink";

export function Brand() {
  return (
    <MedicoLink href="/" className="medico-brand" aria-label="Medico home">
      <Image
        src="/medico/logo.png"
        alt="Medico"
        width={142}
        height={39}
        className="medico-logo logo-default"
        priority
      />
      <Image
        src="/medico/logo-dark.png"
        alt=""
        aria-hidden="true"
        width={142}
        height={39}
        className="medico-logo logo-inverse"
        priority
      />
    </MedicoLink>
  );
}
const navigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["How It Works", "/how-it-works"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="medico-header">
      <div className="medico-container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <MedicoLink
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </MedicoLink>
          ))}
        </nav>
        <div className="header-actions">
          <MedicoLink href="/login" className="login-link">
            Log in
          </MedicoLink>
          <MedicoLink href="/signup" className="m-button compact">
            Get started <ArrowUpRight size={16} />
          </MedicoLink>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, href]) => (
            <MedicoLink
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
              <ArrowUpRight size={16} />
            </MedicoLink>
          ))}
          <MedicoLink href="/login">
            Log in <ArrowUpRight size={16} />
          </MedicoLink>
        </nav>
      )}
    </header>
  );
}
