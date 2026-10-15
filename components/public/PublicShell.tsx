import Link from "next/link";
import { FloralSiteDecor } from "@/components/public/FloralDecor";
import { initials } from "@/lib/format";
import { parseFloralStyle } from "@/lib/floral";
import type { SiteSettings } from "@/lib/schema";

const nav = [
  { href: "/", label: "Home" },
  { href: "/cerimonia", label: "Cerimônia" },
  { href: "/recepcao", label: "Recepção" },
  { href: "/presentes", label: "Lista de presentes" },
  { href: "/confirme-presenca", label: "Confirme sua presença" },
  { href: "/recados", label: "Recados" },
];

export function PublicShell({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const style = {
    "--color-primary": settings.primaryColor,
    "--color-secondary": settings.secondaryColor,
    "--color-bg": settings.backgroundColor,
    "--color-accent": settings.accentColor,
  } as React.CSSProperties;

  const floralStyle = parseFloralStyle(settings.floralStyle);
  const showFloral = settings.floralEnabled === 1;

  return (
    <div
      className="site-shell relative min-h-screen overflow-x-hidden"
      data-heading={settings.headingFont}
      data-body={settings.bodyFont}
      style={style}
    >
      {showFloral ? <FloralSiteDecor style={floralStyle} /> : null}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[var(--color-bg)]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent)] font-heading text-lg text-[var(--color-primary)]">
              {initials(settings.brideName)}
            </span>
            <span className="text-[var(--color-primary)]">♥</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent)] font-heading text-lg text-[var(--color-primary)]">
              {initials(settings.groomName)}
            </span>
            <span className="hidden font-heading text-sm tracking-[0.18em] uppercase text-[var(--color-secondary)] sm:block">
              {settings.brideName.split(" ")[0]} & {settings.groomName.split(" ")[0]}
            </span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs tracking-[0.14em] uppercase text-[var(--color-secondary)]">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--color-primary)]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 mt-16 border-t border-black/5 py-10 text-center text-sm text-[var(--color-secondary)]/70">
        <p className="font-heading text-2xl text-[var(--color-primary)]">
          {settings.brideName.split(" ")[0]} + {settings.groomName.split(" ")[0]}
        </p>
        <p className="mt-2 tracking-[0.2em] uppercase">Com carinho, esperamos você</p>
      </footer>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-black/5 px-4 py-16 text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs tracking-[0.28em] uppercase text-[var(--color-primary)]">{eyebrow}</p>
      ) : null}
      <h1 className="font-heading text-4xl text-[var(--color-secondary)] md:text-5xl">{title}</h1>
      {subtitle ? <p className="mx-auto mt-4 max-w-2xl leading-7 opacity-80">{subtitle}</p> : null}
    </section>
  );
}
