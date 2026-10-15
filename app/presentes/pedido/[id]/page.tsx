import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { PixPanel } from "@/components/public/PixPanel";
import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { formatBRL } from "@/lib/format";
import { getOrderById, getSettings } from "@/lib/queries";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const settings = await getSettings();
  const order = await getOrderById(Number(id));
  if (!order) notFound();

  const qrDataUrl = await QRCode.toDataURL(order.pixPayload, { margin: 1, width: 320 });

  return (
    <PublicShell settings={settings}>
      <PageHero
        title="Pague com PIX"
        subtitle={`${order.guestName}, o total é ${formatBRL(order.totalCents)}.`}
      />
      <ul className="mx-auto max-w-lg px-4 text-sm opacity-80">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between border-b border-black/5 py-2">
            <span>{item.name}</span>
            <span>{formatBRL(item.priceCents)}</span>
          </li>
        ))}
      </ul>
      <PixPanel
        orderId={order.id}
        payload={order.pixPayload}
        qrDataUrl={qrDataUrl}
        receiverName={settings.pixName}
        status={order.status}
      />
    </PublicShell>
  );
}
