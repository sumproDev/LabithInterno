import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/admin-login";

export const metadata: Metadata = { title: "Admin Login | Labith Interno" };

export default function AdminLoginPage() {
  return <AdminLogin />;
}
