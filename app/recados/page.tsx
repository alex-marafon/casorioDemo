import { submitMessage } from "@/app/actions/messages";
import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { getApprovedMessages, getSettings } from "@/lib/queries";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erro?: string }>;
}) {
  const settings = await getSettings();
  const recados = await getApprovedMessages();
  const { ok, erro } = await searchParams;

  return (
    <PublicShell settings={settings}>
      <PageHero title="Deixe seu recado para os noivos" />
      <div className="mx-auto max-w-3xl px-4 py-10">
        {ok ? (
          <p className="mb-8 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-900">
            Seu recado foi enviado e aguarda aprovação do casal.
          </p>
        ) : (
          <form action={submitMessage} className="mb-12 space-y-4 rounded-2xl border border-black/8 bg-white p-6">
            {erro ? <p className="text-sm text-red-700">Preencha nome e recado.</p> : null}
            <label className="block">
              <span className="admin-label">Seu nome</span>
              <input className="field" name="name" required />
            </label>
            <label className="block">
              <span className="admin-label">E-mail</span>
              <input className="field" type="email" name="email" />
            </label>
            <label className="block">
              <span className="admin-label">Recado</span>
              <textarea className="field h-32" name="body" required maxLength={400} />
            </label>
            <button className="btn btn-primary" type="submit">
              Enviar recado
            </button>
          </form>
        )}

        <div className="space-y-6">
          {recados.map((recado) => (
            <article key={recado.id} className="rounded-2xl border border-black/8 bg-white p-6">
              <h2 className="font-heading text-2xl text-[var(--color-primary)]">{recado.name}</h2>
              <p className="mt-3 leading-7 whitespace-pre-line">{recado.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
