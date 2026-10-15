"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatBRL } from "@/lib/format";

export type GiftCard = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  image: string | null;
};

const STORAGE_KEY = "casorio-cart";

export function GiftList({ gifts }: { gifts: GiftCard[] }) {
  const [cart, setCart] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as number[];
        setCart(parsed.filter((id) => gifts.some((gift) => gift.id === id)));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, [gifts]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const selected = useMemo(
    () => gifts.filter((gift) => cart.includes(gift.id)),
    [gifts, cart],
  );
  const total = selected.reduce((sum, gift) => sum + gift.priceCents, 0);

  function toggle(id: number) {
    setCart((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-6 sm:grid-cols-2">
        {gifts.map((gift) => {
          const inCart = cart.includes(gift.id);
          const full = cart.length >= 3 && !inCart;
          return (
            <article key={gift.id} className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm">
              <div className="flex h-44 items-center justify-center bg-[color-mix(in_srgb,var(--color-accent)_18%,white)]">
                {gift.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={gift.image} alt={gift.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-heading text-5xl text-[var(--color-primary)]/40">♡</span>
                )}
              </div>
              <div className="space-y-3 p-5">
                <h2 className="font-heading text-2xl">{gift.name}</h2>
                {gift.description ? <p className="text-sm leading-6 opacity-75">{gift.description}</p> : null}
                <p className="text-lg font-semibold text-[var(--color-primary)]">{formatBRL(gift.priceCents)}</p>
                <button
                  type="button"
                  disabled={full}
                  onClick={() => toggle(gift.id)}
                  className={`btn w-full ${inCart ? "btn-ghost" : "btn-primary"} disabled:opacity-50`}
                >
                  {inCart ? "Remover" : full ? "Limite de 3" : "Presentear"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="h-fit rounded-2xl border border-black/8 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="font-heading text-2xl">Meu carrinho</h2>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-60">Até 3 presentes por compra</p>
        {selected.length === 0 ? (
          <p className="mt-6 text-sm opacity-70">Seu carrinho está vazio.</p>
        ) : (
          <ul className="mt-5 space-y-3">
            {selected.map((gift) => (
              <li key={gift.id} className="flex items-start justify-between gap-3 text-sm">
                <span>{gift.name}</span>
                <span className="whitespace-nowrap text-[var(--color-primary)]">{formatBRL(gift.priceCents)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 flex justify-between border-t border-black/5 pt-4 font-semibold">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </p>
        {selected.length > 0 ? (
          <Link href="/presentes/checkout" className="btn btn-primary mt-5 w-full">
            Finalizar
          </Link>
        ) : null}
      </aside>
    </div>
  );
}
