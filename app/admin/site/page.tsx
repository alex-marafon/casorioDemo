import { clearFavicon, updateSite } from "@/app/actions/site";
import { SavedNotice } from "@/components/admin/AdminShell";
import { getSettings } from "@/lib/queries";

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const settings = await getSettings();
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-4xl">Site</h1>
      <p className="mt-2 mb-6 opacity-70">Nome e ícone da aba do navegador, dados do casal e textos da home.</p>
      <SavedNotice ok={ok} />
      <form
        action={updateSite}
        encType="multipart/form-data"
        className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="space-y-4 rounded-xl border border-black/8 bg-[#faf8f5] p-4">
          <p className="text-sm font-medium">Aba do navegador</p>
          <label className="block">
            <span className="admin-label">Nome da página (título)</span>
            <input className="admin-field" name="siteTitle" defaultValue={settings.siteTitle} required />
          </label>
          <label className="block">
            <span className="admin-label">Descrição (SEO)</span>
            <textarea
              className="admin-field h-20"
              name="siteDescription"
              defaultValue={settings.siteDescription}
              required
            />
          </label>
          <label className="block">
            <span className="admin-label">Ícone (favicon)</span>
            <input className="admin-field" type="file" name="favicon" accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,image/svg+xml,.ico" />
            <p className="mt-1 text-xs opacity-60">PNG quadrado, recomendado 32×32 ou 64×64 px.</p>
          </label>
          {settings.favicon ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings.favicon} alt="Favicon atual" className="h-10 w-10 rounded object-cover" />
              <span className="text-xs opacity-60">{settings.favicon}</span>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="admin-label">Nome da noiva</span>
            <input className="admin-field" name="brideName" defaultValue={settings.brideName} required />
          </label>
          <label>
            <span className="admin-label">Nome do noivo</span>
            <input className="admin-field" name="groomName" defaultValue={settings.groomName} required />
          </label>
          <label>
            <span className="admin-label">Data do casamento</span>
            <input className="admin-field" type="date" name="weddingDate" defaultValue={settings.weddingDate} required />
          </label>
          <label>
            <span className="admin-label">Prazo do RSVP</span>
            <input className="admin-field" type="date" name="rsvpDeadline" defaultValue={settings.rsvpDeadline} required />
          </label>
          <label>
            <span className="admin-label">Cidade</span>
            <input className="admin-field" name="city" defaultValue={settings.city} required />
          </label>
          <label>
            <span className="admin-label">Estado</span>
            <input className="admin-field" name="state" defaultValue={settings.state} required />
          </label>
        </div>
        <label className="block">
          <span className="admin-label">Frase de abertura</span>
          <textarea className="admin-field h-24" name="homeIntro" defaultValue={settings.homeIntro} />
        </label>
        <label className="block">
          <span className="admin-label">Texto da home</span>
          <textarea className="admin-field h-40" name="homeText" defaultValue={settings.homeText} />
        </label>
        <button className="btn btn-primary" type="submit">
          Salvar
        </button>
      </form>
      {settings.favicon ? (
        <form action={clearFavicon} className="mt-4">
          <button className="text-sm underline" type="submit">
            Remover ícone personalizado
          </button>
        </form>
      ) : null}
    </div>
  );
}
