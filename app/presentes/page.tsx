import { GiftList } from "@/components/public/GiftList";
import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { getActiveGifts, getSettings } from "@/lib/queries";

export default async function GiftsPage() {
  const settings = await getSettings();
  const gifts = await getActiveGifts();

  return (
    <PublicShell settings={settings}>
      <PageHero
        eyebrow="Com carinho"
        title="Lista de presentes"
        subtitle="Você pode escolher até três presentes por compra. O pagamento é feito via PIX na conta do casal."
      />
      <GiftList gifts={gifts} />
    </PublicShell>
  );
}
