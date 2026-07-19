import Link from "next/link";

type ApiResponse<T> = {
  message?: string;
  data: T;
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

const API_BASE_URL = process.env.API_BASE_URL;
const heroImage = "/images/hero/hero_1.jpg";

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

function SectionBadge({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-[#FBD90F]" />
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
  return item.title ?? item.name ?? "Paket Wisata";
}

export default async function PackagesPage() {
  const packages = await fetchApi<TourPackage[]>("/tour-packages", []);

  return (
    <main className="min-h-screen bg-[#08210f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Paket Wisata Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge>Paket Wisata</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Pilih Pengalaman{" "}
              <span className="text-[#FBD90F]">Terbaik</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Temukan pilihan paket wisata untuk kunjungan keluarga, rombongan,
              edukasi, dokumentasi, dan kegiatan khusus di Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#packages"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBD90F] px-7 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
              >
                ← Kembali ke Beranda
              </Link>

              <Link
                href="/#reservation"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
              >
                Reservasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGE LIST */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionBadge>Pilihan Paket</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                Semua Paket{" "}
                <span className="text-[#FBD90F]">Wisata</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
                Pilih paket sesuai kebutuhan kunjungan. Untuk penyesuaian
                jadwal, rombongan, atau kegiatan khusus, hubungi admin.
              </p>
            </div>

            <p className="w-fit rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur">
              {packages.length} Paket Tersedia
            </p>
          </div>

          {packages.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((item, index) => (
                <article
                  key={item.id}
                  className={`group relative overflow-hidden rounded-[34px] border p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    index === 0
                      ? "border-[#FBD90F]/40 bg-[#00532B]"
                      : "border-white/10 bg-white/10 backdrop-blur"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute right-5 top-5 rounded-full bg-[#FBD90F] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#00532B]">
                      Rekomendasi
                    </div>
                  )}

                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full text-sm font-black ${
                      index === 0
                        ? "bg-[#FBD90F] text-[#00532B]"
                        : "bg-white/10 text-[#FBD90F]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                        index === 0
                          ? "bg-white/15 text-white"
                          : "bg-[#19B64F]/15 text-[#19B64F]"
                      }`}
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
                      .slice(0, 5)
                      .map((facility) => (
                        <li
                          key={facility}
                          className="flex items-start gap-3 text-sm font-semibold text-white/75"
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                              index === 0
                                ? "bg-[#FBD90F] text-[#00532B]"
                                : "bg-white/10 text-[#FBD90F]"
                            }`}
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
                          className={`text-2xl font-black ${
                            index === 0 ? "text-[#FBD90F]" : "text-white"
                          }`}
                        >
                          {item.price_formatted ?? "Hubungi Admin"}
                        </p>

                        {item.duration && (
                          <p className="mt-1 text-xs font-semibold text-white/45">
                            Durasi {item.duration}
                          </p>
                        )}
                      </div>

                      <Link
                        href="/#reservation"
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-black transition group-hover:translate-x-1 ${
                          index === 0
                            ? "bg-[#FBD90F] text-[#00532B] hover:bg-white"
                            : "bg-[#19B64F] text-white hover:bg-[#FBD90F] hover:text-[#00532B]"
                        }`}
                        aria-label={`Pilih ${formatTitle(item)}`}
                      >
                        →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[30px] border border-white/10 bg-white/10 p-8 text-center shadow-lg shadow-black/20 backdrop-blur">
              <p className="text-lg font-black text-[#FBD90F]">
                Paket wisata belum tersedia.
              </p>
              <p className="mt-2 text-sm text-white/55">
                Silakan tambahkan data paket wisata melalui halaman admin.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}