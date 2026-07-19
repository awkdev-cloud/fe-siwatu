"use client";

import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  isScrolled?: boolean;
};

export default function Navbar({ isScrolled = false }: NavbarProps) {
  const [isKatalogOpen, setIsKatalogOpen] = useState(false);

  const mainMenus = [
    { label: "Beranda", href: "/" },
    { label: "Galeri", href: "/galleries" },
    { label: "Paket", href: "/packages" },
  ];

  const afterMenus = [
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ];

  const katalogMenus = [
    {
      label: "Katalog Flora",
      href: "/plant-revitalizations",
      description: "Tanaman revitalisasi kawasan wisata.",
    },
    {
      label: "Bebatuan Unik",
      href: "/unique-rocks",
      description: "Katalog batu unik dan informasi edukatif.",
    },
  ];

  const menuClass = isScrolled
    ? "text-[#1d2b1f]/75 hover:bg-green-900/10 hover:text-green-800"
    : "text-white/85 hover:bg-white/15 hover:text-white";

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {mainMenus.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${menuClass}`}
        >
          {item.label}
        </Link>
      ))}

      <div
        className="relative"
        onMouseEnter={() => setIsKatalogOpen(true)}
        onMouseLeave={() => setIsKatalogOpen(false)}
      >
        <button
          type="button"
          onClick={() => setIsKatalogOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${menuClass}`}
        >
          Katalog
          <span
            className={`text-[10px] transition ${
              isKatalogOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        <div
          className={`absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-[28px] border border-green-900/10 bg-[#f7f6eb] p-3 shadow-2xl shadow-black/20 transition-all duration-200 ${
            isKatalogOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-3 opacity-0"
          }`}
        >
          {katalogMenus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsKatalogOpen(false)}
              className="block rounded-2xl p-4 transition hover:bg-green-900/10"
            >
              <p className="text-sm font-black text-green-900">{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {afterMenus.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${menuClass}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}