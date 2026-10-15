"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findAdmin } from "@/lib/auth";
import { COOKIE_NAME, createSessionToken } from "@/lib/session";

export async function login(_prev: { error?: string } | null, formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const user = await findAdmin(username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return { error: "Usuário ou senha inválidos." };
  }

  const token = await createSessionToken(user.username);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
