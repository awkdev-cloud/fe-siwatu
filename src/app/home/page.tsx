import HeroCarousel, { type HeroSlide } from "@/components/public/heroCarousel";
import Link from "next/link";
import ReviewCarousel from "@/components/public/reviewCarousel";
import ScrollReveal from "@/components/public/scrollReveal";

type ApiResponse<T> = {
  message?: string;
  data: T;
};

type Gallery = {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  image_url?: string;
  category?: {
    name?: string;
  };
};

type TourPackage = {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  package_type?: string;
  package_type_uppercase?: string;
  highlight_label?: string;
  facilities?: string[];
  duration?: string;
  price_formatted?: string;
};

type Plant = {
  id: number;
  name: string;
  scientific_name?: string;
  description?: string;
  image_url?: string;
  qr_code_url?: string;
};

type Rock = {
  id: number;
  name: string;
  scientific_name?: string;
  description?: string;
  image_url?: string;
  qr_code_url?: string;
};

type Review = {
  id: number;
  name: string;
  date?: string;
  rating?: number;
  message?: string;
  initial?: string;
};

type Contact = {
  whatsapp?: {
    title?: string;
    display?: string;
    response_time?: string;
    link?: string;
  };
  operational?: {
    title?: string;
    hours?: string;
    note?: string;
  };
  location?: {
    title?: string;
    name?: string;
    address?: string;
    google_maps_url?: string;
    google_maps_embed_url?: string;
  };
  helper?: {
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
  };
  social_links?: {
    id: number;
    platform: string;
    username?: string;
    url: string;
  }[];
};

const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero/hero_1.jpg",
    alt: "Pemandangan Alas Watu Kebonan",
  },
  {
    src: "/images/hero/hero_2.JPG",
    alt: "Suasana alam Alas Watu Kebonan",
  },
  {
    src: "/images/hero/hero_3.JPG",
    alt: "Jalur wisata Alas Watu Kebonan",
  },
  {
    src: "/images/hero/hero_4.JPG",
    alt: "Keindahan alam Desa Kebonan",
  },
];

const API_BASE_URL = process.env.API_BASE_URL;

async function fetchApi<T>(endpoint: string, fallback: T): Promise<T> {
  if (!API_BASE_URL) return fallback;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return fallback;

    const json = (await res.json()) as ApiResponse<T>;
    return json.data ?? fallback;
  } catch {
    return fallback;
  }
}

function Stars({ value = 5 }: { value?: number }) {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div className="text-sm tracking-wider text-yellow-400">
      {"★".repeat(safeValue)}
      <span className="text-zinc-600">{"★".repeat(5 - safeValue)}</span>
    </div>
  );
}

