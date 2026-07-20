import Link from "next/link";
import { notFound } from "next/navigation";

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

type PageProps = {
  params: Promise<{
    id: string;
  }>;
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

export default async function RockDetailPage({ params }: PageProps) {
  const { id } = await params;

  const rock = await fetchApi<Rock | null>(`/unique-rocks/${id}`, null);

  if (!rock) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08210f] text-white">
      {/* HERO DETAIL */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={rock.image_url ?? heroImage}
            alt={rock.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge>Detail Bebatuan</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              {rock.name}
            </h1>

            <p className="mt-4 text-lg italic text-[#FBD90F]">
              {rock.scientific_name ?? "Nama ilmiah belum tersedia"}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Informasi detail bebatuan unik sebagai bagian dari katalog digital
              dan daya tarik edukatif Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#rocks"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBD90F] px-7 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
              >
                ← Kembali ke Bebatuan
              </Link>

              <Link
                href="/unique-rocks"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
              >
                Lihat Semua Batu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-16">
          {/* Main Description */}
          <div className="lg:col-span-7">
            <div className="rounded-[34px] border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/20 backdrop-blur md:p-8">
              <SectionBadge>Informasi Bebatuan</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
                Mengenal{" "}
                <span className="text-[#FBD90F]">{rock.name}</span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-white/70 md:text-base">
                {rock.description ??
                  "Deskripsi batu belum tersedia. Informasi ini dapat dikembangkan sebagai bagian dari katalog bebatuan digital Alas Watu Kebonan."}
              </p>
            </div>
          </div>

          {/* Side Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/10 shadow-lg shadow-black/20 backdrop-blur">
              <div className="relative h-[320px] overflow-hidden bg-[#181818]">
                <img
                  src={rock.image_url ?? heroImage}
                  alt={rock.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-[#FBD90F] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#00532B]">
                  Bebatuan Kebonan
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FBD90F]">
                  Nama Bebatuan
                </p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  {rock.name}
                </h3>

                <p className="mt-2 text-sm italic text-white/50">
                  {rock.scientific_name ?? "Nama ilmiah belum tersedia"}
                </p>

                {rock.qr_code_url && (
                  <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-5">
                    <p className="mb-4 text-sm font-black text-[#FBD90F]">
                      QR Code Katalog
                    </p>

                    <img
                      src={rock.qr_code_url}
                      alt={`QR Code ${rock.name}`}
                      className="mx-auto h-36 w-36 object-contain"
                    />
                  </div>
                )}

                <Link
                  href="/#reservation"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FBD90F] px-6 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Reservasi Kunjungan
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}