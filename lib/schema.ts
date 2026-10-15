import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  siteTitle: text("site_title").notNull(),
  siteDescription: text("site_description").notNull(),
  favicon: text("favicon"),
  brideName: text("bride_name").notNull(),
  groomName: text("groom_name").notNull(),
  weddingDate: text("wedding_date").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  homeIntro: text("home_intro").notNull(),
  homeText: text("home_text").notNull(),
  rsvpDeadline: text("rsvp_deadline").notNull(),
  primaryColor: text("primary_color").notNull(),
  secondaryColor: text("secondary_color").notNull(),
  backgroundColor: text("background_color").notNull(),
  accentColor: text("accent_color").notNull(),
  headingFont: text("heading_font").notNull(),
  bodyFont: text("body_font").notNull(),
  heroImage: text("hero_image"),
  floralEnabled: integer("floral_enabled").notNull().default(0),
  floralStyle: text("floral_style").notNull().default("roses"),
  pixKeyType: text("pix_key_type").notNull(),
  pixKey: text("pix_key").notNull(),
  pixName: text("pix_name").notNull(),
  pixCity: text("pix_city").notNull(),
});

export const venues = sqliteTable("venues", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  place: text("place").notNull(),
  address: text("address").notNull(),
  time: text("time").notNull(),
  description: text("description").notNull(),
  mapUrl: text("map_url"),
});

export const gifts = sqliteTable("gifts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  image: text("image"),
  active: integer("active").notNull().default(1),
  quantity: integer("quantity").notNull().default(1),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const giftOrders = sqliteTable("gift_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull().default(""),
  totalCents: integer("total_cents").notNull(),
  pixPayload: text("pix_payload").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});

export const giftOrderItems = sqliteTable("gift_order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").notNull(),
  giftId: integer("gift_id").notNull(),
  name: text("name").notNull(),
  priceCents: integer("price_cents").notNull(),
});

export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  attending: integer("attending").notNull(),
  adults: integer("adults").notNull().default(1),
  children: integer("children").notNull().default(0),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull(),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  body: text("body").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type Venue = typeof venues.$inferSelect;
export type Gift = typeof gifts.$inferSelect;
export type GiftOrder = typeof giftOrders.$inferSelect;
export type GiftOrderItem = typeof giftOrderItems.$inferSelect;
export type Rsvp = typeof rsvps.$inferSelect;
export type Message = typeof messages.$inferSelect;
