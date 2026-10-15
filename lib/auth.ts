import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";
import { adminUsers } from "./schema";
import { COOKIE_NAME, verifySessionToken } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function findAdmin(username: string) {
  const db = getDb();
  return db.select().from(adminUsers).where(eq(adminUsers.username, username)).get();
}
