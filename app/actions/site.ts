"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { siteSettings, venues } from "@/lib/schema";
import { parseFloralStyle } from "@/lib/floral";
import { parsePixKeyType, validatePixKey } from "@/lib/pix";
import { saveFavicon, saveUpload } from "@/lib/uploads";

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/cerimonia");
  revalidatePath("/recepcao");
  revalidatePath("/presentes");
  revalidatePath("/confirme-presenca");
  revalidatePath("/recados");
}

export async function updateSite(formData: FormData) {
  await requireAdmin();
  const favicon = await saveFavicon(formData.get("favicon") as File | null);
  const current = getDb().select().from(siteSettings).where(eq(siteSettings.id, 1)).get();
  getDb()
    .update(siteSettings)
    .set({
      siteTitle: String(formData.get("siteTitle") || "").trim(),
      siteDescription: String(formData.get("siteDescription") || "").trim(),
      favicon: favicon || current?.favicon || null,
      brideName: String(formData.get("brideName") || "").trim(),
      groomName: String(formData.get("groomName") || "").trim(),
      weddingDate: String(formData.get("weddingDate") || ""),
      city: String(formData.get("city") || "").trim(),
      state: String(formData.get("state") || "").trim(),
      homeIntro: String(formData.get("homeIntro") || "").trim(),
      homeText: String(formData.get("homeText") || "").trim(),
      rsvpDeadline: String(formData.get("rsvpDeadline") || ""),
    })
    .where(eq(siteSettings.id, 1))
    .run();
  revalidatePublic();
  redirect("/admin/site?ok=1");
}

export async function clearFavicon() {
  await requireAdmin();
  getDb().update(siteSettings).set({ favicon: null }).where(eq(siteSettings.id, 1)).run();
  revalidatePublic();
  redirect("/admin/site?ok=1");
}

export async function updateTheme(formData: FormData) {
  await requireAdmin();
  const hero = await saveUpload(formData.get("heroImage") as File | null, "hero");
  const current = getDb().select().from(siteSettings).where(eq(siteSettings.id, 1)).get();
  getDb()
    .update(siteSettings)
    .set({
      primaryColor: String(formData.get("primaryColor") || "#8B6914"),
      secondaryColor: String(formData.get("secondaryColor") || "#5C4033"),
      backgroundColor: String(formData.get("backgroundColor") || "#F7F1EA"),
      accentColor: String(formData.get("accentColor") || "#C9A66B"),
      headingFont: String(formData.get("headingFont") || "playfair"),
      bodyFont: String(formData.get("bodyFont") || "lato"),
      heroImage: hero || current?.heroImage || null,
      floralEnabled: formData.get("floralEnabled") ? 1 : 0,
      floralStyle: parseFloralStyle(String(formData.get("floralStyle") || "roses")),
    })
    .where(eq(siteSettings.id, 1))
    .run();
  revalidatePublic();
  redirect("/admin/tema?ok=1");
}

export async function clearHeroImage() {
  await requireAdmin();
  getDb().update(siteSettings).set({ heroImage: null }).where(eq(siteSettings.id, 1)).run();
  revalidatePublic();
  redirect("/admin/tema?ok=1");
}

export async function updatePix(formData: FormData) {
  await requireAdmin();
  const pixKeyType = parsePixKeyType(String(formData.get("pixKeyType") || "random"));
  const rawKey = String(formData.get("pixKey") || "").trim();
  const pixName = String(formData.get("pixName") || "").trim();
  const pixCity = String(formData.get("pixCity") || "").trim().toUpperCase();

  if (!pixName || !pixCity) {
    redirect("/admin/pix?erro=dados");
  }

  const keyCheck = validatePixKey(rawKey, pixKeyType);
  if (!keyCheck.ok) {
    redirect(`/admin/pix?erro=${encodeURIComponent(keyCheck.message)}`);
  }

  getDb()
    .update(siteSettings)
    .set({
      pixKeyType,
      pixKey: keyCheck.normalized,
      pixName,
      pixCity,
    })
    .where(eq(siteSettings.id, 1))
    .run();
  revalidatePublic();
  redirect("/admin/pix?ok=1");
}

export async function updateVenue(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  getDb()
    .update(venues)
    .set({
      title: String(formData.get("title") || "").trim(),
      place: String(formData.get("place") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      time: String(formData.get("time") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      mapUrl: String(formData.get("mapUrl") || "").trim() || null,
    })
    .where(eq(venues.id, id))
    .run();
  revalidatePublic();
  redirect("/admin/locais?ok=1");
}
