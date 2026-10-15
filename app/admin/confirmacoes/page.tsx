import { formatDateTime } from "@/lib/format";
import { getAllRsvps } from "@/lib/queries";

export default async function AdminRsvpPage() {
  const rows = await getAllRsvps();
  const going = rows.filter((row) => row.attending === 1);
  const guests = going.reduce((sum, row) => sum + row.adults + row.children, 0);

  return (
    <div>
      <h1 className="font-heading text-4xl">Confirmações</h1>
      <p className="mt-2 mb-8 opacity-70">
        {going.length} respostas “sim” · {guests} pessoas
      </p>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs uppercase tracking-[0.12em] text-[#8b6914]">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Presença</th>
              <th className="px-4 py-3">Adultos</th>
              <th className="px-4 py-3">Crianças</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Quando</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-black/5 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium">{row.name}</p>
                  {row.notes ? <p className="mt-1 text-xs opacity-60">{row.notes}</p> : null}
                </td>
                <td className="px-4 py-3">{row.attending ? "Sim" : "Não"}</td>
                <td className="px-4 py-3">{row.adults}</td>
                <td className="px-4 py-3">{row.children}</td>
                <td className="px-4 py-3">
                  <p>{row.email}</p>
                  <p className="text-xs opacity-60">{row.phone}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(row.createdAt)}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center opacity-60" colSpan={6}>
                  Nenhuma confirmação ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
