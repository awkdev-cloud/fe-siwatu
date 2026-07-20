"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Paket Wisata",
  description:
    "Atur informasi paket, fasilitas, durasi, harga, urutan, serta paket unggulan yang tampil pada website.",
  endpoint: "tour-packages",
  createLabel: "Tambah paket",
  singularLabel: "paket wisata",
  searchPlaceholder: "Cari nama atau jenis paket...",
  statusOptions: [
    { label: "Aktif", value: "active" },
    { label: "Nonaktif", value: "inactive" },
  ],
  defaultValues: {
    is_active: true,
    is_featured: false,
    sort_order: 0,
  },
  columns: [
    { key: "title", label: "Paket" },
    { key: "package_type", label: "Jenis" },
    { key: "price", label: "Harga", type: "currency" },
    { key: "duration", label: "Durasi" },
    {
      key: "is_featured",
      label: "Tipe",
      type: "boolean",
      trueLabel: "Unggulan",
      falseLabel: "Reguler",
    },
    { key: "is_active", label: "Status", type: "boolean" },
  ],
  fields: [
    {
      name: "title",
      label: "Nama paket",
      type: "text",
      required: true,
      placeholder: "Contoh: Paket Edukasi Alam",
    },
    {
      name: "package_type",
      label: "Jenis paket",
      type: "text",
      required: true,
      placeholder: "Contoh: Paket Edukasi",
    },
    {
      name: "highlight_label",
      label: "Label sorotan",
      type: "text",
      placeholder: "Contoh: Cocok untuk Pelajar",
    },
    {
      name: "duration",
      label: "Durasi",
      type: "text",
      placeholder: "Contoh: 3–4 jam",
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      required: true,
      colSpan: 2,
    },
    {
      name: "facilities",
      label: "Fasilitas",
      type: "tags",
      colSpan: 2,
      placeholder:
        "Tiket masuk, Pemandu wisata, Air minum",
      help: "Pisahkan setiap fasilitas menggunakan koma.",
    },
    {
      name: "price",
      label: "Harga",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "sort_order",
      label: "Urutan tampil",
      type: "number",
      min: 0,
    },
    {
      name: "is_featured",
      label: "Paket unggulan",
      type: "boolean",
      trueLabel: "Unggulan",
      falseLabel: "Reguler",
    },
    {
      name: "is_active",
      label: "Status paket",
      type: "boolean",
    },
  ],
};

export default function TourPackagesPage() {
  return <AdminCrudPage config={config} />;
}
