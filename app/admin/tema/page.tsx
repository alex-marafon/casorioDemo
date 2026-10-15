import { clearHeroImage, updateTheme } from "@/app/actions/site";
import { FloralThemeOptions } from "@/components/admin/FloralThemeOptions";
import { SavedNotice } from "@/components/admin/AdminShell";
import { parseFloralStyle } from "@/lib/floral";
import { getSettings } from "@/lib/queries";

export default async function AdminThemePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const settings = await getSettings();
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-4xl">Tema</h1>
      <p className="mt-2 mb-6 opacity-70">Cores, fontes, imagem de capa e florais na home.</p>
      <SavedNotice ok={ok} />
      <form action={updateTheme} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="admin-label">Cor primária</span>
            <input className="admin-field h-12" type="color" name="primaryColor" defaultValue={settings.primaryColor} />
          </label>
          <label>
            <span className="admin-label">Cor secundária</span>
            <input className="admin-field h-12" type="color" name="secondaryColor" defaultValue={settings.secondaryColor} />
          </label>
          <label>
            <span className="admin-label">Fundo</span>
            <input className="admin-field h-12" type="color" name="backgroundColor" defaultValue={settings.backgroundColor} />
          </label>
          <label>
            <span className="admin-label">Destaque</span>
            <input className="admin-field h-12" type="color" name="accentColor" defaultValue={settings.accentColor} />
          </label>
          <label>
            <span className="admin-label">Fonte dos títulos</span>
            <select className="admin-field" name="headingFont" defaultValue={settings.headingFont}>
              <option value="playfair">Playfair Display</option>
              <option value="cormorant">Cormorant Garamond</option>
              <option value="vibes">Great Vibes</option>
            </select>
          </label>
          <label>
            <span className="admin-label">Fonte do texto</span>
            <select className="admin-field" name="bodyFont" defaultValue={settings.bodyFont}>
              <option value="lato">Lato</option>
              <option value="source">Source Sans</option>
              <option value="lora">Lora</option>
            </select>
          </label>
        </div>
        <FloralThemeOptions
          enabledDefault={settings.floralEnabled === 1}
          styleDefault={parseFloralStyle(settings.floralStyle)}
        />
        <label className="block">
          <span className="admin-label">Foto de capa</span>
          <input className="admin-field" type="file" name="heroImage" accept="image/*" />
        </label>
        {settings.heroImage ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.heroImage} alt="Capa atual" className="h-20 rounded-lg object-cover" />
          </div>
        ) : null}
        <button className="btn btn-primary" type="submit">
          Salvar tema
        </button>
      </form>
      {settings.heroImage ? (
        <form action={clearHeroImage} className="mt-4">
          <button className="text-sm underline" type="submit">
            Remover foto de capa
          </button>
        </form>
      ) : null}
    </div>
  );
}
