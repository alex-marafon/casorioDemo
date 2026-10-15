import Link from "next/link";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/site", label: "Site" },
  { href: "/admin/locais", label: "Locais" },
  { href: "/admin/tema", label: "Tema" },
  { href: "/admin/presentes", label: "Presentes" },
  { href: "/admin/pix", label: "PIX" },
  { href: "/admin/confirmacoes", label: "Confirmações" },
  { href: "/admin/recados", label: "Recados" },
  { href: "/admin/pedidos", label: "Pedidos" },
];

export function AdminShell({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  return (
    <div className="min-h-screen bg-[#f4efe8] text-[#3d3229]">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-black/5 bg-[#3d3229] text-[#f7f1ea] lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="px-5 py-6">
            <p className="font-heading text-2xl">Casorio</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">Painel do casal</p>
          </div>
          <nav className="flex flex-wrap gap-2 px-4 pb-4 lg:flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 pb-6 text-xs text-white/50">
            <p>Logado como {username}</p>
            <form action={logout} className="mt-3">
              <button className="underline" type="submit">
                Sair
              </button>
            </form>
            <Link href="/" className="mt-3 block underline">
              Ver site
            </Link>
          </div>
        </aside>
        <div className="px-4 py-8 md:px-10">{children}</div>
      </div>
    </div>
  );
}

export function SavedNotice({ ok }: { ok?: string }) {
  if (!ok) return null;
  return (
    <p className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Alterações salvas.</p>
  );
}
