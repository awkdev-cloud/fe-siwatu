"use client";

import {
  Eye,
  EyeOff,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useState,
} from "react";

type LoginResponse = {
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  errors?: Record<string, string[]>;
};

export default function AdminLoginPage() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] =
    useState<string | null>(null);

  async function submit(
  event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/admin/auth/login",
        {
          method: "POST",
          cache: "no-store",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      );

      const payload = (await response
        .json()
        .catch(() => ({
          message: "Respons server tidak dapat dibaca.",
        }))) as {
        message?: string;
        authenticated?: boolean;
        user?: {
          id: number;
          name: string;
          email: string;
          role: string;
        };
      };

      if (!response.ok) {
        throw new Error(
          payload.message ??
            "Email atau password salah.",
        );
      }

      if (!payload.authenticated) {
        throw new Error(
          "Status autentikasi tidak valid.",
        );
      }

      /*
      * Lakukan full navigation setelah cookie
      * autentikasi diterima browser.
      */
      window.location.replace("/admin/dashboard");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login admin gagal.",
      );

      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-[#f1f3eb] lg:grid-cols-[1.08fr_.92fr]">
      <section className="relative hidden overflow-hidden bg-[#123c34] px-16 py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -right-44 -top-44 size-[560px] rounded-full border-[90px] border-[#d7e86a]/15"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-32 size-[500px] rounded-full bg-[#d7e86a]/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#d7e86a] text-[#123c34]">
            <Leaf className="size-6" />
          </span>

          <div>
            <p className="text-xl font-black tracking-[0.08em]">
              SIWATU
            </p>

            <p className="text-xs text-white/50">
              Alas Watu Kebonan
            </p>
          </div>
        </div>

        <div className="relative max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e86a]">
            Sistem Pengelolaan Konten
          </p>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.08] tracking-[-0.045em]">
            Informasi wisata yang rapi dimulai dari
            dashboard yang sederhana.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
            Kelola galeri, paket wisata, ulasan,
            katalog alam, kontak, dan media sosial
            Alas Watu Kebonan.
          </p>
        </div>

        <p className="relative text-xs text-white/35">
          © 2026 SIWATU · Desa Kebonan
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md rounded-[30px] border border-white/80 bg-white p-7 shadow-[0_28px_90px_rgba(18,60,52,.13)] sm:p-9">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#d7e86a] text-[#123c34]">
              <Leaf className="size-5" />
            </span>

            <div>
              <p className="font-black tracking-[0.08em] text-[#123c34]">
                SIWATU
              </p>

              <p className="text-xs text-neutral-400">
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="mt-9 lg:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b8e81]">
              Selamat datang
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em]">
              Masuk sebagai admin
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Gunakan akun administrator yang telah
              terdaftar pada backend SIWATU.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="mt-8 space-y-5"
          >
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">
                Email
              </span>

              <span className="relative mt-2 block">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-neutral-400" />

                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  disabled={submitting}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@siwatu.com"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">
                Password
              </span>

              <span className="relative mt-2 block">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-neutral-400" />

                <input
                  required
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  value={password}
                  disabled={submitting}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Masukkan password"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-12 text-sm outline-none transition focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6] disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    setShowPassword(
                      (current) => !current,
                    )
                  }
                  className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-40"
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-[18px]" />
                  ) : (
                    <Eye className="size-[18px]" />
                  )}
                </button>
              </span>
            </label>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123c34] text-sm font-semibold text-white transition hover:bg-[#205247] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <LoaderCircle className="size-[18px] animate-spin" />
              )}

              {submitting
                ? "Memproses..."
                : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}