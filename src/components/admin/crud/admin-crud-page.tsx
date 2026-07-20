"use client";

import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  FileQuestion,
  LoaderCircle,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AdminApiError,
  adminRequest,
} from "@/lib/admin/client-api";
import {
  formatCurrency,
  formatDate,
  getByPath,
  truncate,
} from "@/lib/admin/format";

import ConfirmDialog from "../confirm-dialog";
import ResourceFormModal from "./resource-form-modal";
import type {
  ColumnConfig,
  CrudConfig,
  FieldConfig,
} from "./types";

type ListEnvelope = {
  message?: string;
  data?: Record<string, unknown>[];
  meta?: Record<string, number>;
};

const PAGE_SIZES = [10, 20, 50];

function renderCell(
  item: Record<string, unknown>,
  column: ColumnConfig,
) {
  const value = getByPath(item, column.key);

  if (column.type === "image") {
    return value && typeof value === "string" ? (
      <img
        src={value}
        alt=""
        loading="lazy"
        className="size-14 rounded-xl border border-black/5 object-cover"
      />
    ) : (
      <span className="grid size-14 place-items-center rounded-xl bg-neutral-100 text-neutral-400">
        <FileQuestion className="size-5" />
      </span>
    );
  }

  if (column.type === "qr") {
    return value && typeof value === "string" ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#315d4e] hover:underline"
      >
        <QrCode className="size-4" />
        Lihat QR
      </a>
    ) : (
      <span className="text-sm text-neutral-400">Belum tersedia</span>
    );
  }

  if (column.type === "boolean") {
    const active = Boolean(value);

    return (
      <span
        className={[
          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
          active
            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
            : "bg-neutral-100 text-neutral-500 ring-neutral-200",
        ].join(" ")}
      >
        {active
          ? column.trueLabel ?? "Aktif"
          : column.falseLabel ?? "Nonaktif"}
      </span>
    );
  }

  if (column.type === "date") {
    return (
      <span className="text-sm text-neutral-600">
        {formatDate(value)}
      </span>
    );
  }

  if (column.type === "currency") {
    return (
      <span className="text-sm font-semibold">
        {formatCurrency(value)}
      </span>
    );
  }

  if (column.type === "rating") {
    const rating = Math.max(0, Math.min(5, Number(value) || 0));

    return (
      <span className="whitespace-nowrap text-sm text-amber-500">
        {"★".repeat(rating)}
        <span className="text-neutral-300">
          {"★".repeat(5 - rating)}
        </span>
      </span>
    );
  }

  return (
    <span className="text-sm leading-6 text-neutral-700">
      {truncate(value, column.maxLength)}
    </span>
  );
}

function buildPayload(
  config: CrudConfig,
  fields: FieldConfig[],
  values: Record<string, unknown>,
): BodyInit {
  if (config.multipart) {
    const formData = new FormData();

    for (const field of fields) {
      const value = values[field.name];

      if (value === null || value === undefined || value === "") {
        continue;
      }

      if (field.type === "tags") {
        String(value)
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean)
          .forEach((entry) =>
            formData.append(`${field.name}[]`, entry),
          );
        continue;
      }

      if (field.type === "boolean") {
        formData.set(field.name, value ? "1" : "0");
        continue;
      }

      if (field.type === "file") {
        if (value instanceof File) {
          formData.set(field.name, value);
        }
        continue;
      }

      formData.set(field.name, String(value));
    }

    return formData;
  }

  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    const value = values[field.name];

    if (field.type === "number" && value !== "") {
      payload[field.name] = Number(value);
    } else if (field.type === "tags") {
      payload[field.name] = String(value ?? "")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
    } else {
      payload[field.name] = value;
    }
  }

  return JSON.stringify(payload);
}

