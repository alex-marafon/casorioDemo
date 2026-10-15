"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { rsvps } from "@/lib/schema";

export async function submitRsvp(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const attending = String(formData.get("attending") || "") === "sim" ? 1 : 0;
  if (!name || !email) redirect("/confirme-presenca?erro=1");

  getDb()
    .insert(rsvps)
    .values({
      name,
      email,
      attending,
      adults: attending ? Number(formData.get("adults") || 1) : 0,
      children: attending ? Number(formData.get("children") || 0) : 0,
      phone: String(formData.get("phone") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      createdAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/admin/confirmacoes");
  revalidatePath("/admin");
  redirect("/confirme-presenca?ok=1");
}
