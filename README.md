# Hackathon Template

Hackathon template with Express, FastAPI, and Next.js 💫

## Prerequisites

- [Bun](https://bun.sh) — JavaScript runtime and package manager
- [uv](https://docs.astral.sh/uv/) — Python package manager

## Getting Started

Install project dependencies.

```bash
bun install
uv sync
```

Copy the example environment variables.

Make sure to add `OPENAPI_API_KEY` to `express/.env`.

```bash
cp frontend/.env.example frontend/.env
cp express/.env.example express/.env
cp fastapi/.env.example fastapi/.env
```

Start the development servers.

```bash
bun run dev
```

## Scripts

```bash
bun run dev
bun run dev:frontend
bun run dev:express
bun run dev:fastapi
bun run build
bun run start
bun run lint
bun run format
```
