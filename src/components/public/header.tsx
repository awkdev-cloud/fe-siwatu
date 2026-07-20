"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

type HeaderProps = {
  whatsappLink?: string;
};

const LOGO_WIDTH = 74;
const LOGO_HEIGHT = 74;

export default function Header({ whatsappLink }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenus = [
    { label: "Beranda", href: "/" },
    { label: "Galeri", href: "/galleries" },
    { label: "Paket Wisata", href: "/packages" },
    { label: "Katalog Flora", href: "/plant-revitalizations" },
    { label: "Bebatuan Unik", href: "/unique-rocks" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "rounded-full border border-white/70 bg-white px-5 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl"
            : "rounded-none border border-transparent bg-transparent px-6 py-4 shadow-none backdrop-blur-0"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className={`relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300 ${
              isScrolled ? "h-11 w-11" : "h-14 w-14"
            }`}
          >
            <Image
              src="/images/logo.png"
              alt="Logo Alas Watu Kebonan"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="hidden sm:block">
            <p
              className={`text-xl font-black leading-none transition-colors duration-300 ${
                isScrolled ? "text-green-700" : "text-white"
              }`}
            >
              SIWATU
            </p>

            <p
              className={`mt-1 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-300 ${
                isScrolled ? "text-green-900/45" : "text-white/60"
              }`}
            >
              Alas Watu Kebonan
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-4">
          <Navbar isScrolled={isScrolled} />

          <div
            className={`hidden h-8 w-px transition-colors duration-300 lg:block ${
              isScrolled ? "bg-green-900/15" : "bg-white/25"
            }`}
          />

          <button
            type="button"
            aria-label="Search"
            className={`hidden h-10 w-10 items-center justify-center rounded-full transition lg:flex ${
              isScrolled
                ? "text-green-950 hover:bg-green-900/10"
                : "text-white hover:bg-white/15"
            }`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.5 16.5" />
            </svg>
          </button>

          <a
            href={whatsappLink ?? "/#reservation"}
            target={whatsappLink ? "_blank" : undefined}
            className={`hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white shadow-lg transition lg:inline-flex ${
              isScrolled
                ? "bg-green-700 shadow-green-900/25 hover:bg-green-600"
                : "bg-green-600/90 shadow-black/20 backdrop-blur hover:bg-green-500"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                <rect x="5" y="11" width="14" height="10" rx="2" />
              </svg>
            </span>
            Reservasi
          </a>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-black transition lg:hidden ${
              isScrolled
                ? "bg-green-700 text-white"
                : "bg-white/15 text-white backdrop-blur"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mx-auto mt-3 max-w-7xl overflow-hidden rounded-[28px] border border-white/70 bg-[#f7f6eb]/95 shadow-2xl shadow-black/15 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileOpen
            ? "max-h-[560px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-1 p-4">
          {mobileMenus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-green-950/75 transition hover:bg-green-900/10 hover:text-green-800"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={whatsappLink ?? "/#reservation"}
            target={whatsappLink ? "_blank" : undefined}
            className="mt-3 block rounded-2xl bg-green-700 px-4 py-3 text-center text-sm font-black text-white"
          >
            Reservasi WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}