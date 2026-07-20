import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

type DashboardMetric = {
  total: number;
  active?: number;
  inactive?: number;
  published?: number;
  draft?: number;
  featured?: number;
};

type DashboardData = {
  galleries: DashboardMetric;
  gallery_categories: DashboardMetric;
  reviews: DashboardMetric;
  tour_packages: DashboardMetric;
  social_links: DashboardMetric;
  unique_rocks: DashboardMetric;
  plant_revitalizations: DashboardMetric;
};

type DashboardResponse = {
  message: string;
  data: DashboardData;
};

async function getDashboardData(): Promise<DashboardData> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    ADMIN_TOKEN_COOKIE,
  )?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL belum dikonfigurasi.",
    );
  }

  const response = await fetch(
    `${apiBaseUrl.replace(/\/+$/, "")}/admin/dashboard`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  /*
   * Token sudah tidak valid atau telah dicabut.
   */
  if (
    response.status === 401 ||
    response.status === 403
  ) {
    redirect("/admin/login");
  }

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Dashboard API error:",
      response.status,
      errorText,
    );

    throw new Error(
      `Dashboard gagal dimuat. Status ${response.status}.`,
    );
  }

  const payload =
    (await response.json()) as DashboardResponse;

  return payload.data;
}

const dashboardCards = [
  {
    key: "galleries",
    label: "Galeri",
    href: "/admin/galleries",
  },
  {
    key: "gallery_categories",
    label: "Kategori Galeri",
    href: "/admin/gallery-categories",
  },
  {
    key: "reviews",
    label: "Ulasan",
    href: "/admin/reviews",
  },
  {
    key: "tour_packages",
    label: "Paket Wisata",
    href: "/admin/tour-packages",
  },
  {
    key: "social_links",
    label: "Media Sosial",
    href: "/admin/social-links",
  },
  {
    key: "unique_rocks",
    label: "Bebatuan Unik",
    href: "/admin/unique-rocks",
  },
  {
    key: "plant_revitalizations",
    label: "Revitalisasi Tanaman",
    href: "/admin/plant-revitalizations",
  },
] satisfies Array<{
  key: keyof DashboardData;
  label: string;
  href: string;
}>;

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div>
      <section className="relative overflow-hidden rounded-[30px] bg-[#123c34] px-7 py-9 text-white shadow-sm sm:px-10">
        <div className="absolute -right-28 -top-32 size-80 rounded-full border-[58px] border-[#d7e86a]/15" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7e86a]">
            Ringkasan Pengelolaan
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Kelola informasi Alas Watu Kebonan dari satu tempat.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Pantau jumlah konten, status publikasi, dan
            informasi wisata yang tampil pada website.
          </p>
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const metric = dashboard[card.key];

          return (
            <a
              key={card.key}
              href={card.href}
              className="rounded-[22px] border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#638c7d]">
                {card.label}
              </p>

              <p className="mt-5 text-3xl font-bold text-neutral-950">
                {metric.total}
              </p>

              <div className="mt-3 text-xs leading-5 text-neutral-400">
                {metric.published !== undefined && (
                  <p>
                    {metric.published} dipublikasikan
                  </p>
                )}

                {metric.draft !== undefined && (
                  <p>{metric.draft} draft</p>
                )}

                {metric.active !== undefined && (
                  <p>{metric.active} aktif</p>
                )}

                {metric.inactive !== undefined && (
                  <p>{metric.inactive} nonaktif</p>
                )}

                {metric.featured !== undefined && (
                  <p>{metric.featured} unggulan</p>
                )}
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
}