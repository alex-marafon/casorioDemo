import "server-only";

import fs from "node:fs";
import path from "node:path";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const faviconTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/svg+xml",
]);

export async function saveFavicon(file: File | null) {
  if (!file || file.size === 0) return null;
  if (!faviconTypes.has(file.type)) {
    throw new Error("Envie PNG, JPG, WEBP, GIF, ICO ou SVG para o ícone.");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const filename = `favicon-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function saveUpload(file: File | null, folder: string) {
  if (!file || file.size === 0) return null;
  if (!allowed.has(file.type)) {
    throw new Error("Envie uma imagem JPG, PNG, WEBP ou GIF.");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${folder}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}
