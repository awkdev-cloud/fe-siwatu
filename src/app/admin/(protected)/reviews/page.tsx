"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Ulasan Pengunjung",
  description:
    "Kelola testimoni yang digunakan untuk memperkuat kepercayaan calon pengunjung.",
  endpoint: "reviews",
  createLabel: "Tambah ulasan",
  singularLabel: "ulasan",
  searchPlaceholder: "Cari nama atau isi ulasan...",
  statusOptions: [
    { label: "Dipublikasikan", value: "published" },
    { label: "Draft", value: "draft" },
  ],
  defaultValues: { rating: 5, is_published: true },
  columns: [
    { key: "name", label: "Nama" },
    { key: "rating", label: "Rating", type: "rating" },
    { key: "comment", label: "Ulasan", maxLength: 90 },
    { key: "review_date", label: "Tanggal", type: "date" },
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
      label: "Nama pengunjung",
      type: "text",
      required: true,
    },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      required: true,
      options: [1, 2, 3, 4, 5].map((value) => ({
        label: `${value} bintang`,
        value,
      })),
    },
    {
      name: "comment",
      label: "Isi ulasan",
      type: "textarea",
      required: true,
      colSpan: 2,
    },
    {
      name: "review_date",
      label: "Tanggal ulasan",
      type: "date",
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

export default function ReviewsPage() {
  return <AdminCrudPage config={config} />;
}
