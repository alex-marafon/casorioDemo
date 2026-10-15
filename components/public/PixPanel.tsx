"use client";

import { useState } from "react";
import { claimOrder } from "@/app/actions/orders";

export function PixPanel({
  orderId,
  payload,
  qrDataUrl,
  receiverName,
  status,
}: {
  orderId: number;
  payload: string;
  qrDataUrl: string;
  receiverName: string;
  status: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-10 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrDataUrl} alt="QR Code PIX" className="mx-auto w-64 rounded-xl bg-white p-3 shadow-sm" />
      <div className="rounded-xl border border-[var(--color-accent)]/40 bg-white/80 px-4 py-3 text-left">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">Recebedor</p>
        <p className="mt-1 font-heading text-xl text-[var(--color-secondary)]">{receiverName}</p>
        <p className="mt-2 text-xs leading-5 opacity-70">
          Confira se o nome no app do banco é o mesmo antes de confirmar o pagamento.
        </p>
      </div>
      <p className="text-sm opacity-75">
        Escaneie o QR Code ou copie o código PIX. O valor cai direto na conta cadastrada pelos noivos.
      </p>
      <button type="button" className="btn btn-ghost w-full" onClick={copy}>
        {copied ? "Copiado" : "Copiar código PIX"}
      </button>
      <textarea readOnly className="field h-28 text-xs" value={payload} />
      {status === "pending" ? (
        <form action={claimOrder}>
          <input type="hidden" name="id" value={orderId} />
          <button className="btn btn-primary w-full" type="submit">
            Já paguei
          </button>
        </form>
      ) : (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {status === "confirmed"
            ? "O casal já confirmou o seu presente. Obrigado!"
            : "Registramos que você pagou. O casal vai conferir no painel."}
        </p>
      )}
    </div>
  );
}
