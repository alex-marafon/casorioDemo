import { setMessageStatus } from "@/app/actions/messages";
import { SavedNotice } from "@/components/admin/AdminShell";
import { formatDateTime } from "@/lib/format";
import { getAllMessages } from "@/lib/queries";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const rows = await getAllMessages();
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-4xl">Recados</h1>
      <p className="mt-2 mb-6 opacity-70">Aprove ou oculte recados do mural público.</p>
      <SavedNotice ok={ok} />
      <div className="space-y-4">
        {rows.map((row) => (
          <article key={row.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-2xl">{row.name}</h2>
              <span className="text-xs uppercase tracking-[0.12em] text-[#8b6914]">{row.status}</span>
            </div>
            <p className="mt-3 leading-7">{row.body}</p>
            <p className="mt-2 text-xs opacity-50">
              {row.email} · {formatDateTime(row.createdAt)}
            </p>
            <div className="mt-4 flex gap-2">
              <form action={setMessageStatus}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="status" value="approved" />
                <button className="btn btn-primary" type="submit">
                  Aprovar
                </button>
              </form>
              <form action={setMessageStatus}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="status" value="hidden" />
                <button className="btn btn-ghost" type="submit">
                  Ocultar
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
