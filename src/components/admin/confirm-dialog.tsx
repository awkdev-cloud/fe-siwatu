"use client";

import { AlertTriangle, LoaderCircle, X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle className="size-5" />
          </span>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="grid size-9 place-items-center rounded-xl text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
            aria-label="Tutup konfirmasi"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-neutral-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {description}
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading && <LoaderCircle className="size-4 animate-spin" />}
            Hapus data
          </button>
        </div>
      </div>
    </div>
  );
}
