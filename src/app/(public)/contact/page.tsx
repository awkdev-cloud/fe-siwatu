import Link from "next/link";

type ApiResponse<T> = {
  message?: string;
  data: T;
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

export default async function ContactPage() {
  const contact = await fetchApi<Contact>("/contact", {});

  const socialLinks =
    contact.social_links?.length
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
        ];

  return (
    <main className="min-h-screen bg-[#f7f6eb] text-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Kontak Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge variant="dark">Hubungi Kami</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Ada Pertanyaan?{" "}
              <span className="text-[#FBD90F]">Kami Siap Membantu</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Hubungi admin untuk informasi reservasi, jam operasional, lokasi
              wisata, dan kebutuhan kunjungan ke Alas Watu Kebonan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBD90F] px-7 py-4 text-sm font-black text-[#00532B] transition hover:-translate-y-0.5 hover:bg-white"
              >
                ← Kembali ke Beranda
              </Link>

              <a
                href={contact.whatsapp?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#00532B]"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionBadge>Informasi Kontak</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
                Hubungi Admin{" "}
                <span className="text-[#19B64F]">Wisata</span>
              </h2>

              <p className="mt-5 text-sm leading-8 text-zinc-600 md:text-base">
                Untuk reservasi, informasi paket, dokumentasi kegiatan, atau
                kebutuhan kunjungan lainnya, pengunjung dapat menghubungi admin
                melalui WhatsApp.
              </p>

              <a
                href={contact.whatsapp?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#00532B] px-7 py-4 text-sm font-black text-white shadow-lg shadow-[#00532B]/20 transition hover:-translate-y-0.5 hover:bg-[#19B64F]"
              >
                Chat Admin Sekarang
                <span>→</span>
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00532B] text-xl font-black text-white">
                    WA
                  </div>

                  <p className="text-sm font-black text-[#19B64F]">
                    WhatsApp Admin
                  </p>

                  <h3 className="mt-2 text-xl font-black text-[#00532B]">
                    {contact.whatsapp?.display ?? "+62 XXX-XXXX-XXXX"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {contact.whatsapp?.response_time ??
                      "Respon cepat jam operasional"}
                  </p>
                </div>

                <div className="rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBD90F] text-xl font-black text-[#00532B]">
                    ⏱
                  </div>

                  <p className="text-sm font-black text-[#19B64F]">
                    Jam Operasional
                  </p>

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

                  <p className="text-sm font-black text-[#19B64F]">
                    Lokasi Wisata
                  </p>

                  <h3 className="mt-2 text-xl font-black text-[#00532B]">
                    {contact.location?.name ?? "Desa Kebonan"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {contact.location?.address ?? "Boyolali, Jawa Tengah"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MAP + SOCIAL */}
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[34px] border border-[#00532B]/10 bg-white p-4 shadow-lg shadow-[#00532B]/5">
                {contact.location?.google_maps_embed_url ? (
                  <iframe
                    src={contact.location.google_maps_embed_url}
                    className="h-[420px] w-full rounded-[26px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center rounded-[26px] bg-[#08210f] text-center text-white">
                    <div>
                      <p className="text-2xl font-black text-[#FBD90F]">
                        Peta Lokasi
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Embed Google Maps belum tersedia.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[34px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 md:p-8">
                <SectionBadge>Media Sosial</SectionBadge>

                <h3 className="mt-3 text-3xl font-black text-[#00532B]">
                  Ikuti Update Kami
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  Dapatkan dokumentasi terbaru dan informasi kegiatan wisata
                  melalui kanal resmi Alas Watu Kebonan.
                </p>

                <div className="mt-7 space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-[#00532B]/10 bg-[#f7f6eb] p-4 transition hover:bg-[#00532B] hover:text-white"
                    >
                      <div>
                        <p className="text-sm font-black">
                          {social.platform}
                        </p>

                        <p className="mt-1 text-xs opacity-70">
                          {social.username}
                        </p>
                      </div>

                      <span className="text-lg font-black">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}