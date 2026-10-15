# Casorio

Site de casamento com painel admin (Next.js + SQLite).

## Como rodar

```bash
nvm use 24.11.0
npm install
```

Copie `.env.example` para `.env` e defina `SESSION_SECRET` e `SQLITE_KEY` (mínimo 16 caracteres). O SQLite é criado criptografado na primeira execução.

```bash
npm run dev
```

- Site: http://localhost:3000
- Painel: http://localhost:3000/admin/login
- Usuário: `admin`
- Senha: `admin@admin`

## Docker

Configure `.env` (copie de `.env.example`) com `SESSION_SECRET` e `SQLITE_KEY` (mínimo 16 caracteres).

```bash
docker compose up --build -d
```

Parar:

```bash
docker compose down
```

O banco SQLite e as imagens enviadas ficam nos volumes `casorio-data` e `casorio-uploads`.
