import { readFile } from "node:fs/promises";
import path from "node:path";
import { uploadsDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const SAFE_FILENAME = /^[a-zA-Z0-9._-]+$/;

const contentTypeByExt: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

function resolveUploadPath(filename: string) {
  if (!SAFE_FILENAME.test(filename)) return null;
  const base = path.resolve(uploadsDir());
  const resolved = path.resolve(base, filename);
  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) return null;
  return resolved;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params;
  const filePath = resolveUploadPath(filename);
  if (!filePath) {
    return new Response(null, { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await readFile(filePath);
  } catch {
    return new Response(null, { status: 404 });
  }

  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = contentTypeByExt[ext] ?? "application/octet-stream";
  const body = Uint8Array.from(buffer);

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
