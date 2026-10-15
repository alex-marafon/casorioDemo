"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { parseReaisToCents } from "@/lib/format";
import { gifts } from "@/lib/schema";
import { saveUpload } from "@/lib/uploads";

function refresh() {
  revalidatePath("/presentes");
  revalidatePath("/admin/presentes");
}

export async function createGift(formData: FormData) {
  await requireAdmin();
  const image = await saveUpload(formData.get("image") as File | null, "gift");
  const name = String(formData.get("name") || "").trim();
  if (!name) redirect("/admin/presentes?erro=1");
  getDb()
    .insert(gifts)
    .values({
      name,
      description: String(formData.get("description") || "").trim(),
      priceCents: parseReaisToCents(String(formData.get("price") || "0")),
      image,
      active: formData.get("active") ? 1 : 0,
      quantity: Number(formData.get("quantity") || 1),
      sortOrder: Number(formData.get("sortOrder") || 0),
    })
    .run();
  refresh();
  redirect("/admin/presentes?ok=1");
}

export async function updateGift(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const image = await saveUpload(formData.get("image") as File | null, "gift");
  const current = getDb().select().from(gifts).where(eq(gifts.id, id)).get();
  getDb()
    .update(gifts)
    .set({
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      priceCents: parseReaisToCents(String(formData.get("price") || "0")),
      image: image || current?.image || null,
      active: formData.get("active") ? 1 : 0,
      quantity: Number(formData.get("quantity") || 1),
      sortOrder: Number(formData.get("sortOrder") || 0),
    })
    .where(eq(gifts.id, id))
    .run();
  refresh();
  redirect("/admin/presentes?ok=1");
}

export async function deleteGift(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  getDb().delete(gifts).where(eq(gifts.id, id)).run();
  refresh();
  redirect("/admin/presentes?ok=1");
}
