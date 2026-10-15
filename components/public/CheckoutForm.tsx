"use client";

import { useEffect, useMemo, useState } from "react";
import { createOrder } from "@/app/actions/orders";
import { formatBRL } from "@/lib/format";

type GiftCard = {
  id: number;
  name: string;
  priceCents: number;
};

export function CheckoutForm({
  gifts,
  pixConfigured,
  error,
}: {
  gifts: GiftCard[];
  pixConfigured: boolean;
  error?: string;
}) {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("casorio-cart");
    if (!raw) return;
    try {
      setIds(JSON.parse(raw) as number[]);
    } catch {
      setIds([]);
    }
  }, []);

  const selected = useMemo(() => gifts.filter((gift) => ids.includes(gift.id)), [gifts, ids]);
  const total = selected.reduce((sum, gift) => sum + gift.priceCents, 0);

  const messages: Record<string, string> = {
    nome: "Informe o seu nome para o casal.",
    limite: "Escolha no máximo 3 presentes.",
    pix: "A chave PIX não está configurada ou é inválida. Peça ao casal para revisar em Admin → PIX.",
  };

  return (
    <form action={createOrder} className="mx-auto max-w-xl space-y-5 px-4 py-10">
      {error && messages[error] ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{messages[error]}</p>
      ) : null}
      {!pixConfigured ? (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          O casal ainda está configurando a chave PIX no painel.
        </p>
      ) : null}
      <input type="hidden" name="giftIds" value={ids.join(",")} />
      <div className="rounded-2xl border border-black/8 bg-white p-5">
        <h2 className="font-heading text-2xl">Resumo</h2>
        {selected.length === 0 ? (
          <p className="mt-3 text-sm opacity-70">Nenhum presente selecionado.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {selected.map((gift) => (
              <li key={gift.id} className="flex justify-between">
                <span>{gift.name}</span>
                <span>{formatBRL(gift.priceCents)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 flex justify-between border-t border-black/5 pt-3 font-semibold">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </p>
      </div>
      <label className="block">
        <span className="admin-label">Seu nome</span>
        <input className="field" name="guestName" required placeholder="Nome que o casal verá" />
      </label>
      <label className="block">
        <span className="admin-label">E-mail (opcional)</span>
        <input className="field" type="email" name="guestEmail" placeholder="voce@email.com" />
      </label>
      <button className="btn btn-primary w-full" disabled={!pixConfigured || selected.length === 0} type="submit">
        Gerar PIX
      </button>
    </form>
  );
}
