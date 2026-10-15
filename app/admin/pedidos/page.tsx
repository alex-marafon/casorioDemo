import { confirmOrder } from "@/app/actions/orders";
import { SavedNotice } from "@/components/admin/AdminShell";
import { formatBRL, formatDateTime } from "@/lib/format";
import { getAllOrders } from "@/lib/queries";

const labels: Record<string, string> = {
  pending: "Aguardando pagamento",
  claimed: "Convidado marcou como pago",
  confirmed: "Confirmado",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const orders = await getAllOrders();
  const { ok } = await searchParams;

  return (
    <div className="max-w-4xl">
      <h1 className="font-heading text-4xl">Pedidos</h1>
      <p className="mt-2 mb-6 opacity-70">Presentes gerados via PIX. Confirme quando o valor cair na conta.</p>
      <SavedNotice ok={ok} />
      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-2xl">{order.guestName}</h2>
              <span className="text-xs uppercase tracking-[0.12em] text-[#8b6914]">
                {labels[order.status] || order.status}
              </span>
            </div>
            <p className="mt-1 text-sm opacity-60">
              {order.guestEmail} · {formatDateTime(order.createdAt)}
            </p>
            <ul className="mt-3 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>{formatBRL(item.priceCents)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold">Total {formatBRL(order.totalCents)}</p>
            {order.status !== "confirmed" ? (
              <form action={confirmOrder} className="mt-4">
                <input type="hidden" name="id" value={order.id} />
                <button className="btn btn-primary" type="submit">
                  Confirmar recebimento
                </button>
              </form>
            ) : null}
          </article>
        ))}
        {orders.length === 0 ? <p className="opacity-60">Nenhum pedido ainda.</p> : null}
      </div>
    </div>
  );
}
