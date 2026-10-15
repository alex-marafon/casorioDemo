import { createGift, deleteGift, updateGift } from "@/app/actions/gifts";
import { SavedNotice } from "@/components/admin/AdminShell";
import { formatBRL } from "@/lib/format";
import { getAllGifts } from "@/lib/queries";

export default async function AdminGiftsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erro?: string }>;
}) {
  const gifts = await getAllGifts();
  const { ok, erro } = await searchParams;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="font-heading text-4xl">Presentes</h1>
        <p className="mt-2 opacity-70">Cadastre itens, valores e fotos da lista.</p>
      </div>
      <SavedNotice ok={ok} />
      {erro ? <p className="text-sm text-red-700">Informe o nome do presente.</p> : null}

      <form action={createGift} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl">Novo presente</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="admin-label">Nome</span>
            <input className="admin-field" name="name" required />
          </label>
          <label>
            <span className="admin-label">Valor (R$)</span>
            <input className="admin-field" name="price" placeholder="180,00" required />
          </label>
          <label className="md:col-span-2">
            <span className="admin-label">Descrição</span>
            <input className="admin-field" name="description" />
          </label>
          <label>
            <span className="admin-label">Quantidade</span>
            <input className="admin-field" type="number" min={1} name="quantity" defaultValue={1} />
          </label>
          <label>
            <span className="admin-label">Ordem</span>
            <input className="admin-field" type="number" name="sortOrder" defaultValue={gifts.length + 1} />
          </label>
          <label>
            <span className="admin-label">Foto</span>
            <input className="admin-field" type="file" name="image" accept="image/*" />
          </label>
          <label className="flex items-end gap-2 pb-2 text-sm">
            <input type="checkbox" name="active" defaultChecked />
            Ativo na lista
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Cadastrar
        </button>
      </form>

      <div className="space-y-6">
        {gifts.map((gift) => (
          <form key={gift.id} action={updateGift} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={gift.id} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-heading text-2xl">{gift.name}</h2>
              <p className="text-sm text-[#8b6914]">{formatBRL(gift.priceCents)}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="admin-label">Nome</span>
                <input className="admin-field" name="name" defaultValue={gift.name} />
              </label>
              <label>
                <span className="admin-label">Valor (R$)</span>
                <input className="admin-field" name="price" defaultValue={(gift.priceCents / 100).toFixed(2).replace(".", ",")} />
              </label>
              <label className="md:col-span-2">
                <span className="admin-label">Descrição</span>
                <input className="admin-field" name="description" defaultValue={gift.description} />
              </label>
              <label>
                <span className="admin-label">Quantidade</span>
                <input className="admin-field" type="number" min={1} name="quantity" defaultValue={gift.quantity} />
              </label>
              <label>
                <span className="admin-label">Ordem</span>
                <input className="admin-field" type="number" name="sortOrder" defaultValue={gift.sortOrder} />
              </label>
              <label>
                <span className="admin-label">Nova foto</span>
                <input className="admin-field" type="file" name="image" accept="image/*" />
              </label>
              <label className="flex items-end gap-2 pb-2 text-sm">
                <input type="checkbox" name="active" defaultChecked={gift.active === 1} />
                Ativo na lista
              </label>
            </div>
            {gift.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gift.image} alt={gift.name} className="h-20 rounded-lg object-cover" />
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary" type="submit">
                Atualizar
              </button>
              <button formAction={deleteGift} className="btn btn-ghost" type="submit">
                Excluir
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
