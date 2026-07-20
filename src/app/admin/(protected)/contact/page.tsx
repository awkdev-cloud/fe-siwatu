"use client";

import {
  LoaderCircle,
  MapPin,
  MessageCircle,
  Save,
  Timer,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { adminRequest } from "@/lib/admin/client-api";

type ContactResponse = {
  message?: string;
  data?: {
    whatsapp?: {
      title?: string | null;
      number?: string | null;
      display?: string | null;
      response_time?: string | null;
      message?: string | null;
    };
    operational?: {
      title?: string | null;
      hours?: string | null;
      note?: string | null;
    };
    location?: {
      title?: string | null;
      name?: string | null;
      address?: string | null;
      google_maps_url?: string | null;
      google_maps_embed_url?: string | null;
    };
    helper?: {
      title?: string | null;
      description?: string | null;
      button_text?: string | null;
    };
    is_active?: boolean;
  };
};

const emptyForm = {
  whatsapp_title: "",
  whatsapp_number: "",
  whatsapp_display: "",
  whatsapp_response_time: "",
  whatsapp_message: "",
  operational_title: "",
  operational_hours: "",
  operational_note: "",
  location_title: "",
  location_name: "",
  location_address: "",
  google_maps_url: "",
  google_maps_embed_url: "",
  helper_title: "",
  helper_description: "",
  helper_button_text: "",
  is_active: true,
};

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContact() {
      setLoading(true);
      setError(null);

      try {
        const response =
          await adminRequest<ContactResponse>("contact");
        const data = response.data;

        if (!cancelled && data) {
          setForm({
            whatsapp_title: data.whatsapp?.title ?? "",
            whatsapp_number: data.whatsapp?.number ?? "",
            whatsapp_display: data.whatsapp?.display ?? "",
            whatsapp_response_time:
              data.whatsapp?.response_time ?? "",
            whatsapp_message: data.whatsapp?.message ?? "",
            operational_title: data.operational?.title ?? "",
            operational_hours: data.operational?.hours ?? "",
            operational_note: data.operational?.note ?? "",
            location_title: data.location?.title ?? "",
            location_name: data.location?.name ?? "",
            location_address: data.location?.address ?? "",
            google_maps_url:
              data.location?.google_maps_url ?? "",
            google_maps_embed_url:
              data.location?.google_maps_embed_url ?? "",
            helper_title: data.helper?.title ?? "",
            helper_description:
              data.helper?.description ?? "",
            helper_button_text:
              data.helper?.button_text ?? "",
            is_active: data.is_active ?? true,
          });
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Data kontak gagal dimuat.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadContact();

    return () => {
      cancelled = true;
    };
  }, []);

  function update(
    name: keyof typeof form,
    value: string | boolean,
  ) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);

    try {
      const response = await adminRequest<{ message?: string }>(
        "contact",
        {
          method: "PATCH",
          body: JSON.stringify(form),
        },
      );

      setNotice(
        response.message ?? "Data kontak berhasil diperbarui.",
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Data kontak gagal disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  const sections = [
    {
      title: "WhatsApp Admin",
      icon: MessageCircle,
      fields: [
        ["whatsapp_title", "Judul", "text"],
        ["whatsapp_number", "Nomor WhatsApp", "text"],
        ["whatsapp_display", "Nomor tampilan", "text"],
        ["whatsapp_response_time", "Waktu respons", "text"],
        ["whatsapp_message", "Pesan otomatis", "textarea"],
      ],
    },
    {
      title: "Jam Operasional",
      icon: Timer,
      fields: [
        ["operational_title", "Judul", "text"],
        ["operational_hours", "Jam operasional", "text"],
        ["operational_note", "Catatan", "text"],
      ],
    },
    {
      title: "Lokasi Wisata",
      icon: MapPin,
      fields: [
        ["location_title", "Judul", "text"],
        ["location_name", "Nama lokasi", "text"],
        ["location_address", "Alamat", "textarea"],
        ["google_maps_url", "URL Google Maps", "url"],
        [
          "google_maps_embed_url",
          "URL embed Google Maps",
          "text",
        ],
      ],
    },
  ] as const;

  return (
    <div>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638c7d]">
          Pengaturan informasi
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
          Kontak dan Lokasi
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
          Perbarui nomor WhatsApp, jam operasional, lokasi, peta, dan
          ajakan bantuan yang ditampilkan kepada pengunjung.
        </p>
      </section>

      {notice && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {notice}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-7 rounded-[24px] bg-white px-5 py-16 text-center shadow-sm">
          <LoaderCircle className="mx-auto size-7 animate-spin text-[#315d4e]" />
          <p className="mt-3 text-sm text-neutral-500">
            Memuat pengaturan kontak...
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#edf3cf] text-[#315d4e]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold">
                    {section.title}
                  </h3>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {section.fields.map(([name, label, type]) => (
                    <label
                      key={name}
                      className={
                        type === "textarea"
                          ? "block sm:col-span-2"
                          : "block"
                      }
                    >
                      <span className="text-sm font-semibold text-neutral-700">
                        {label}
                      </span>

                      {type === "textarea" ? (
                        <textarea
                          value={String(form[name])}
                          onChange={(event) =>
                            update(name, event.target.value)
                          }
                          rows={4}
                          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
                        />
                      ) : (
                        <input
                          type={type}
                          value={String(form[name])}
                          onChange={(event) =>
                            update(name, event.target.value)
                          }
                          className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Bantuan dan status tampilan
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">
                  Judul bantuan
                </span>
                <input
                  value={form.helper_title}
                  onChange={(event) =>
                    update("helper_title", event.target.value)
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">
                  Teks tombol
                </span>
                <input
                  value={form.helper_button_text}
                  onChange={(event) =>
                    update("helper_button_text", event.target.value)
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-neutral-700">
                  Deskripsi bantuan
                </span>
                <textarea
                  rows={4}
                  value={form.helper_description}
                  onChange={(event) =>
                    update("helper_description", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 sm:col-span-2">
                <span>
                  <span className="block text-sm font-semibold">
                    Tampilkan informasi kontak
                  </span>
                  <span className="mt-1 block text-xs text-neutral-400">
                    Nonaktifkan apabila data belum siap ditampilkan.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) =>
                    update("is_active", event.target.checked)
                  }
                  className="size-5 accent-[#315d4e]"
                />
              </label>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#123c34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#205247] disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "Menyimpan..." : "Simpan perubahan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
