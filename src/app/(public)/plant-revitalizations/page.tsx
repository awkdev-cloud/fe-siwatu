import Link from "next/link";

type ApiResponse<T> = {
  message?: string;
  data: T;
};

type Plant = {
  id: number;
  name: string;
  scientific_name?: string;
  description?: string;
  image_url?: string;
  qr_code_url?: string;
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

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-[#FBD90F]" />
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-700">
        {children}
      </span>
    </div>
  );
}

export default async function PlantRevitalizationsPage() {
  const plants = await fetchApi<Plant[]>("/plant-revitalizations", []);

  return (
    <main className="min-h-screen bg-[#f7f6eb] text-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Katalog Flora Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge>Katalog Flora</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Flora <span className="text-[#FBD90F]">Kebonan</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Jelajahi daftar tanaman revitalisasi yang menjadi bagian dari
              katalog digital dan edukasi alam di kawasan Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#flora"
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

      {/* LIST FLORA */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionBadge>Daftar Flora</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
                Semua Flora <span className="text-[#19B64F]">Revitalisasi</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600 md:text-base">
                Informasi tanaman yang didokumentasikan sebagai bagian dari
                pengembangan wisata, edukasi, dan katalog digital Siwatu.
              </p>
            </div>

            <p className="w-fit rounded-full border border-[#00532B]/10 bg-white px-5 py-3 text-sm font-black text-[#00532B] shadow-sm">
              {plants.length} Flora Tersedia
            </p>
          </div>

          {plants.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {plants.map((plant) => (
                <article
                  key={plant.id}
                  className="group relative overflow-hidden rounded-[30px] border border-[#00532B]/10 bg-white shadow-lg shadow-[#00532B]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15"
                >
                  <div className="relative h-[190px] overflow-hidden bg-[#00532B]">
                    <img
                      src={plant.image_url ?? heroImage}
                      alt={plant.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/75 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B] backdrop-blur">
                      Flora
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#00532B]">
                      {plant.name}
                    </h3>

                    <p className="mt-2 line-clamp-1 text-sm italic text-zinc-500">
                      {plant.scientific_name ?? "Nama ilmiah belum tersedia"}
                    </p>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-600">
                      {plant.description ?? "Deskripsi tanaman belum tersedia."}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#00532B]/10 pt-4">
                      <span className="text-xs font-black uppercase tracking-wider text-[#19B64F]">
                        Katalog Digital
                      </span>

                      <Link
                        href={`/plant-revitalizations/${plant.id}`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBD90F] text-lg font-black text-[#00532B] transition group-hover:translate-x-1 hover:bg-[#00532B] hover:text-white"
                        aria-label={`Pelajari ${plant.name}`}
                      >
                        →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-8 text-center shadow-lg shadow-[#00532B]/5">
              <p className="text-lg font-black text-[#00532B]">
                Data flora belum tersedia.
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Silakan tambahkan data flora melalui halaman admin.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}