import "server-only";

import { and, desc, eq, inArray } from "drizzle-orm";
import { connection } from "next/server";
import { getDb } from "./db";
import {
  giftOrderItems,
  giftOrders,
  gifts,
  messages,
  rsvps,
  siteSettings,
  venues,
} from "./schema";

async function ready() {
  await connection();
  return getDb();
}

export async function getSettings() {
  const db = await ready();
  const row = db.select().from(siteSettings).where(eq(siteSettings.id, 1)).get();
  if (!row) throw new Error("Configuração do site não encontrada.");
  return row;
}

export async function getVenues() {
  const db = await ready();
  return db.select().from(venues).all();
}

export async function getVenueByType(type: "ceremony" | "reception") {
  const db = await ready();
  return db.select().from(venues).where(eq(venues.type, type)).get();
}

export async function getActiveGifts() {
  const db = await ready();
  return db
    .select()
    .from(gifts)
    .where(eq(gifts.active, 1))
    .orderBy(gifts.sortOrder)
    .all();
}

export async function getAllGifts() {
  const db = await ready();
  return db.select().from(gifts).orderBy(gifts.sortOrder).all();
}

export async function getGiftsByIds(ids: number[]) {
  if (ids.length === 0) return [];
  const db = await ready();
  return db.select().from(gifts).where(and(inArray(gifts.id, ids), eq(gifts.active, 1))).all();
}

export async function getApprovedMessages() {
  const db = await ready();
  return db
    .select()
    .from(messages)
    .where(eq(messages.status, "approved"))
    .orderBy(desc(messages.createdAt))
    .all();
}

export async function getAllMessages() {
  const db = await ready();
  return db.select().from(messages).orderBy(desc(messages.createdAt)).all();
}

export async function getAllRsvps() {
  const db = await ready();
  return db.select().from(rsvps).orderBy(desc(rsvps.createdAt)).all();
}

export async function getAllOrders() {
  const db = await ready();
  const orders = db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt)).all();
  const items = db.select().from(giftOrderItems).all();
  return orders.map((order) => ({
    ...order,
    items: items.filter((item) => item.orderId === order.id),
  }));
}

export async function getOrderById(id: number) {
  const db = await ready();
  const order = db.select().from(giftOrders).where(eq(giftOrders.id, id)).get();
  if (!order) return null;
  const items = db.select().from(giftOrderItems).where(eq(giftOrderItems.orderId, id)).all();
  return { ...order, items };
}

export async function getDashboardCounts() {
  const db = await ready();
  const rsvpRows = db.select().from(rsvps).all();
  const attending = rsvpRows.filter((row) => row.attending === 1);
  const guests = attending.reduce((sum, row) => sum + row.adults + row.children, 0);
  const pendingMessages = db.select().from(messages).where(eq(messages.status, "pending")).all().length;
  const pendingOrders = db.select().from(giftOrders).where(eq(giftOrders.status, "claimed")).all().length;
  const confirmedOrders = db.select().from(giftOrders).where(eq(giftOrders.status, "confirmed")).all();
  const giftedCents = confirmedOrders.reduce((sum, row) => sum + row.totalCents, 0);
  return {
    rsvps: rsvpRows.length,
    attending: attending.length,
    guests,
    pendingMessages,
    pendingOrders,
    giftedCents,
  };
}
