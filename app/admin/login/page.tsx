import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSession } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4efe8] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs tracking-[0.2em] uppercase text-[#8b6914]">Casorio</p>
        <h1 className="mt-2 font-heading text-3xl">Acesso ao painel</h1>
        <p className="mt-2 text-sm opacity-70">Entre para configurar o site dos noivos.</p>
        <div className="mt-8">
          <LoginForm nextPath={next && next.startsWith("/admin") ? next : "/admin"} />
        </div>
      </div>
    </div>
  );
}
