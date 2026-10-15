import { updateVenue } from "@/app/actions/site";
import { SavedNotice } from "@/components/admin/AdminShell";
import { getVenues } from "@/lib/queries";

export default async function AdminVenuesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const venues = await getVenues();
  const { ok } = await searchParams;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-heading text-4xl">Locais</h1>
        <p className="mt-2 opacity-70">Cerimônia e recepção.</p>
      </div>
      <SavedNotice ok={ok} />
      {venues.map((venue) => (
        <form key={venue.id} action={updateVenue} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <input type="hidden" name="id" value={venue.id} />
          <h2 className="font-heading text-2xl">{venue.type === "ceremony" ? "Cerimônia" : "Recepção"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="admin-label">Título</span>
              <input className="admin-field" name="title" defaultValue={venue.title} />
            </label>
            <label>
              <span className="admin-label">Horário</span>
              <input className="admin-field" name="time" defaultValue={venue.time} />
            </label>
            <label className="sm:col-span-2">
              <span className="admin-label">Local</span>
              <input className="admin-field" name="place" defaultValue={venue.place} />
            </label>
            <label className="sm:col-span-2">
              <span className="admin-label">Endereço</span>
              <input className="admin-field" name="address" defaultValue={venue.address} />
            </label>
            <label className="sm:col-span-2">
              <span className="admin-label">Link do mapa</span>
              <input className="admin-field" name="mapUrl" defaultValue={venue.mapUrl || ""} />
            </label>
          </div>
          <label className="block">
            <span className="admin-label">Descrição</span>
            <textarea className="admin-field h-32" name="description" defaultValue={venue.description} />
          </label>
          <button className="btn btn-primary" type="submit">
            Salvar
          </button>
        </form>
      ))}
    </div>
  );
}
