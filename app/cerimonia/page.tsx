import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { getSettings, getVenueByType } from "@/lib/queries";

export default async function CeremonyPage() {
  const settings = await getSettings();
  const venue = await getVenueByType("ceremony");

  return (
    <PublicShell settings={settings}>
      <PageHero eyebrow="O grande dia" title={venue?.title || "Cerimônia"} subtitle={venue?.place} />
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
