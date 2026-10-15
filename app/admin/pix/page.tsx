import { updatePix } from "@/app/actions/site";
import { SavedNotice } from "@/components/admin/AdminShell";
import { getSettings } from "@/lib/queries";

export default async function AdminPixPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erro?: string }>;
}) {
  const settings = await getSettings();
  const { ok, erro } = await searchParams;
  const erroMsg =
    erro === "dados"
      ? "Preencha nome do recebedor e cidade."
      : erro
        ? decodeURIComponent(erro)
        : null;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-4xl">Chave PIX</h1>
      <p className="mt-2 mb-6 opacity-70">O valor dos presentes cai direto nesta conta.</p>
      <SavedNotice ok={ok} />
      {erroMsg ? (
        <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{erroMsg}</p>
      ) : null}
      <form action={updatePix} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block">
          <span className="admin-label">Tipo da chave</span>
          <select className="admin-field" name="pixKeyType" defaultValue={settings.pixKeyType}>
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="phone">Telefone</option>
            <option value="random">Chave aleatória</option>
          </select>
        </label>
        <label className="block">
          <span className="admin-label">Chave</span>
          <input className="admin-field" name="pixKey" defaultValue={settings.pixKey} placeholder="chave pix do noivo" required />
          <p className="mt-2 text-xs leading-5 opacity-60">
            CPF: só números (11 dígitos). E-mail: minúsculo. Telefone: DDD + número (o sistema adiciona +55).
            Aleatória: UUID completo com hífens.
          </p>
        </label>
        <label className="block">
          <span className="admin-label">Nome do recebedor</span>
          <input className="admin-field" name="pixName" defaultValue={settings.pixName} required />
        </label>
        <label className="block">
          <span className="admin-label">Cidade</span>
          <input className="admin-field" name="pixCity" defaultValue={settings.pixCity} required />
        </label>
        <button className="btn btn-primary" type="submit">
          Salvar PIX
        </button>
      </form>
    </div>
  );
}
