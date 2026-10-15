import Link from "next/link";
import { FloralHomeWreath } from "@/components/public/FloralDecor";
import { PublicShell } from "@/components/public/PublicShell";
import { formatWeddingDate } from "@/lib/format";
import { parseFloralStyle } from "@/lib/floral";
import { getSettings } from "@/lib/queries";

export default async function HomePage() {
  const settings = await getSettings();
  const firstBride = settings.brideName.split(" ")[0];
  const firstGroom = settings.groomName.split(" ")[0];
  const floralStyle = parseFloralStyle(settings.floralStyle);

  return (
    <PublicShell settings={settings}>
      <section
        className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
        style={
          settings.heroImage
            ? {
                backgroundImage: `linear-gradient(rgba(247,241,234,0.72), rgba(247,241,234,0.86)), url(${settings.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {settings.floralEnabled === 1 ? <FloralHomeWreath style={floralStyle} /> : null}
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-primary)]">O casamento de</p>
          <h1 className="mt-4 font-heading text-5xl leading-tight text-[var(--color-secondary)] md:text-7xl">
            {firstBride?.toUpperCase()} + {firstGroom?.toUpperCase()}
          </h1>
          <p className="mt-6 text-lg tracking-[0.28em] uppercase">{formatWeddingDate(settings.weddingDate)}</p>
          <p className="mt-2 text-sm tracking-[0.2em] uppercase opacity-70">
            {settings.city} · {settings.state}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-heading text-3xl text-[var(--color-primary)]">{settings.homeIntro}</p>
        <div className="mt-8 space-y-4 whitespace-pre-line leading-8 opacity-85">{settings.homeText}</div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/confirme-presenca" className="btn btn-primary">
            Confirmar presença
          </Link>
          <Link href="/presentes" className="btn btn-ghost">
            Ver presentes
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
