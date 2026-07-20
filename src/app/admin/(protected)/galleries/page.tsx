"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Galeri",
  description:
    "Kelola dokumentasi visual kegiatan, suasana kawasan, dan pengalaman pengunjung Alas Watu Kebonan.",
  endpoint: "galleries",
  createLabel: "Tambah galeri",
  singularLabel: "galeri",
  searchPlaceholder: "Cari judul galeri...",
  multipart: true,
  updateMethod: "POST",
  statusOptions: [
    { label: "Dipublikasikan", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  defaultValues: { is_published: true },
  columns: [
    { key: "image_url", label: "Foto", type: "image" },
    { key: "title", label: "Judul" },
    { key: "category.name", label: "Kategori" },
    { key: "description", label: "Deskripsi", maxLength: 70 },
    {
      key: "is_published",
      label: "Status",
      type: "boolean",
      trueLabel: "Dipublikasikan",
      falseLabel: "Draft",
    },
    { key: "created_at", label: "Dibuat", type: "date" },
  ],
  fields: [
    {
      name: "gallery_category_id",
      label: "Kategori",
      type: "select",
      required: true,
      optionsEndpoint: "gallery-categories",
      optionLabel: "name",
      optionValue: "id",
      initialFrom: (item) =>
        (item.category as Record<string, unknown> | undefined)?.id,
    },
    {
      name: "title",
      label: "Judul galeri",
      type: "text",
      required: true,
      placeholder: "Contoh: Jeep Jelajah Desa",
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      colSpan: 2,
      placeholder: "Ceritakan isi dokumentasi secara singkat.",
    },
    {
      name: "image",
      label: "Gambar",
      type: "file",
      required: true,
      accept: "image/jpeg,image/png,image/webp",
      colSpan: 2,
      help: "Saat mengedit, biarkan kosong apabila gambar tidak diganti.",
    },
    {
      name: "is_published",
      label: "Tampilkan di website",
      type: "boolean",
      trueLabel: "Dipublikasikan",
      falseLabel: "Draft",
      colSpan: 2,
    },
  ],
};

export default function GalleriesPage() {
  return <AdminCrudPage config={config} />;
}
