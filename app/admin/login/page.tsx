"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sectionBg px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-border bg-cardBg p-8 shadow-sm">
        <h1 className="font-heading text-xl font-bold text-textPrimary">Admin Login</h1>
        <p className="mt-1 text-sm text-textSecondary">Joy Family Multispeciality Clinic</p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <label className="mt-6 block">
          <span className="text-sm font-medium text-textPrimary">Email</span>
          <input
            type="email"
            required
            className="form-input mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-textPrimary">Password</span>
          <input
            type="password"
            required
            className="form-input mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <Button type="submit" variant="primary" fullWidth className="mt-6">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
