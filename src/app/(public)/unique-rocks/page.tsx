import Link from "next/link";

type ApiResponse<T> = {
  message?: string;
  data: T;
};

type Rock = {
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

export default async function UniqueRocksPage() {
  const rocks = await fetchApi<Rock[]>("/unique-rocks", []);

  return (
    <main className="min-h-screen bg-[#08210f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Katalog Bebatuan Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge>Katalog Bebatuan</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Bebatuan Unik{" "}
              <span className="text-[#FBD90F]">Kebonan</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Jelajahi daftar bebatuan unik yang menjadi daya tarik visual,
              identitas kawasan, dan media edukasi alam di Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#rocks"
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

      {/* LIST ROCKS */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionBadge>Katalog Lengkap</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                Semua Bebatuan{" "}
                <span className="text-[#FBD90F]">Unik</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
                Informasi bebatuan yang didokumentasikan sebagai bagian dari
                identitas wisata dan katalog edukasi digital Siwatu.
              </p>
            </div>

            <p className="w-fit rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur">
              {rocks.length} Batu Tersedia
            </p>
          </div>

          {rocks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {rocks.map((rock) => (
                <article
                  key={rock.id}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 shadow-lg shadow-black/20 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/30"
                >
                  <div className="relative h-[190px] overflow-hidden bg-[#181818]">
                    <img
                      src={rock.image_url ?? heroImage}
                      alt={rock.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full bg-[#FBD90F] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00532B]">
                      Bebatuan
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-white">
                      {rock.name}
                    </h3>

                    <p className="mt-2 line-clamp-1 text-sm italic text-white/50">
                      {rock.scientific_name ?? "Nama ilmiah belum tersedia"}
                    </p>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/65">
                      {rock.description ?? "Deskripsi batu belum tersedia."}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <span className="text-xs font-black uppercase tracking-wider text-[#FBD90F]">
                        Edukasi Alam
                      </span>

                      <Link
                        href={`/unique-rocks/${rock.id}`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBD90F] text-lg font-black text-[#00532B] transition group-hover:translate-x-1 hover:bg-white"
                        aria-label={`Pelajari ${rock.name}`}
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
                Data bebatuan belum tersedia.
              </p>

              <p className="mt-2 text-sm text-white/55">
                Silakan tambahkan data bebatuan melalui halaman admin.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}