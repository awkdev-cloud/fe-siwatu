import Link from "next/link";

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
  variant = "light",
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
  return item.title ?? item.name ?? "Galeri Alas Watu";
}

export default async function GalleriesPage() {
  const galleries = await fetchApi<Gallery[]>("/galleries", []);

  return (
    <main className="min-h-screen bg-[#f7f6eb] text-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Galeri Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge variant="dark">Galeri Wisata</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Keindahan{" "}
              <span className="text-[#FBD90F]">Alas Watu Kebonan</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Dokumentasi suasana kawasan, aktivitas wisata, flora, bebatuan,
              dan potensi alam Desa Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#gallery"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBD90F] px-7 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
              >
                ← Kembali ke Beranda
              </Link>

              <Link
                href="/#reservation"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
              >
                Reservasi Kunjungan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY LIST */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionBadge>Dokumentasi</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
                Semua Galeri{" "}
                <span className="text-[#19B64F]">Wisata</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600 md:text-base">
                Kumpulan dokumentasi visual kawasan wisata Alas Watu Kebonan
                sebagai media promosi dan arsip potensi desa.
              </p>
            </div>

            <p className="w-fit rounded-full border border-[#00532B]/10 bg-white px-5 py-3 text-sm font-black text-[#00532B] shadow-sm">
              {galleries.length} Foto Tersedia
            </p>
          </div>

          {galleries.length > 0 ? (
            <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {galleries.map((item, index) => (
                <article
                  key={item.id}
                  className={`group relative overflow-hidden rounded-[30px] bg-[#00532B] shadow-lg shadow-[#00532B]/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/20 ${
                    index % 7 === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  } ${index % 7 === 3 ? "lg:row-span-2" : ""}`}
                >
                  <img
                    src={item.image_url ?? heroImage}
                    alt={formatTitle(item)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/95 via-[#00532B]/25 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B] backdrop-blur">
                    {item.category?.name ?? "Alas Watu"}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-black leading-tight text-white">
                      {formatTitle(item)}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
                      {item.description ??
                        "Dokumentasi potensi alam dan suasana kawasan Alas Watu Kebonan."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-8 text-center shadow-lg shadow-[#00532B]/5">
              <p className="text-lg font-black text-[#00532B]">
                Galeri belum tersedia.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Silakan tambahkan data galeri melalui halaman admin.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}