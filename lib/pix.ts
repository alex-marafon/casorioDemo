export const PIX_KEY_TYPES = ["cpf", "email", "phone", "random"] as const;
export type PixKeyType = (typeof PIX_KEY_TYPES)[number];

export function parsePixKeyType(value: string | null | undefined): PixKeyType {
  if (value === "cpf" || value === "email" || value === "phone" || value === "random") {
    return value;
  }
  return "random";
}

export function normalizePixKey(key: string, type: PixKeyType): string {
  const trimmed = key.trim();
  switch (type) {
    case "cpf":
      return trimmed.replace(/\D/g, "");
    case "email":
      return trimmed.toLowerCase();
    case "phone": {
      if (trimmed.startsWith("+")) {
        const digits = trimmed.replace(/\D/g, "");
        return digits ? `+${digits}` : "";
      }
      const digits = trimmed.replace(/\D/g, "");
      if (digits.startsWith("55") && digits.length >= 12) {
        return `+${digits}`;
      }
      return digits ? `+55${digits}` : "";
    }
    case "random":
      return trimmed.toLowerCase();
  }
}

export function validatePixKey(
  key: string,
  type: PixKeyType,
): { ok: true; normalized: string } | { ok: false; message: string } {
  const normalized = normalizePixKey(key, type);
  if (!normalized) {
    return { ok: false, message: "Informe a chave PIX." };
  }

  switch (type) {
    case "cpf":
      if (normalized.length !== 11) {
        return { ok: false, message: "CPF deve ter 11 dígitos (somente números)." };
      }
      return { ok: true, normalized };
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        return { ok: false, message: "E-mail inválido." };
      }
      return { ok: true, normalized };
    case "phone":
      if (!/^\+55\d{10,11}$/.test(normalized)) {
        return {
          ok: false,
          message: "Telefone inválido. Use DDD + número (ex.: 66999999999 ou +5566999999999).",
        };
      }
      return { ok: true, normalized };
    case "random":
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(normalized)
      ) {
        return {
          ok: false,
          message: "Chave aleatória deve ser um UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).",
        };
      }
      return { ok: true, normalized };
  }
}

function tlv(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
      else crc <<= 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function sanitize(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .slice(0, max)
    .toUpperCase();
}

export function buildPixPayload(options: {
  key: string;
  keyType: PixKeyType;
  name: string;
  city: string;
  amountCents: number;
  txid: string;
}) {
  const validation = validatePixKey(options.key, options.keyType);
  if (!validation.ok) {
    throw new Error(validation.message);
  }

  const amount = (options.amountCents / 100).toFixed(2);
  const merchant = tlv("00", "br.gov.bcb.pix") + tlv("01", validation.normalized);
  const additional = tlv("05", options.txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "CASORIO");
  const payload =
    tlv("00", "01") +
    tlv("26", merchant) +
    tlv("52", "0000") +
    tlv("53", "986") +
    tlv("54", amount) +
    tlv("58", "BR") +
    tlv("59", sanitize(options.name, 25) || "CASAL") +
    tlv("60", sanitize(options.city, 15) || "CIDADE") +
    tlv("62", additional) +
    "6304";
  return payload + crc16(payload);
}
