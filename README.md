# Table Database (Backend)

REST API backend for the **table-template** Angular application.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **Database**: SQLite (via better-sqlite3)

## Getting Started

```bash
npm install
npm run seed   # Populate database with sample data
npm run dev    # Start development server on port 3000
```

## API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | /api/items       | List items (paginated) |
| GET    | /api/items/:id   | Get single item        |
| POST   | /api/items       | Create new item        |
| PUT    | /api/items/:id   | Update item            |
| DELETE | /api/items/:id   | Delete item            |
| GET    | /api/health      | Health check           |

### Query Parameters (GET /api/items)

- `page` — Page number (default: 1)
- `pageSize` — Items per page (default: 10, max: 100)
- `sortColumn` — Column to sort by (id, name, email, role, status)
- `sortDirection` — Sort direction (asc, desc)
- `search` — Search across name, email, role

## Related Repositories

- **Frontend**: [table-template](https://github.com/Khramkov13/table-template) — Angular table UI
