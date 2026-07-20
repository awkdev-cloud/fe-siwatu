import Link from "next/link";
import { notFound } from "next/navigation";

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

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-[#FBD90F]" />
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#19B64F]">
        {children}
      </span>
    </div>
  );
}

export default async function PlantDetailPage({ params }: PageProps) {
  const { id } = await params;

  const plant = await fetchApi<Plant | null>(
    `/plant-revitalizations/${id}`,
    null,
  );

  if (!plant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f6eb] text-zinc-950">
      {/* HERO DETAIL */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={plant.image_url ?? heroImage}
            alt={plant.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge>Detail Flora</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              {plant.name}
            </h1>

            <p className="mt-4 text-lg italic text-[#FBD90F]">
              {plant.scientific_name ?? "Nama ilmiah belum tersedia"}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Informasi detail tanaman revitalisasi yang menjadi bagian dari
              katalog digital Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#flora"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBD90F] px-7 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
              >
                ← Kembali ke Flora
              </Link>

              <Link
                href="/plant-revitalizations"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
              >
                Lihat Semua Flora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-16">
          {/* Main Description */}
          <div className="lg:col-span-7">
            <div className="rounded-[34px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 md:p-8">
              <SectionBadge>Informasi Tanaman</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
                Mengenal{" "}
                <span className="text-[#19B64F]">{plant.name}</span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-zinc-600 md:text-base">
                {plant.description ??
                  "Deskripsi tanaman belum tersedia. Informasi ini dapat dikembangkan sebagai bagian dari katalog flora digital Alas Watu Kebonan."}
              </p>
            </div>
          </div>

          {/* Side Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[34px] border border-[#00532B]/10 bg-white shadow-lg shadow-[#00532B]/5">
              <div className="relative h-[320px] overflow-hidden bg-[#00532B]">
                <img
                  src={plant.image_url ?? heroImage}
                  alt={plant.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/70 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#00532B] backdrop-blur">
                  Flora Kebonan
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#19B64F]">
                  Nama Flora
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#00532B]">
                  {plant.name}
                </h3>

                <p className="mt-2 text-sm italic text-zinc-500">
                  {plant.scientific_name ?? "Nama ilmiah belum tersedia"}
                </p>

                {plant.qr_code_url && (
                  <div className="mt-6 rounded-[24px] border border-[#00532B]/10 bg-[#f7f6eb] p-5">
                    <p className="mb-4 text-sm font-black text-[#00532B]">
                      QR Code Katalog
                    </p>

                    <img
                      src={plant.qr_code_url}
                      alt={`QR Code ${plant.name}`}
                      className="mx-auto h-36 w-36 object-contain"
                    />
                  </div>
                )}

                <Link
                  href="/#reservation"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#00532B] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#19B64F]"
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