function SectionBadge({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-yellow-500" />
      <span
        className={`text-xs font-bold uppercase tracking-[0.25em] ${
          variant === "dark" ? "text-green-300" : "text-green-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function formatTitle(item: { title?: string; name?: string }) {
  return item.title ?? item.name ?? "Tanpa Judul";
}

export default async function HomePage() {
  const [galleries, packages, plants, rocks, reviews, contact] =
    await Promise.all([
      fetchApi<Gallery[]>("/galleries", []),
      fetchApi<TourPackage[]>("/tour-packages", []),
      fetchApi<Plant[]>("/plant-revitalizations", []),
      fetchApi<Rock[]>("/unique-rocks", []),
      fetchApi<Review[]>("/reviews", []),
      fetchApi<Contact>("/contact", {}),
    ]);

  const heroImage = heroSlides[0].src;

  const galleryItems = galleries.slice(0, 8);
  const tourItems = packages.slice(0, 5);
  const plantItems = plants.slice(0, 4);
  const rockItems = rocks.slice(0, 4);
  const reviewItems = reviews.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f4efcf] text-zinc-950">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden text-white">
          <HeroCarousel images={heroSlides} />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
            <ScrollReveal
              variant="zoomIn"
              delay={200}
              duration={1000}
              className="mx-auto max-w-5xl"
            >
              <h1 className="mx-auto max-w-3xl font-serif text-5xl font-black leading-tight md:text-7xl">
                Jelajahi Keindahan Alam{" "}
                <span className="text-yellow-400">Alas Watu</span>{" "}
                <em className="font-serif text-white">Kebonan</em>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                Temukan pesona alam, bebatuan unik, koleksi flora, paket wisata,
                dan pengalaman berkunjung yang terintegrasi secara digital.
              </p>
            </ScrollReveal>
          </div>
     </section>

      {/* ABOUT */}

<section
  id="about"
  className="relative overflow-hidden bg-[#f7f6eb] px-6 py-10"
>
  {/* Background Decoration */}
  <div className="pointer-events-none absolute inset-0 opacity-50">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl">
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-16">
      {/* Main Content */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left Content */}
        
        <div className="lg:col-span-4">
          <SectionBadge>Tentang Kami</SectionBadge>

          <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
            Surga Alam Kecil,{" "}
            <span className="text-[#19B64F]">Pengalaman Nyata.</span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-zinc-600 md:text-base">
            Alas Watu Kebonan dikembangkan sebagai kawasan wisata berbasis
            potensi lokal yang memadukan keindahan alam, identitas bebatuan,
            katalog flora, serta pengalaman edukatif bagi pengunjung.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#00532B]">10+</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-zinc-500">
                Spot alam dan area jelajah wisata
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#00532B]">QR</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-zinc-500">
                Katalog flora dan bebatuan digital
              </p>
            </div>
          </div>

          <a
            href="#packages"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#00532B] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#00532B]/20 transition hover:-translate-y-0.5 hover:bg-[#19B64F]"
          >
            Lihat Paket Wisata
            <span>→</span>
          </a>
        </div>

        {/* Right Gallery Cards */}
        <div className="lg:col-span-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#19B64F]">
                Galeri Pilihan
              </p>

              <h3 className="mt-2 font-serif text-3xl font-black text-[#00532B]">
                Jelajahi Potensi Alas Watu
              </h3>
            </div>

            <a
              href="/galleries"
              className="hidden rounded-full border border-[#00532B]/15 bg-white px-5 py-3 text-sm font-black text-[#00532B] transition hover:bg-[#00532B] hover:text-white md:inline-flex"
            >
              Lihat Semua →
            </a>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {galleryItems.slice(0, 5).map((item, index) => (
              <a
                key={item.id}
                href="/galleries"
                className={`
                  group relative h-[360px] min-w-[260px] overflow-hidden rounded-[32px] bg-[#00532B] shadow-xl shadow-[#00532B]/10 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/20
                  ${index === 0 ? "md:min-w-[300px]" : ""}
                `}
              >
                <img
                  src={item.image_url ?? heroImage}
                  alt={formatTitle(item)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/95 via-[#00532B]/30 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B] backdrop-blur">
                  {item.category?.name ?? "Alas Watu"}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-xl font-black leading-tight text-white">
                    {formatTitle(item)}
                  </h4>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
                    {item.description ??
                      "Dokumentasi potensi alam dan suasana kawasan Alas Watu Kebonan."}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FBD90F] px-4 py-2 text-xs font-black text-[#00532B]">
                    Lihat Detail
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-2 w-8 rounded-full bg-[#00532B]" />
            <span className="h-2 w-2 rounded-full bg-[#00532B]/20" />
            <span className="h-2 w-2 rounded-full bg-[#00532B]/20" />
            <span className="h-2 w-2 rounded-full bg-[#00532B]/20" />
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <a
              href="/galleries"
              className="rounded-full border border-[#00532B]/15 bg-white px-6 py-3 text-sm font-black text-[#00532B] transition hover:bg-[#00532B] hover:text-white"
            >
              Lihat Semua Galeri →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* RESERVATION */}
<section
  id="reservation"
  className="relative overflow-hidden px-6 py-10"
>
    <div className="shadow-xl shadow-black/25">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero_1.jpg"
          alt="Reservasi Alas Watu Kebonan"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid min-h-[620px] gap-10 px-6 py-12 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-16">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-white lg:col-span-6">
          <SectionBadge variant="dark">Reservasi Kunjungan</SectionBadge>

          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-black leading-tight md:text-6xl">
            Siap Menjelajah{" "}
            <span className="text-[#FBD90F]">Alas Watu Kebonan?</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-white/75 md:text-base">
            Reservasi dapat dilakukan langsung melalui WhatsApp untuk informasi
            jadwal kunjungan, pilihan paket wisata, kebutuhan kegiatan, dan
            dokumentasi selama berada di kawasan Alas Watu Kebonan.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={contact.whatsapp?.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#19B64F] px-7 py-4 text-sm font-black text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#FBD90F] hover:text-[#00532B]"
            >
              Reservasi via WhatsApp
              <span className="text-lg leading-none">→</span>
            </a>

            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
            >
              Lihat Paket Wisata
            </a>
          </div>

          {/* Quick Steps */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                number: "01",
                text: "Pilih paket wisata yang tersedia.",
              },
              {
                number: "02",
                text: "Konfirmasi jadwal dengan admin.",
              },
              {
                number: "03",
                text: "Datang sesuai waktu reservasi.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15"
              >
                <p className="text-2xl font-black text-[#FBD90F]">
                  {step.number}
                </p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/70">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex items-center lg:col-span-6">
          <div className="w-full rounded-[36px] border border-white/15 bg-black/45 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
            {/* Admin */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FBD90F]">
                  Admin Wisata
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {contact.whatsapp?.display ?? "WhatsApp Admin"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  {contact.whatsapp?.response_time ??
                    "Admin akan merespons pada jam operasional wisata."}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FBD90F] text-2xl text-[#00532B] shadow-lg shadow-black/20">
                ✆
              </div>
            </div>

            {/* Package List */}
            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-black text-white">
                  Pilihan Paket Tersedia
                </p>

                <a
                  href="#packages"
                  className="text-xs font-bold text-[#FBD90F] transition hover:text-white"
                >
                  Lihat semua →
                </a>
              </div>

              <div className="space-y-3">
                {tourItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15"
                  >
                    <div>
                      <p className="text-sm font-black text-white">
                        {formatTitle(item)}
                      </p>

                      <p className="mt-1 text-xs text-white/55">
                        {item.duration ?? "Durasi menyesuaikan paket"}
                      </p>
                    </div>

                    <p className="shrink-0 rounded-full bg-[#FBD90F] px-3 py-1 text-xs font-black text-[#00532B]">
                      {item.price_formatted ?? "Info Harga"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold leading-7 text-white/75">
                Untuk kunjungan kelompok, dokumentasi, atau kegiatan khusus,
                silakan hubungi admin agar jadwal dan kebutuhan dapat
                disesuaikan.
              </p>

              <a
                href={contact.whatsapp?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FBD90F] px-6 py-4 text-sm font-black text-[#00532B] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#19B64F] hover:text-white"
              >
                Chat Admin Sekarang
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>

{/* PACKAGES */}
<section
  id="packages"
  className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white"
>
  {/* Background Decoration */}
  <div className="pointer-events-none absolute inset-0 opacity-60">
    <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#19B64F]/20 blur-3xl" />
    <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    {/* Header */}
    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <SectionBadge variant="dark">Paket Wisata</SectionBadge>

        <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
          Pilih Pengalaman{" "}
          <span className="text-[#FBD90F]">Terbaik</span> Anda
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
          Temukan pilihan paket wisata yang sesuai untuk kunjungan keluarga,
          rombongan, edukasi, maupun dokumentasi kegiatan di Alas Watu Kebonan.
        </p>
      </div>

      <a
        href="#reservation"
        className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
      >
        Reservasi Sekarang
        <span>→</span>
      </a>
    </div>

    {/* Cards */}
    <div className="grid gap-6 md:grid-cols-3">
      {tourItems.map((item, index) => (
        <article
          key={item.id}
          className={`
            group
            relative
            overflow-hidden
            rounded-[34px]
            border
            p-6
            shadow-xl
            transition-all
            duration-500
            hover:-translate-y-2
            ${
              index === 0
                ? "border-[#FBD90F]/40 bg-[#00532B]"
                : "border-white/10 bg-white/10 backdrop-blur"
            }
          `}
        >
          {index === 0 && (
            <div className="absolute right-5 top-5 rounded-full bg-[#FBD90F] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#00532B]">
              Rekomendasi
            </div>
          )}

          <div
            className={`
              mb-6 flex h-12 w-12 items-center justify-center rounded-full text-sm font-black
              ${
                index === 0
                  ? "bg-[#FBD90F] text-[#00532B]"
                  : "bg-white/10 text-[#FBD90F]"
              }
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <span
              className={`
                rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider
                ${
                  index === 0
                    ? "bg-white/15 text-white"
                    : "bg-[#19B64F]/15 text-[#19B64F]"
                }
              `}
            >
              {item.package_type_uppercase ??
                item.package_type ??
                "Paket Wisata"}
            </span>

            {item.highlight_label && (
              <span className="rounded-full bg-[#FBD90F]/15 px-3 py-1 text-[10px] font-black text-[#FBD90F]">
                {item.highlight_label}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-black leading-tight text-white">
            {formatTitle(item)}
          </h3>

          <p className="mt-4 min-h-[84px] text-sm leading-7 text-white/65">
            {item.description ??
              "Nikmati pengalaman wisata lokal yang dekat dengan alam dan potensi Desa Kebonan."}
          </p>

          <ul className="mt-6 space-y-3">
            {(item.facilities ?? [
              "Tiket masuk kawasan",
              "Pemandu lokal",
              "Dokumentasi kegiatan",
            ])
              .slice(0, 4)
              .map((facility) => (
                <li
                  key={facility}
                  className="flex items-start gap-3 text-sm font-semibold text-white/75"
                >
                  <span
                    className={`
                      mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black
                      ${
                        index === 0
                          ? "bg-[#FBD90F] text-[#00532B]"
                          : "bg-white/10 text-[#FBD90F]"
                      }
                    `}
                  >
                    ✓
                  </span>
                  <span>{facility}</span>
                </li>
              ))}
          </ul>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs font-black uppercase tracking-widest text-white/40">
              Mulai dari
            </p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <p
                  className={`
                    text-2xl font-black
                    ${index === 0 ? "text-[#FBD90F]" : "text-white"}
                  `}
                >
                  {item.price_formatted ?? "Hubungi Admin"}
                </p>

                {item.duration && (
                  <p className="mt-1 text-xs font-semibold text-white/45">
                    Durasi {item.duration}
                  </p>
                )}
              </div>

              <a
                href="#reservation"
                className={`
                  inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-black transition group-hover:translate-x-1
                  ${
                    index === 0
                      ? "bg-[#FBD90F] text-[#00532B] hover:bg-white"
                      : "bg-[#19B64F] text-white hover:bg-[#FBD90F] hover:text-[#00532B]"
                  }
                `}
                aria-label={`Pilih ${formatTitle(item)}`}
              >
                →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Bottom Note */}
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-black text-[#FBD90F]">
            Butuh paket khusus?
          </p>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">
            Untuk kunjungan rombongan, edukasi, dokumentasi, atau kegiatan
            khusus, jadwal dan kebutuhan dapat disesuaikan melalui admin.
          </p>
        </div>

        <a
          href="#reservation"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-[#FBD90F] px-6 py-3 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-[#19B64F] hover:text-white"
        >
          Konsultasi Paket
          <span>→</span>
        </a>
      </div>
    </div>
  </div>
</section>

{/* FLORA */}
<section
  id="flora"
  className="relative overflow-hidden bg-[#f7f6eb] px-6 py-10"
>
  {/* Background Decoration */}
  <div className="pointer-events-none absolute inset-0 opacity-60">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    {/* Header */}
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <SectionBadge>Katalog Flora</SectionBadge>

        <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
          Flora <span className="text-[#19B64F]">Kebonan</span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600 md:text-base">
          Informasi tanaman revitalisasi yang mendukung kawasan wisata lebih
          asri, edukatif, dan mudah diakses melalui katalog digital.
        </p>
      </div>

      <Link
        href="/plant-revitalizations"
        className="
          hidden
          w-fit
          items-center
          gap-3
          rounded-full
          border
          border-[#00532B]/15
          bg-white
          px-6
          py-3
          text-sm
          font-black
          text-[#00532B]
          shadow-sm
          transition
          hover:-translate-y-0.5
          hover:bg-[#00532B]
          hover:text-white
          md:inline-flex
        "
      >
        Lihat Semua Flora
        <span>→</span>
      </Link>
    </div>

    {/* Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {plantItems.slice(0, 4).map((plant) => (
        <article
          key={plant.id}
          className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-[#00532B]/10
            bg-white
            shadow-lg
            shadow-[#00532B]/5
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-2xl
            hover:shadow-[#00532B]/15
          "
        >
          {/* Image */}
          <div className="relative h-[180px] overflow-hidden bg-[#00532B]">
            <img
              src={plant.image_url ?? heroImage}
              alt={plant.name}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/75 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B] backdrop-blur">
              Flora
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#00532B]">
              {plant.name}
            </h3>

            <p className="mt-2 line-clamp-1 text-sm italic text-zinc-500">
              {plant.scientific_name ?? "Nama ilmiah belum tersedia"}
            </p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">
              {plant.description ?? "Deskripsi tanaman belum tersedia."}
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#00532B]/10 pt-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#19B64F]">
                Katalog Digital
              </span>

              <Link
                href={`/plant-revitalizations/${plant.id}`}
                className="
                  inline-flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FBD90F]
                  text-lg
                  font-black
                  text-[#00532B]
                  transition
                  group-hover:translate-x-1
                  hover:bg-[#00532B]
                  hover:text-white
                "
                aria-label={`Pelajari ${plant.name}`}
              >
                →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Mobile CTA */}
    <div className="mt-10 flex justify-center md:hidden">
      <Link
        href="/plant-revitalizations"
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#00532B]/15
          bg-white
          px-7
          py-4
          text-sm
          font-black
          text-[#00532B]
          shadow-sm
          transition
          hover:-translate-y-0.5
          hover:bg-[#00532B]
          hover:text-white
        "
      >
        Lihat Semua Flora
        <span>→</span>
      </Link>
    </div>
  </div>
</section>

{/* ROCKS */}
<section
  id="rocks"
  className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white"
>
  {/* Background Decoration */}
  <div className="pointer-events-none absolute inset-0 opacity-70">
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    {/* Header */}
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <SectionBadge variant="dark">Katalog Bebatuan</SectionBadge>

        <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
          Bebatuan Unik{" "}
          <span className="text-[#FBD90F]">Kebonan</span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
          Koleksi bebatuan unik sebagai daya tarik, identitas visual kawasan,
          dan media edukasi alam di Alas Watu Kebonan.
        </p>
      </div>

      <Link
        href="/unique-rocks"
        className="
          hidden
          w-fit
          items-center
          gap-3
          rounded-full
          border
          border-white/15
          bg-white/10
          px-6
          py-3
          text-sm
          font-black
          text-white
          backdrop-blur
          transition
          hover:-translate-y-0.5
          hover:bg-white
          hover:text-[#00532B]
          md:inline-flex
        "
      >
        Lihat Semua Batu
        <span>→</span>
      </Link>
    </div>

    {/* Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {rockItems.slice(0, 4).map((rock) => (
        <article
          key={rock.id}
          className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-white/10
            shadow-lg
            shadow-black/20
            backdrop-blur
            transition-all
            duration-500
            hover:-translate-y-2
            hover:bg-white/15
            hover:shadow-2xl
            hover:shadow-black/30
          "
        >
          {/* Image */}
          <div className="relative h-[180px] overflow-hidden bg-[#181818]">
            <img
              src={rock.image_url ?? heroImage}
              alt={rock.name}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-[#FBD90F] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B]">
              Bebatuan
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-white">
              {rock.name}
            </h3>

            <p className="mt-2 line-clamp-1 text-sm italic text-white/50">
              {rock.scientific_name ?? "Nama ilmiah belum tersedia"}
            </p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/65">
              {rock.description ?? "Deskripsi batu belum tersedia."}
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#FBD90F]">
                Edukasi Alam
              </span>

              <Link
                href={`/unique-rocks/${rock.id}`}
                className="
                  inline-flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FBD90F]
                  text-lg
                  font-black
                  text-[#00532B]
                  transition
                  group-hover:translate-x-1
                  hover:bg-white
                "
                aria-label={`Pelajari ${rock.name}`}
              >
                →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Mobile CTA */}
    <div className="mt-10 flex justify-center md:hidden">
      <Link
        href="/unique-rocks"
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-white/15
          bg-white/10
          px-7
          py-4
          text-sm
          font-black
          text-white
          backdrop-blur
          transition
          hover:-translate-y-0.5
          hover:bg-white
          hover:text-[#00532B]
        "
      >
        Lihat Semua Batu
        <span>→</span>
      </Link>
    </div>
  </div>
</section>

{/* REVIEWS */}
<section
  id="reviews"
  className="relative overflow-hidden bg-[#f7f6eb] px-6 py-10"
>
  <div className="pointer-events-none absolute inset-0 opacity-60">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <SectionBadge>Testimoni</SectionBadge>

        <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
          Kata Mereka yang{" "}
          <span className="text-[#19B64F]">Sudah Berkunjung</span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600 md:text-base">
          Cerita pengunjung yang sudah menikmati suasana alam, katalog edukatif,
          dan pengalaman wisata di Alas Watu Kebonan.
        </p>
      </div>

      <div className="rounded-3xl border border-[#00532B]/10 bg-white px-5 py-4 shadow-sm">
        <Stars value={5} />
        <p className="mt-2 text-xs font-black uppercase tracking-wider text-zinc-500">
          4.9 rata-rata rating
        </p>
      </div>
    </div>

    <ReviewCarousel reviews={reviewItems} />

    <div className="mt-10 flex justify-center">
      <a
        href="#contact"
        className="rounded-full border border-[#00532B]/15 bg-white px-7 py-4 text-sm font-black text-[#00532B] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#00532B] hover:text-white"
      >
        Beri Testimoni
      </a>
    </div>
  </div>
</section>

{/* SOCIAL */}
<section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
  <div className="pointer-events-none absolute inset-0 opacity-70">
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <SectionBadge variant="dark">Media Sosial</SectionBadge>

        <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
          Ikuti Cerita Kami di{" "}
          <span className="text-[#FBD90F]">Media Sosial</span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
          Dapatkan dokumentasi terbaru, informasi kegiatan, dan perkembangan
          wisata Alas Watu Kebonan melalui kanal resmi kami.
        </p>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {(contact.social_links?.length
        ? contact.social_links
        : [
            {
              id: 1,
              platform: "Instagram",
              username: "@alaswatukebonan",
              url: "#",
            },
            {
              id: 2,
              platform: "YouTube",
              username: "Alas Watu Kebonan",
              url: "#",
            },
            {
              id: 3,
              platform: "Website",
              username: "Siwatu",
              url: "#",
            },
          ]
      ).map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-white/10
            p-6
            shadow-lg
            shadow-black/20
            backdrop-blur
            transition-all
            duration-500
            hover:-translate-y-2
            hover:bg-white
            hover:text-[#00532B]
          "
        >
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FBD90F]/20 blur-2xl transition group-hover:bg-[#FBD90F]/40" />

          <div className="relative">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FBD90F] text-2xl font-black text-[#00532B]">
              {social.platform.slice(0, 1)}
            </div>

            <h3 className="text-xl font-black">{social.platform}</h3>

            <p className="mt-2 text-sm text-white/55 transition group-hover:text-[#00532B]/70">
              {social.username}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#FBD90F] transition group-hover:text-[#00532B]">
              Kunjungi
              <span>→</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

{/* DIGITAL MAP */}
<section className="relative overflow-hidden bg-[#f7f6eb] px-6 py-10">
  <div className="pointer-events-none absolute inset-0 opacity-60">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-16">
    <div className="lg:col-span-6">
      <SectionBadge>Peta Digital</SectionBadge>

      <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
        Jelajahi Area Wisata{" "}
        <span className="text-[#19B64F]">Secara Digital</span>
      </h2>

      <p className="mt-5 max-w-xl text-sm leading-8 text-zinc-600 md:text-base">
        Peta digital membantu pengunjung memahami titik-titik penting, area
        jelajah, spot foto, flora, bebatuan, dan potensi kawasan wisata.
      </p>

      <div className="mt-8 rounded-[34px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5">
        <div className="relative h-[320px] overflow-hidden rounded-[28px] bg-[#08210f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,217,15,0.15),_transparent_55%)]" />

          <div className="absolute left-12 top-20 h-28 w-28 rounded-full bg-[#19B64F]/25" />
          <div className="absolute left-44 top-10 h-32 w-32 rounded-full bg-[#19B64F]/20" />
          <div className="absolute bottom-10 right-20 h-28 w-28 rounded-full bg-[#FBD90F]/25" />

          <div className="absolute left-20 top-40 h-4 w-4 rounded-full bg-[#FBD90F] shadow-lg shadow-[#FBD90F]/40" />
          <div className="absolute left-56 top-32 h-4 w-4 rounded-full bg-[#FBD90F] shadow-lg shadow-[#FBD90F]/40" />
          <div className="absolute bottom-24 right-32 h-4 w-4 rounded-full bg-[#FBD90F] shadow-lg shadow-[#FBD90F]/40" />

          <div className="absolute bottom-5 left-5 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-white backdrop-blur">
            WebGIS Preview
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-end lg:col-span-6">
      <div className="w-full rounded-[34px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#19B64F]">
          Overlay Peta
        </p>

        <h3 className="mt-3 text-2xl font-black text-[#00532B]">
          Informasi Titik Wisata
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Area titik wisata dapat dikembangkan dengan data koordinat, jalur
          jelajah, dan informasi lokasi agar pengunjung lebih mudah memahami
          kawasan.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {["Titik Bebatuan", "Spot Foto", "Area Flora", "Jalur Wisata"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#00532B]/10 bg-[#f7f6eb] p-4 text-sm font-black text-[#00532B] transition hover:bg-[#00532B] hover:text-white"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  </div>
</section>

{/* CONTACT */}
<section
  id="contact"
  className="relative overflow-hidden bg-[#f7f6eb] px-6 py-10"
>
  <div className="pointer-events-none absolute inset-0 opacity-60">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
    <div className="mb-12 text-center">
      <SectionBadge>Hubungi Kami</SectionBadge>

      <h2 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
        Ada Pertanyaan?{" "}
        <span className="text-[#19B64F]">Kami Siap Membantu</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-zinc-600 md:text-base">
        Hubungi admin untuk informasi reservasi, jam operasional, lokasi wisata,
        dan kebutuhan kunjungan ke Alas Watu Kebonan.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00532B] text-xl font-black text-white">
          WA
        </div>

        <p className="text-sm font-black text-[#19B64F]">WhatsApp Admin</p>

        <h3 className="mt-2 text-xl font-black text-[#00532B]">
          {contact.whatsapp?.display ?? "+62 XXX-XXXX-XXXX"}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {contact.whatsapp?.response_time ?? "Respon cepat jam operasional"}
        </p>
      </div>

      <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBD90F] text-xl font-black text-[#00532B]">
          ⏱
        </div>

        <p className="text-sm font-black text-[#19B64F]">Jam Operasional</p>

        <h3 className="mt-2 text-xl font-black text-[#00532B]">
          {contact.operational?.hours ?? "08.00 - 17.00 WIB"}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {contact.operational?.note ?? "Senin - Minggu"}
        </p>
      </div>

      <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19B64F] text-xl font-black text-white">
          📍
        </div>

        <p className="text-sm font-black text-[#19B64F]">Lokasi Wisata</p>

        <h3 className="mt-2 text-xl font-black text-[#00532B]">
          {contact.location?.name ?? "Desa Kebonan"}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {contact.location?.address ?? "Boyolali, Jawa Tengah"}
        </p>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}