"use client";

import {
  Gem,
  Globe2,
  Images,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  MessageSquareText,
  Phone,
  Share2,
  Sprout,
  Tags,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import type { AdminUser } from "@/lib/admin/types";

type AdminShellProps = {
  user: AdminUser;
  children: ReactNode;
};

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Galeri", href: "/admin/galleries", icon: Images },
  { label: "Kategori Galeri", href: "/admin/gallery-categories", icon: Tags },
  { label: "Paket Wisata", href: "/admin/tour-packages", icon: MapPinned },
  { label: "Ulasan", href: "/admin/reviews", icon: MessageSquareText },
  { label: "Bebatuan Unik", href: "/admin/unique-rocks", icon: Gem },
  {
    label: "Revitalisasi Tanaman",
    href: "/admin/plant-revitalizations",
    icon: Sprout,
  },
  { label: "Kontak", href: "/admin/contact", icon: Phone },
  { label: "Media Sosial", href: "/admin/social-links", icon: Share2 },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#123c34] text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <span className="grid size-12 place-items-center rounded-2xl bg-[#d7e86a] text-sm font-black text-[#123c34] shadow-[0_10px_30px_rgba(215,232,106,.18)]">
            SW
          </span>
          <span>
            <span className="block text-lg font-black tracking-[0.08em]">
              SIWATU
            </span>
            <span className="block text-xs text-white/50">
              Alas Watu Kebonan
            </span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                    active
                      ? "bg-[#d7e86a] text-[#123c34]"
                      : "text-white/64 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="size-[18px]" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <a
          href={
            process.env.NEXT_PUBLIC_SITE_URL ??
            "https://alaswatukebonan.my.id"
          }
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/15 hover:text-white"
        >
          <Globe2 className="size-[18px]" />
          Lihat website publik
        </a>
      </div>
    </div>
  );
}

export default function AdminShell({
  user,
  children,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const pageTitle = useMemo(
    () =>
      menuItems.find((item) => isActive(pathname, item.href))?.label ??
      "Admin",
    [pathname],
  );

  async function logout() {
    setLoggingOut(true);

    try {
      await fetch("//admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/45 lg:hidden"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[min(86vw,288px)] shadow-2xl lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-xl bg-white/10"
              aria-label="Tutup menu admin"
            >
              <X className="size-5" />
            </button>
            <Sidebar
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="grid size-10 place-items-center rounded-xl border border-neutral-200 bg-white lg:hidden"
                aria-label="Buka menu admin"
              >
                <Menu className="size-5" />
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a8e81]">
                  Admin SIWATU
                </p>
                <h1 className="mt-1 text-xl font-bold">{pageTitle}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-neutral-400">{user.email}</p>
              </div>

              <span className="grid size-10 place-items-center rounded-full bg-[#e8efbf] text-sm font-bold text-[#123c34]">
                {user.name.slice(0, 1).toUpperCase()}
              </span>

              <button
                type="button"
                disabled={loggingOut}
                onClick={logout}
                className="grid size-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                aria-label="Logout"
              >
                <LogOut className="size-[18px]" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-8 sm:py-9">
          <div className="mx-auto max-w-[1480px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
