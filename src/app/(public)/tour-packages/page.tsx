import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { fetchApi } from "@/lib/api";

type TourPackage = {
  id: number;
  title: string;
  package_type?: string;
  package_type_uppercase?: string;
  highlight_label?: string;
  description?: string;
  facilities?: string[];
  duration?: string;
  price_formatted?: string;
};

type TourPackageResponse = {
  message: string;
  data: TourPackage[];
};

export default async function TourPackagesPage() {
  const packages = await fetchApi<TourPackageResponse>("/tour-packages");

  return (
    <Container>
      <SectionTitle
        eyebrow="Paket Wisata"
        title="Pilihan Paket Kunjungan"
        description="Daftar paket wisata yang dapat dipilih pengunjung."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {packages.data.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border bg-slate-950 p-6 text-white shadow-sm"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {item.package_type_uppercase && (
                <span className="rounded-full bg-green-900 px-4 py-1 text-xs font-bold uppercase text-green-300">
                  {item.package_type_uppercase}
                </span>
              )}
              {item.highlight_label && (
                <span className="rounded-full bg-yellow-900 px-4 py-1 text-xs font-bold text-yellow-300">
                  {item.highlight_label}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold">{item.title}</h2>

            {item.description && (
              <p className="mt-3 text-slate-300">{item.description}</p>
            )}

            {item.facilities && item.facilities.length > 0 && (
              <ul className="mt-5 space-y-2 text-slate-200">
                {item.facilities.map((facility) => (
                  <li key={facility}>✓ {facility}</li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400">Mulai dari</p>
                <p className="text-2xl font-bold text-green-400">
                  {item.price_formatted}
                </p>
                {item.duration && (
                  <p className="mt-1 text-sm text-slate-400">
                    Durasi {item.duration}
                  </p>
                )}
              </div>

              <button className="rounded-full bg-green-600 px-5 py-3 font-semibold text-white">
                Pilih Paket
              </button>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}