export default function AdminCrudPage({
  config,
}: {
  config: CrudConfig;
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [meta, setMeta] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<Record<string, unknown> | null>(null);
  const [deletingItem, setDeletingItem] =
    useState<Record<string, unknown> | null>(null);
  const [serverErrors, setServerErrors] = useState<
    Record<string, string[]>
  >({});

  async function loadData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    if (deferredSearch.trim()) {
      params.set("search", deferredSearch.trim());
    }

    if (status) {
      params.set("status", status);
    }

    try {
      const response = await adminRequest<ListEnvelope>(
        `${config.endpoint}${params.size ? `?${params.toString()}` : ""}`,
      );

      setItems(response.data ?? []);
      setMeta(response.meta ?? {});
      setPage(1);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Data tidak dapat dimuat.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadData();
    }, 250);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.endpoint, deferredSearch, status]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function openCreate() {
    setEditingItem(null);
    setServerErrors({});
    setFormOpen(true);
  }

  function openEdit(item: Record<string, unknown>) {
    setEditingItem(item);
    setServerErrors({});
    setFormOpen(true);
  }

  async function saveItem(values: Record<string, unknown>) {
    setOperationLoading(true);
    setServerErrors({});
    setError(null);

    const id = editingItem?.id;
    const editing = id !== undefined && id !== null;
    const method = editing
      ? config.updateMethod ?? "PATCH"
      : "POST";
    const endpoint = editing
      ? `${config.endpoint}/${String(id)}`
      : config.endpoint;

    try {
      await adminRequest(endpoint, {
        method,
        body: buildPayload(config, config.fields, values),
      });

      setFormOpen(false);
      setEditingItem(null);
      setNotice(
        editing
          ? `${config.singularLabel} berhasil diperbarui.`
          : `${config.singularLabel} berhasil ditambahkan.`,
      );
      await loadData();
    } catch (requestError) {
      if (requestError instanceof AdminApiError) {
        setServerErrors(requestError.errors ?? {});
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Data gagal disimpan.",
      );
    } finally {
      setOperationLoading(false);
    }
  }

  async function deleteItem() {
    if (!deletingItem?.id) {
      return;
    }

    setOperationLoading(true);
    setError(null);

    try {
      await adminRequest(
        `${config.endpoint}/${String(deletingItem.id)}`,
        { method: "DELETE" },
      );

      setDeletingItem(null);
      setNotice(`${config.singularLabel} berhasil dihapus.`);
      await loadData();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Data gagal dihapus.",
      );
    } finally {
      setOperationLoading(false);
    }
  }

  async function regenerateQr(item: Record<string, unknown>) {
    if (!item.id) {
      return;
    }

    setOperationLoading(true);
    setError(null);

    try {
      await adminRequest(
        `${config.endpoint}/${String(item.id)}/${
          config.qrEndpointSuffix ?? "regenerate-qr"
        }`,
        { method: "POST" },
      );

      setNotice("QR code berhasil dibuat ulang.");
      await loadData();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "QR code gagal dibuat ulang.",
      );
    } finally {
      setOperationLoading(false);
    }
  }

  return (
    <div>
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638c7d]">
            Manajemen konten
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-neutral-950">
            {config.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
            {config.description}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245748]"
        >
          <Plus className="size-4" />
          {config.createLabel}
        </button>
      </section>

      {notice && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {Object.keys(meta).length > 0 && (
        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(meta).map(([key, value]) => (
            <div
              key={key}
              className="rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                {key.replaceAll("_", " ")}
              </p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </section>
      )}

      <section className="mt-6 overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-black/5 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                config.searchPlaceholder ?? "Cari data..."
              }
              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#719585] focus:bg-white focus:ring-4 focus:ring-[#e1ebe6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {config.statusOptions && (
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 outline-none focus:border-[#719585]"
              >
                <option value="">Semua status</option>
                {config.statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              onClick={() => void loadData()}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              <RefreshCw
                className={[
                  "size-4",
                  loading ? "animate-spin" : "",
                ].join(" ")}
              />
              Muat ulang
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full">
            <thead className="bg-[#f6f8f3]">
              <tr>
                {config.columns.map((column) => (
                  <th
                    key={column.key}
                    className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-5 py-16 text-center"
                  >
                    <LoaderCircle className="mx-auto size-7 animate-spin text-[#315d4e]" />
                    <p className="mt-3 text-sm text-neutral-500">
                      Memuat data...
                    </p>
                  </td>
                </tr>
              ) : paginatedItems.length ? (
                paginatedItems.map((item) => (
                  <tr
                    key={String(item.id)}
                    className="transition hover:bg-[#fafbf7]"
                  >
                    {config.columns.map((column) => (
                      <td
                        key={column.key}
                        className="max-w-xs px-5 py-4 align-middle"
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {config.enableQrRegenerate && (
                          <button
                            type="button"
                            disabled={operationLoading}
                            onClick={() => void regenerateQr(item)}
                            className="grid size-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-[#98ae54] hover:bg-[#f4f7df] hover:text-[#315d4e]"
                            aria-label="Buat ulang QR"
                          >
                            <QrCode className="size-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="grid size-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-[#719585] hover:bg-[#edf4f0] hover:text-[#315d4e]"
                          aria-label="Edit data"
                        >
                          <Edit3 className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="grid size-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          aria-label="Hapus data"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-5 py-16 text-center"
                  >
                    <FileQuestion className="mx-auto size-8 text-neutral-300" />
                    <p className="mt-3 text-sm font-semibold text-neutral-700">
                      Data belum tersedia
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      Tambahkan data baru atau ubah kata pencarian.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-black/5 lg:hidden">
          {loading ? (
            <div className="px-5 py-14 text-center">
              <LoaderCircle className="mx-auto size-7 animate-spin text-[#315d4e]" />
            </div>
          ) : paginatedItems.length ? (
            paginatedItems.map((item) => (
              <article key={String(item.id)} className="p-5">
                <div className="grid gap-3">
                  {config.columns.map((column) => (
                    <div
                      key={column.key}
                      className="grid grid-cols-[110px_1fr] gap-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        {column.label}
                      </span>
                      <div>{renderCell(item, column)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-end gap-2 border-t border-black/5 pt-4">
                  {config.enableQrRegenerate && (
                    <button
                      type="button"
                      onClick={() => void regenerateQr(item)}
                      className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold"
                    >
                      QR ulang
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingItem(item)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="px-5 py-14 text-center text-sm text-neutral-400">
              Data belum tersedia.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-black/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>Tampilkan</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>dari {items.length} data</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
              className="grid size-9 place-items-center rounded-lg border border-neutral-200 disabled:opacity-35"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="size-4" />
            </button>

            <span className="min-w-24 text-center text-sm font-semibold">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1),
                )
              }
              className="grid size-9 place-items-center rounded-lg border border-neutral-200 disabled:opacity-35"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <ResourceFormModal
        open={formOpen}
        config={config}
        item={editingItem}
        saving={operationLoading}
        serverErrors={serverErrors}
        onClose={() => {
          if (!operationLoading) {
            setFormOpen(false);
          }
        }}
        onSubmit={saveItem}
      />

      <ConfirmDialog
        open={Boolean(deletingItem)}
        title={`Hapus ${config.singularLabel}?`}
        description="Data yang telah dihapus tidak dapat dipulihkan. Pastikan data ini memang tidak lagi dibutuhkan."
        loading={operationLoading}
        onCancel={() => {
          if (!operationLoading) {
            setDeletingItem(null);
          }
        }}
        onConfirm={() => void deleteItem()}
      />
    </div>
  );
}
