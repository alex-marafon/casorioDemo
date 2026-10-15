"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { buildPixPayload, parsePixKeyType } from "@/lib/pix";
import { getGiftsByIds, getSettings } from "@/lib/queries";
import { giftOrderItems, giftOrders } from "@/lib/schema";

export async function createOrder(formData: FormData) {
  const guestName = String(formData.get("guestName") || "").trim();
  const guestEmail = String(formData.get("guestEmail") || "").trim();
  const ids = String(formData.get("giftIds") || "")
    .split(",")
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (!guestName) redirect("/presentes/checkout?erro=nome");
  if (ids.length === 0) redirect("/presentes");
  if (ids.length > 3) redirect("/presentes/checkout?erro=limite");

  const uniqueIds = [...new Set(ids)];
  const selected = await getGiftsByIds(uniqueIds);
  if (selected.length === 0) redirect("/presentes");

  const settings = await getSettings();
  if (!settings.pixKey) redirect("/presentes/checkout?erro=pix");

  const totalCents = selected.reduce((sum, gift) => sum + gift.priceCents, 0);
  const createdAt = new Date().toISOString();
  const db = getDb();
  const inserted = db
    .insert(giftOrders)
    .values({
      guestName,
      guestEmail,
      totalCents,
      pixPayload: "pending",
      status: "pending",
      createdAt,
    })
    .run();
  const orderId = Number(inserted.lastInsertRowid);

  const txid = `CAS${orderId}`;
  let pixPayload: string;
  try {
    pixPayload = buildPixPayload({
      key: settings.pixKey,
      keyType: parsePixKeyType(settings.pixKeyType),
      name: settings.pixName,
      city: settings.pixCity,
      amountCents: totalCents,
      txid,
    });
  } catch {
    redirect("/presentes/checkout?erro=pix");
  }

  db.update(giftOrders).set({ pixPayload }).where(eq(giftOrders.id, orderId)).run();

  for (const gift of selected) {
    db.insert(giftOrderItems)
      .values({
        orderId,
        giftId: gift.id,
        name: gift.name,
        priceCents: gift.priceCents,
      })
      .run();
  }

  revalidatePath("/admin/pedidos");
  redirect(`/presentes/pedido/${orderId}`);
}

export async function claimOrder(formData: FormData) {
  const id = Number(formData.get("id"));
  getDb().update(giftOrders).set({ status: "claimed" }).where(eq(giftOrders.id, id)).run();
  revalidatePath("/admin/pedidos");
  revalidatePath(`/presentes/pedido/${id}`);
  redirect(`/presentes/pedido/${id}?ok=1`);
}

export async function confirmOrder(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  getDb().update(giftOrders).set({ status: "confirmed" }).where(eq(giftOrders.id, id)).run();
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin");
  redirect("/admin/pedidos?ok=1");
}
