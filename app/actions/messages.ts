"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/schema";

export async function submitMessage(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!name || !body) redirect("/recados?erro=1");

  getDb()
    .insert(messages)
    .values({
      name,
      email: String(formData.get("email") || "").trim(),
      body,
      status: "pending",
      createdAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/admin/recados");
  redirect("/recados?ok=1");
}

export async function setMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "pending");
  getDb().update(messages).set({ status }).where(eq(messages.id, id)).run();
  revalidatePath("/recados");
  revalidatePath("/admin/recados");
  redirect("/admin/recados?ok=1");
}
