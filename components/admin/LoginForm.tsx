"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={nextPath} />
      <label className="block">
        <span className="admin-label">Usuário</span>
        <input className="admin-field" name="username" autoComplete="username" required />
      </label>
      <label className="block">
        <span className="admin-label">Senha</span>
        <input className="admin-field" name="password" type="password" autoComplete="current-password" required />
      </label>
      {state?.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      <button className="btn btn-primary w-full" disabled={pending} type="submit">
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
