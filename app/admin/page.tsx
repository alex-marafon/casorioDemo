import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { getDashboardCounts, getSettings } from "@/lib/queries";

export default async function AdminHomePage() {
  const settings = await getSettings();
  const counts = await getDashboardCounts();

  const cards = [
    { label: "Confirmações", value: String(counts.rsvps), href: "/admin/confirmacoes" },
    { label: "Convidados (sim)", value: String(counts.guests), href: "/admin/confirmacoes" },
    { label: "Recados pendentes", value: String(counts.pendingMessages), href: "/admin/recados" },
    { label: "PIX a conferir", value: String(counts.pendingOrders), href: "/admin/pedidos" },
    { label: "Presentes confirmados", value: formatBRL(counts.giftedCents), href: "/admin/pedidos" },
  ];

  return (
    <div>
      <h1 className="font-heading text-4xl">Olá, {settings.brideName.split(" ")[0]} e {settings.groomName.split(" ")[0]}</h1>
      <p className="mt-2 opacity-70">Gerencie o site, a lista de presentes e as confirmações.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.14em] text-[#8b6914]">{card.label}</p>
            <p className="mt-3 font-heading text-3xl">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
