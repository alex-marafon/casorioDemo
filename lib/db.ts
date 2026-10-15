import "server-only";

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3-multiple-ciphers";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

function sqliteKey() {
  const key = process.env.SQLITE_KEY?.trim() ?? "";
  if (key.length < 16) {
    throw new Error("Defina SQLITE_KEY no .env com pelo menos 16 caracteres.");
  }
  return key;
}

function sqliteFilePath() {
  const relative = process.env.SQLITE_PATH?.trim() || path.join("data", "casorio.db");
  return path.isAbsolute(relative) ? relative : path.join(process.cwd(), relative);
}

const dbPath = sqliteFilePath();
const dataDir = path.dirname(dbPath);

let sqlite: InstanceType<typeof Database> | undefined;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | undefined;
let initialized = false;

function createTables(database: InstanceType<typeof Database>) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY,
      site_title TEXT NOT NULL DEFAULT 'Natália e Renato | Site do Casal',
      site_description TEXT NOT NULL DEFAULT 'Site de casamento de Natália Cunha e Renato Oliveira',
      favicon TEXT,
      bride_name TEXT NOT NULL,
      groom_name TEXT NOT NULL,
      wedding_date TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      home_intro TEXT NOT NULL,
      home_text TEXT NOT NULL,
      rsvp_deadline TEXT NOT NULL,
      primary_color TEXT NOT NULL,
      secondary_color TEXT NOT NULL,
      background_color TEXT NOT NULL,
      accent_color TEXT NOT NULL,
      heading_font TEXT NOT NULL,
      body_font TEXT NOT NULL,
      hero_image TEXT,
      floral_enabled INTEGER NOT NULL DEFAULT 0,
      floral_style TEXT NOT NULL DEFAULT 'roses',
      pix_key_type TEXT NOT NULL,
      pix_key TEXT NOT NULL,
      pix_name TEXT NOT NULL,
      pix_city TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS venues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      place TEXT NOT NULL,
      address TEXT NOT NULL,
      time TEXT NOT NULL,
      description TEXT NOT NULL,
      map_url TEXT
    );
    CREATE TABLE IF NOT EXISTS gifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price_cents INTEGER NOT NULL,
      image TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      quantity INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS gift_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guest_name TEXT NOT NULL,
      guest_email TEXT NOT NULL DEFAULT '',
      total_cents INTEGER NOT NULL,
      pix_payload TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS gift_order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      gift_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price_cents INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS rsvps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      attending INTEGER NOT NULL,
      adults INTEGER NOT NULL DEFAULT 1,
      children INTEGER NOT NULL DEFAULT 0,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    );
  `);
}

function migrateSiteSettingsColumns(database: InstanceType<typeof Database>) {
  const cols = database.prepare("PRAGMA table_info(site_settings)").all() as { name: string }[];
  const names = new Set(cols.map((c) => c.name));
  if (!names.has("floral_enabled")) {
    database.exec("ALTER TABLE site_settings ADD COLUMN floral_enabled INTEGER NOT NULL DEFAULT 0");
  }
  if (!names.has("floral_style")) {
    database.exec("ALTER TABLE site_settings ADD COLUMN floral_style TEXT NOT NULL DEFAULT 'roses'");
  }
  if (!names.has("site_title")) {
    database.exec(
      "ALTER TABLE site_settings ADD COLUMN site_title TEXT NOT NULL DEFAULT 'Natália e Renato | Site do Casal'",
    );
  }
  if (!names.has("site_description")) {
    database.exec(
      "ALTER TABLE site_settings ADD COLUMN site_description TEXT NOT NULL DEFAULT 'Site de casamento de Natália Cunha e Renato Oliveira'",
    );
  }
  if (!names.has("favicon")) {
    database.exec("ALTER TABLE site_settings ADD COLUMN favicon TEXT");
  }
}

function seed(database: InstanceType<typeof Database>) {
  const adminCount = database.prepare("SELECT COUNT(*) as n FROM admin_users").get() as { n: number };
  if (adminCount.n === 0) {
    const passwordHash = bcrypt.hashSync("admin@admin", 10);
    database.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run("admin", passwordHash);
  }

  const settingsCount = database.prepare("SELECT COUNT(*) as n FROM site_settings").get() as { n: number };
  if (settingsCount.n === 0) {
    database
      .prepare(
        `INSERT INTO site_settings (
          id, site_title, site_description, favicon, bride_name, groom_name, wedding_date, city, state, home_intro, home_text, rsvp_deadline,
          primary_color, secondary_color, background_color, accent_color, heading_font, body_font, hero_image,
          floral_enabled, floral_style, pix_key_type, pix_key, pix_name, pix_city
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        "Natália e Renato | Site do Casal",
        "Site de casamento de Natália Cunha e Renato Oliveira",
        null,
        "Natália Cunha",
        "Renato Oliveira",
        "2025-12-06",
        "Sinop",
        "Mato Grosso",
        "Estamos muito felizes e contamos com a sua presença neste grande dia!",
        "O que nós mais quereremos é a sua presença, mas se quiser nos presentear temos uma lista preparada, só não se prenda a ela, todo gesto de carinho é bem vindo, fique a vontade para nos surpreender do seu jeito!\n\nEsperamos você, para este dia especial!\n\nAh, é importante confirmar sua presença até o dia 05/11.",
        "2025-11-05",
        "#8B6914",
        "#5C4033",
        "#F7F1EA",
        "#C9A66B",
        "playfair",
        "lato",
        null,
        0,
        "roses",
        "email",
        "",
        "Renato Oliveira",
        "SINOP",
      );
  }

  const venueCount = database.prepare("SELECT COUNT(*) as n FROM venues").get() as { n: number };
  if (venueCount.n === 0) {
    database
      .prepare(
        "INSERT INTO venues (type, title, place, address, time, description, map_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .run(
        "ceremony",
        "Cerimônia",
        "Paróquia São Camilo de Léllis - Sinop/MT",
        "Jardim Primaveras, Sinop - MT",
        "16:00",
        "Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa união será abençoada diante de Deus!\n\nA cerimônia acontecerá no dia 06 de dezembro de 2025, pontualmente às 16h, na Paróquia São Camilo de Léllis - Jardim Primaveras, Sinop - MT.",
        "https://maps.google.com/?q=Par%C3%B3quia+S%C3%A3o+Camilo+de+L%C3%A9llis+Sinop",
      );
    database
      .prepare(
        "INSERT INTO venues (type, title, place, address, time, description, map_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .run(
        "reception",
        "Recepção",
        "Chácara Abreu - Sinop/MT",
        "Sinop - MT",
        "Após a cerimônia",
        "Depois do \"sim\", esperamos vocês na Chácara Abreu, brindaremos juntos este momento especial, com jantar e alegria ao lado de quem mais amamos.",
        "https://maps.google.com/?q=Ch%C3%A1cara+Abreu+Sinop",
      );
  }

  const giftCount = database.prepare("SELECT COUNT(*) as n FROM gifts").get() as { n: number };
  if (giftCount.n === 0) {
    const samples: Array<[string, string, number, number]> = [
      ["Jogo de toalhas", "Jogo completo para o lar do casal.", 18000, 1],
      ["Jogo de panelas", "Conjunto antiaderente para o dia a dia.", 45000, 2],
      ["Liquidificador", "Para receitas e sucos em casa.", 22000, 3],
      ["Air fryer", "Praticidade na cozinha nova.", 38000, 4],
      ["Jogo de taças", "Para brindar os momentos especiais.", 16000, 5],
      ["Cafeteira", "O café da manhã dos noivos.", 29000, 6],
      ["Jogo de cama", "Conforto para a nova casa.", 32000, 7],
      ["Vale lua de mel", "Uma contribuição para a viagem dos noivos.", 50000, 8],
    ];
    const stmt = database.prepare(
      "INSERT INTO gifts (name, description, price_cents, image, active, quantity, sort_order) VALUES (?, ?, ?, NULL, 1, 1, ?)",
    );
    for (const [name, description, price, order] of samples) {
      stmt.run(name, description, price, order);
    }
  }

  const messageCount = database.prepare("SELECT COUNT(*) as n FROM messages").get() as { n: number };
  if (messageCount.n === 0) {
    const now = new Date().toISOString();
    const recados: Array<[string, string]> = [
      [
        "Kati Amorim",
        "Naty e Renato, é uma alegria celebrar este momento tão especial! Que Deus cubra essa união com proteção, sabedoria e amor todos os dias.",
      ],
      [
        "Aline Benatti",
        "Que o amor e a misericórdia de Deus se manifestem em todos os dias de suas vidas, abençoando e fortalecendo a família de vocês!",
      ],
      [
        "Vanilda Gomes dos Santos",
        "Que a harmonia e o amor estejam sempre presentes no lar de vocês. Felicidades! Deus os abençoe sempre!",
      ],
    ];
    const stmt = database.prepare(
      "INSERT INTO messages (name, email, body, status, created_at) VALUES (?, '', ?, 'approved', ?)",
    );
    for (const [name, body] of recados) stmt.run(name, body, now);
  }
}

function openEncryptedDatabase() {
  const key = sqliteKey();
  fs.mkdirSync(dataDir, { recursive: true });
  const database = new Database(dbPath);
  database.key(Buffer.from(key, "utf8"));
  try {
    database.prepare("SELECT 1").get();
  } catch {
    database.close();
    throw new Error("Não foi possível abrir o SQLite. Confira SQLITE_KEY no .env.");
  }
  database.pragma("journal_mode = WAL");
  return database;
}

export function getDb() {
  if (!dbInstance) {
    sqlite = openEncryptedDatabase();
    createTables(sqlite);
    migrateSiteSettingsColumns(sqlite);
    if (!initialized) {
      seed(sqlite);
      initialized = true;
    }
    dbInstance = drizzle(sqlite as unknown as import("better-sqlite3").Database, { schema });
  }
  return dbInstance;
}
