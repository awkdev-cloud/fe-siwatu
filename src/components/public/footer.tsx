import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  whatsappDisplay?: string;
  whatsappLink?: string;
  locationName?: string;
};

const LOGO_WIDTH = 64;
const LOGO_HEIGHT = 64;

export default function Footer({
  whatsappDisplay,
  whatsappLink,
  locationName,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const mainNavigation = [
    { label: "Beranda", href: "/" },
    { label: "Galeri", href: "/#gallery" },
    { label: "Paket Wisata", href: "/#packages" },
    { label: "Tentang", href: "/#about" },
    { label: "Kontak", href: "/#contact" },
  ];

  const natureCatalog = [
    { label: "Katalog Flora", href: "/#flora" },
    { label: "Bebatuan Unik", href: "/#rocks" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#071a0d] px-6 pt-16 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-32 top-10 h-72 w-72  blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden ">
                <Image
                  src="/images/logo.png"
                  alt="Logo Alas Watu Kebonan"
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black leading-none">
                  SIWATU
                </h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Alas Watu Kebonan
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Website informasi wisata, katalog alam, reservasi, dan
              dokumentasi digital untuk mendukung pengembangan Desa Wisata Alas
              Watu Kebonan.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Wisata Alam", "QR Edukasi", "Katalog Flora", "Bebatuan Unik"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/65 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Navigasi */}
          <div className="lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Navigasi
            </p>

            <div className="mt-5 space-y-3 text-sm">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-white/55 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full  opacity-0 transition group-hover:opacity-100" />
                  <span className="transition group-hover:translate-x-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Katalog Alam */}
          <div className="lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Katalog Alam
            </p>

            <div className="mt-5 space-y-3 text-sm">
              {natureCatalog.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-white/55 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-700 opacity-0 transition group-hover:opacity-100" />
                  <span className="transition group-hover:translate-x-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-3">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Kontak
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-white/35">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {whatsappDisplay ?? "WhatsApp Admin"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-white/35">
                  Lokasi
                </p>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {locationName ?? "Desa Kebonan"}
                </p>
              </div>
            </div>

            <a
              href={whatsappLink ?? "/#reservation"}
              target={whatsappLink ? "_blank" : undefined}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-950/30 transition hover:-translate-y-0.5 hover:bg-green-700"
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
              Reservasi WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col justify-between gap-4 py-6 text-xs text-white/35 md:flex-row md:items-center">
          <p>© {currentYear} Siwatu. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/#about" className="transition hover:text-white">
              Tentang
            </Link>
            <Link href="/#gallery" className="transition hover:text-white">
              Galeri
            </Link>
            <Link href="/#packages" className="transition hover:text-white">
              Paket Wisata
            </Link>
            <Link href="/#contact" className="transition hover:text-white">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}