import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdminFromCookies } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = { title: "CMS Admin | Labith Interno" };

export default async function AdminPage() {
  if (!(await isAdminFromCookies())) redirect("/admin/login");
  return <AdminDashboard />;
}
