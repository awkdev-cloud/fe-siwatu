"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Bebatuan Unik",
  description:
    "Kelola katalog bebatuan edukatif, gambar, deskripsi, QR code, dan urutan tampil pada website.",
  endpoint: "unique-rocks",
  createLabel: "Tambah bebatuan",
  singularLabel: "bebatuan unik",
  searchPlaceholder: "Cari nama bebatuan...",
  multipart: true,
  updateMethod: "POST",
  enableQrRegenerate: true,
  statusOptions: [
    { label: "Dipublikasikan", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  defaultValues: { is_published: true, sort_order: 0 },
  columns: [
    { key: "image_url", label: "Foto", type: "image" },
    { key: "name", label: "Nama" },
    { key: "scientific_name", label: "Nama ilmiah" },
    { key: "description", label: "Deskripsi", maxLength: 70 },
    { key: "qr_code_url", label: "QR", type: "qr" },
    {
      key: "is_published",
      label: "Status",
      type: "boolean",
      trueLabel: "Dipublikasikan",
      falseLabel: "Draft",
    },
  ],
  fields: [
    {
      name: "name",
      label: "Nama bebatuan",
      type: "text",
      required: true,
    },
    {
      name: "scientific_name",
      label: "Nama ilmiah",
      type: "text",
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      colSpan: 2,
    },
    {
      name: "image",
      label: "Gambar",
      type: "file",
      required: true,
      colSpan: 2,
      help: "Saat mengedit, biarkan kosong apabila gambar tidak diganti.",
    },
    {
      name: "sort_order",
      label: "Urutan tampil",
      type: "number",
      min: 0,
    },
    {
      name: "is_published",
      label: "Tampilkan di website",
      type: "boolean",
      trueLabel: "Dipublikasikan",
      falseLabel: "Draft",
    },
  ],
};

export default function UniqueRocksPage() {
  return <AdminCrudPage config={config} />;
}
