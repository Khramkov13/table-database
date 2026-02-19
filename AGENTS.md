# Backend — table-database

Node.js + Express + SQLite (better-sqlite3) REST API.
This is the **backend** half of a multi-repo full-stack app. The frontend lives in a sibling repository: [table-template](https://github.com/Khramkov13/table-template).

## Structure

- `src/index.ts` — Express server entry point (port 3000)
- `src/database.ts` — SQLite connection and schema initialization
- `src/routes/items.ts` — CRUD routes for /api/items
- `src/seed.ts` — Script to populate sample data

## Conventions

- Validate sort columns against an allowlist to prevent SQL injection
- Return paginated responses: `{ data, total, page, pageSize }`
- Use synchronous better-sqlite3 API (no async/await needed for DB calls)
- CORS configured to allow `http://localhost:4200` (Angular dev server)

## Related Repository

The Angular frontend that consumes this API is at https://github.com/Khramkov13/table-template.
It runs on `http://localhost:4200` and expects this server on port 3000.
