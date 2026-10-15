import { submitRsvp } from "@/app/actions/rsvp";
import { PageHero, PublicShell } from "@/components/public/PublicShell";
import { formatWeddingDate } from "@/lib/format";
import { getSettings } from "@/lib/queries";

export default async function RsvpPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erro?: string }>;
}) {
  const settings = await getSettings();
  const { ok, erro } = await searchParams;

  return (
    <PublicShell settings={settings}>
      <PageHero
        title="Confirme sua presença"
        subtitle={`Por favor, responda até ${formatWeddingDate(settings.rsvpDeadline)}.`}
      />
      <div className="mx-auto max-w-xl px-4 py-10">
        {ok ? (
          <p className="rounded-2xl bg-emerald-50 px-5 py-6 text-center text-emerald-900">
            Tudo certo! Já enviamos a sua resposta.
          </p>
        ) : (
          <form action={submitRsvp} className="space-y-4 rounded-2xl border border-black/8 bg-white p-6">
            {erro ? <p className="text-sm text-red-700">Preencha nome e e-mail.</p> : null}
            <label className="block">
              <span className="admin-label">Nome completo</span>
              <input className="field" name="name" required />
            </label>
            <fieldset className="space-y-2">
              <legend className="admin-label">Você irá ao evento?</legend>
              <label className="mr-4 text-sm">
                <input className="mr-2" type="radio" name="attending" value="sim" defaultChecked />
                Sim
              </label>
              <label className="text-sm">
                <input className="mr-2" type="radio" name="attending" value="nao" />
                Não
              </label>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="admin-label">Adultos</span>
                <input className="field" type="number" min={0} name="adults" defaultValue={1} />
              </label>
              <label className="block">
                <span className="admin-label">Crianças</span>
                <input className="field" type="number" min={0} name="children" defaultValue={0} />
              </label>
            </div>
            <label className="block">
              <span className="admin-label">E-mail</span>
              <input className="field" type="email" name="email" required />
            </label>
            <label className="block">
              <span className="admin-label">Telefone</span>
              <input className="field" name="phone" />
            </label>
            <label className="block">
              <span className="admin-label">Observações</span>
              <textarea className="field h-24" name="notes" />
            </label>
            <button className="btn btn-primary w-full" type="submit">
              Enviar resposta
            </button>
          </form>
        )}
      </div>
    </PublicShell>
  );
}
