"use client";

import AdminCrudPage from "@/components/admin/crud/admin-crud-page";
import type { CrudConfig } from "@/components/admin/crud/types";

const config: CrudConfig = {
  title: "Media Sosial",
  description:
    "Kelola kanal resmi yang ditampilkan kepada pengunjung untuk mengikuti informasi dan dokumentasi terbaru.",
  endpoint: "social-links",
  createLabel: "Tambah media sosial",
  singularLabel: "media sosial",
  searchPlaceholder: "Cari platform atau username...",
  statusOptions: [
    { label: "Aktif", value: "active" },
    { label: "Nonaktif", value: "inactive" },
  ],
  defaultValues: { is_active: true, sort_order: 0 },
  columns: [
    { key: "platform", label: "Platform" },
    { key: "username", label: "Username" },
    { key: "url", label: "URL", maxLength: 60 },
    { key: "sort_order", label: "Urutan" },
    { key: "is_active", label: "Status", type: "boolean" },
  ],
  fields: [
    {
      name: "platform",
      label: "Platform",
      type: "text",
      required: true,
      placeholder: "Instagram",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "@alaswatukebonan",
    },
    {
      name: "url",
      label: "URL",
      type: "url",
      required: true,
      colSpan: 2,
      placeholder: "https://instagram.com/...",
    },
    {
      name: "icon",
      label: "Nama ikon",
      type: "text",
      placeholder: "instagram",
      help: "Opsional. Sesuaikan dengan mapping ikon frontend publik.",
    },
    {
      name: "sort_order",
      label: "Urutan tampil",
      type: "number",
      min: 0,
    },
    {
      name: "is_active",
      label: "Status",
      type: "boolean",
      colSpan: 2,
    },
  ],
};

export default function SocialLinksPage() {
  return <AdminCrudPage config={config} />;
}
