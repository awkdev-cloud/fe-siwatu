"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Revitalisasi Tanaman",
  description:
    "Kelola katalog flora untuk mendukung informasi edukatif dan revitalisasi kawasan wisata.",
  endpoint: "plant-revitalizations",
  createLabel: "Tambah tanaman",
  singularLabel: "tanaman revitalisasi",
  searchPlaceholder: "Cari nama tanaman...",
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
      label: "Nama tanaman",
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

export default function PlantRevitalizationsPage() {
  return <AdminCrudPage config={config} />;
}
