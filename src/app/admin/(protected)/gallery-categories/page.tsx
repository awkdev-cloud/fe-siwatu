"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Kategori Galeri",
  description:
    "Kelompokkan dokumentasi wisata agar galeri publik lebih terstruktur dan mudah dijelajahi.",
  endpoint: "gallery-categories",
  createLabel: "Tambah kategori",
  singularLabel: "kategori galeri",
  searchPlaceholder: "Cari nama kategori...",
  statusOptions: [
    { label: "Aktif", value: "active" },
    { label: "Nonaktif", value: "inactive" },
  ],
  defaultValues: { is_active: true },
  columns: [
    { key: "name", label: "Nama" },
    { key: "slug", label: "Slug" },
    { key: "description", label: "Deskripsi", maxLength: 70 },
    { key: "galleries_count", label: "Jumlah galeri" },
    { key: "is_active", label: "Status", type: "boolean" },
  ],
  fields: [
    {
      name: "name",
      label: "Nama kategori",
      type: "text",
      required: true,
      placeholder: "Contoh: Kegiatan Desa",
    },
    {
      name: "is_active",
      label: "Status kategori",
      type: "boolean",
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      colSpan: 2,
      placeholder: "Jelaskan isi kategori secara ringkas.",
    },
  ],
};

export default function GalleryCategoriesPage() {
  return <AdminCrudPage config={config} />;
}
