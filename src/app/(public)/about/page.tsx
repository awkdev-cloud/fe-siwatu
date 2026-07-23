import Link from "next/link";

const heroImage = "/images/hero/hero_1.jpg";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f6eb] text-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08210f] px-6 py-10 text-white">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tentang Alas Watu Kebonan"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <SectionBadge variant="dark">Tentang Kami</SectionBadge>

            <h1 className="mt-3 font-serif text-5xl font-black leading-tight md:text-7xl">
              Surga Alam Kecil di{" "}
              <span className="text-[#FBD90F]">Desa Kebonan</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              Alas Watu Kebonan adalah kawasan wisata berbasis potensi lokal
              yang menggabungkan alam, edukasi, katalog digital, dan identitas
              desa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#about"
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

      {/* CONTENT */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#19B64F]/15 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#FBD90F]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionBadge>Profil Wisata</SectionBadge>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-[#00532B] md:text-5xl">
                Alam, Edukasi, dan{" "}
                <span className="text-[#19B64F]">Identitas Lokal</span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-zinc-600 md:text-base">
                Alas Watu Kebonan dikembangkan sebagai ruang wisata yang
                memanfaatkan kekayaan alam desa, keunikan bebatuan, dan
                revitalisasi tanaman sebagai daya tarik utama. Melalui website
                Siwatu, informasi wisata dapat diakses lebih mudah oleh
                pengunjung.
              </p>

              <p className="mt-4 text-sm leading-8 text-zinc-600 md:text-base">
                Website ini juga mendukung pengembangan katalog digital, QR
                code, dokumentasi galeri, serta informasi reservasi agar
                pengelolaan wisata menjadi lebih modern dan informatif.
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

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-3xl font-black text-[#00532B]">100%</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-zinc-500">
                    Berbasis potensi lokal desa
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-3xl font-black text-[#00532B]">7+</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-zinc-500">
                    Daya tarik wisata dan edukasi
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[36px] border border-[#00532B]/10 bg-white shadow-2xl shadow-[#00532B]/10">
                <div className="relative h-[460px]">
                  <img
                    src={heroImage}
                    alt="Alas Watu Kebonan"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#00532B]/90 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FBD90F]">
                      Siwatu
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-white">
                      Desa Wisata Digital
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
                      Menghubungkan informasi wisata, katalog alam, galeri, dan
                      reservasi dalam satu platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Wisata Berbasis Alam",
                desc: "Menonjolkan potensi alam lokal Desa Kebonan.",
                icon: "🌿",
              },
              {
                title: "Katalog Digital",
                desc: "Flora dan bebatuan dapat diakses melalui QR.",
                icon: "◈",
              },
              {
                title: "Reservasi Mudah",
                desc: "Informasi kunjungan tersedia melalui WhatsApp.",
                icon: "☎",
              },
              {
                title: "Edukasi Lokal",
                desc: "Mengangkat identitas alam, budaya, dan desa.",
                icon: "✓",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FBD90F] text-xl text-[#00532B]">
                  {item.icon}
                </div>

                <h3 className="text-sm font-black text-[#00532B]">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-zinc-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}