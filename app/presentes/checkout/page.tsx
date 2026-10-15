import { CheckoutForm } from "@/components/public/CheckoutForm";
import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { getActiveGifts, getSettings } from "@/lib/queries";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const settings = await getSettings();
  const gifts = await getActiveGifts();
  const { erro } = await searchParams;

  return (
    <PublicShell settings={settings}>
      <PageHero title="Finalizar presente" subtitle="Confirme seus dados para gerar o PIX." />
      <CheckoutForm gifts={gifts} pixConfigured={Boolean(settings.pixKey)} error={erro} />
    </PublicShell>
  );
}
