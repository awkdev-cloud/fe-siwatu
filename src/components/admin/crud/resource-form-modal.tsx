"use client";

import {
  ImagePlus,
  LoaderCircle,
  Plus,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { adminRequest } from "@/lib/admin/client-api";
import { getByPath } from "@/lib/admin/format";

import type {
  CrudConfig,
  FieldConfig,
  FieldOption,
} from "./types";

type ResourceFormModalProps = {
  open: boolean;
  config: CrudConfig;
  item: Record<string, unknown> | null;
  saving: boolean;
  serverErrors?: Record<string, string[]>;
  onClose: () => void;
  onSubmit: (
    values: Record<string, unknown>,
  ) => Promise<void>;
};

type OptionsEnvelope = {
  data?: Record<string, unknown>[];
};

function initialValue(
  field: FieldConfig,
  item: Record<string, unknown> | null,
  defaults: Record<string, unknown>,
): unknown {
  if (item) {
    const value = field.initialFrom
      ? field.initialFrom(item)
      : getByPath(item, field.name);

    if (field.type === "tags" && Array.isArray(value)) {
      return value.join(", ");
    }

    if (value !== undefined && value !== null) {
      return value;
    }
  }

  if (field.name in defaults) {
    return defaults[field.name];
  }

  return field.type === "boolean" ? true : "";
}

export default function ResourceFormModal({
  open,
  config,
  item,
  saving,
  serverErrors,
  onClose,
  onSubmit,
}: ResourceFormModalProps) {
  const defaults = useMemo(
    () => config.defaultValues ?? {},
    [config.defaultValues],
  );

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [options, setOptions] = useState<
    Record<string, FieldOption[]>
  >({});
  const [loadingOptions, setLoadingOptions] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setValues(
      Object.fromEntries(
        config.fields.map((field) => [
          field.name,
          initialValue(field, item, defaults),
        ]),
      ),
    );
  }, [open, item, config.fields, defaults]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const remoteFields = config.fields.filter(
      (field) => field.optionsEndpoint,
    );

    if (!remoteFields.length) {
      return;
    }

    let cancelled = false;

    async function loadOptions() {
      setLoadingOptions(true);

      try {
        const entries = await Promise.all(
          remoteFields.map(async (field) => {
            const response = await adminRequest<OptionsEnvelope>(
              field.optionsEndpoint!,
            );

            const list = (response.data ?? []).map((entry) => ({
              label: String(
                getByPath(
                  entry,
                  field.optionLabel ?? "name",
                ) ?? "Tanpa nama",
              ),
              value: String(
                getByPath(
                  entry,
                  field.optionValue ?? "id",
                ) ?? "",
              ),
            }));

            return [field.name, list] as const;
          }),
        );

        if (!cancelled) {
          setOptions(Object.fromEntries(entries));
        }
      } finally {
        if (!cancelled) {
          setLoadingOptions(false);
        }
      }
    }

    void loadOptions();

    return () => {
      cancelled = true;
    };
  }, [open, config.fields]);

  if (!open) {
    return null;
  }

  function setValue(name: string, value: unknown) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleFile(
    field: FieldConfig,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setValue(field.name, event.target.files?.[0] ?? null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);
  }

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/45 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Tutup form"
        onClick={onClose}
        className="absolute inset-0"
      />

      <aside className="relative h-full w-full max-w-2xl overflow-y-auto bg-[#f7f8f3] shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-black/5 bg-white/95 px-6 py-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#638c7d]">
                {item ? "Edit data" : "Tambah data"}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {item
                  ? `Perbarui ${config.singularLabel}`
                  : config.createLabel}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Pastikan informasi sudah benar sebelum disimpan.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Tutup form"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="px-6 py-7 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {config.fields.map((field) => {
              const fieldOptions =
                field.options ?? options[field.name] ?? [];
              const error = serverErrors?.[field.name]?.[0];
              const value = values[field.name];

              return (
                <label
                  key={field.name}
                  className={
                    field.colSpan === 2
                      ? "block sm:col-span-2"
                      : "block"
                  }
                >
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </span>

                  {field.type === "textarea" && (
                    <textarea
                      required={field.required}
                      value={String(value ?? "")}
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                      placeholder={field.placeholder}
                      rows={5}
                      className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#729686] focus:ring-4 focus:ring-[#dfeae5]"
                    />
                  )}

                  {field.type === "select" && (
                    <select
                      required={field.required}
                      disabled={loadingOptions}
                      value={String(value ?? "")}
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-[#729686] focus:ring-4 focus:ring-[#dfeae5] disabled:opacity-60"
                    >
                      <option value="">
                        {loadingOptions
                          ? "Memuat pilihan..."
                          : "Pilih salah satu"}
                      </option>
                      {fieldOptions.map((option) => (
                        <option
                          key={String(option.value)}
                          value={String(option.value)}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "boolean" && (
                    <span className="mt-3 flex min-h-12 items-center justify-between rounded-xl border border-neutral-200 bg-white px-4">
                      <span className="text-sm text-neutral-600">
                        {Boolean(value)
                          ? field.trueLabel ?? "Aktif"
                          : field.falseLabel ?? "Tidak aktif"}
                      </span>
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) =>
                          setValue(field.name, event.target.checked)
                        }
                        className="size-5 accent-[#315d4e]"
                      />
                    </span>
                  )}

                  {field.type === "file" && (
                    <span className="mt-2 block rounded-xl border border-dashed border-neutral-300 bg-white p-4">
                      <span className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#edf4d0] text-[#315d4e]">
                          <ImagePlus className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">
                            Pilih file gambar
                          </span>
                          <span className="block text-xs text-neutral-400">
                            JPG, PNG, atau WEBP. Maksimal 3 MB.
                          </span>
                        </span>
                      </span>
                      <input
                        type="file"
                        required={field.required && !item}
                        accept={field.accept ?? "image/*"}
                        onChange={(event) => handleFile(field, event)}
                        className="mt-4 block w-full text-sm text-neutral-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#173f35] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      />
                    </span>
                  )}

                  {![
                    "textarea",
                    "select",
                    "boolean",
                    "file",
                  ].includes(field.type) && (
                    <input
                      required={field.required}
                      type={
                        field.type === "tags"
                          ? "text"
                          : field.type
                      }
                      value={String(value ?? "")}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-[#729686] focus:ring-4 focus:ring-[#dfeae5]"
                    />
                  )}

                  {field.help && (
                    <span className="mt-2 block text-xs leading-5 text-neutral-400">
                      {field.help}
                    </span>
                  )}

                  {error && (
                    <span className="mt-2 block text-xs font-medium text-red-600">
                      {error}
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/5 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#225748] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              {saving
                ? "Menyimpan..."
                : item
                  ? "Simpan perubahan"
                  : "Tambahkan data"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
