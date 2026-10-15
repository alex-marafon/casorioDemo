import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { getSettings, getVenueByType } from "@/lib/queries";

export default async function ReceptionPage() {
  const settings = await getSettings();
  const venue = await getVenueByType("reception");

  return (
    <PublicShell settings={settings}>
      <PageHero eyebrow="Depois do sim" title={venue?.title || "Recepção"} subtitle={venue?.place} />
      <article className="mx-auto max-w-3xl px-4 py-12 leading-8">
        <p className="text-sm tracking-[0.18em] uppercase text-[var(--color-primary)]">{venue?.time}</p>
        <p className="mt-2 opacity-80">{venue?.address}</p>
        <div className="mt-8 whitespace-pre-line">{venue?.description}</div>
        {venue?.mapUrl ? (
          <a href={venue.mapUrl} target="_blank" rel="noreferrer" className="btn btn-ghost mt-8">
            Ver no mapa
          </a>
        ) : null}
      </article>
    </PublicShell>
  );
}
