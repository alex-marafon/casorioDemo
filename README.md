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

## Render.com

Crie um **Web Service** com runtime **Docker** (o Render usa só o [`Dockerfile`](Dockerfile), não o `docker-compose.yml`).

No painel, em **Environment**, defina:

| Variável | Valor |
| --- | --- |
| `HOSTNAME` | `0.0.0.0` |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | chave forte de produção |
| `SQLITE_KEY` | pelo menos 16 caracteres |
| `SQLITE_PATH` | `data/casorio.db` |

O `.env` local não entra na imagem (`.dockerignore`); sem essas variáveis no Render o app pode falhar ao abrir o SQLite.

**Disco persistente:** o filesystem do container é efêmero. Para manter banco e uploads entre deploys, adicione um Persistent Disk (plano pago) montado em `/app/data` e, se quiser preservar fotos, também em `/app/public/uploads`.
