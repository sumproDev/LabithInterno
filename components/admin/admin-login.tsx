"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Invalid username or password.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <span><Lock /> Secure CMS</span>
        <h1>Labith Interno Admin</h1>
        <p>Manage products, collections, projects, testimonials and images from one place.</p>
        <label>Username<input name="username" defaultValue="aravaliadmin" autoComplete="username" required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"} <LogIn /></button>
      </form>
    </main>
  );
}
