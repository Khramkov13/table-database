import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';

const router = Router();

interface QueryParams {
  page?: string;
  pageSize?: string;
  sortColumn?: string;
  sortDirection?: string;
  search?: string;
}

const ALLOWED_SORT_COLUMNS = ['id', 'firstName', 'lastName', 'email', 'role', 'status', 'created_at'];
const ALLOWED_SORT_DIRECTIONS = ['asc', 'desc'];

router.get('/', (req: Request<unknown, unknown, unknown, QueryParams>, res: Response) => {
  const db = getDatabase();
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize || '10', 10)));
  const offset = (page - 1) * pageSize;

  let whereClause = '';
  const params: unknown[] = [];

  if (req.query.search) {
    whereClause = 'WHERE firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR role LIKE ?';
    const searchTerm = `%${req.query.search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  let orderClause = 'ORDER BY id DESC';
  if (
    req.query.sortColumn &&
    req.query.sortDirection &&
    ALLOWED_SORT_COLUMNS.includes(req.query.sortColumn) &&
    ALLOWED_SORT_DIRECTIONS.includes(req.query.sortDirection)
  ) {
    orderClause = `ORDER BY ${req.query.sortColumn} ${req.query.sortDirection.toUpperCase()}`;
  }

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM items ${whereClause}`)
    .get(...params) as { total: number };

  const rows = db
    .prepare(`SELECT * FROM items ${whereClause} ${orderClause} LIMIT ? OFFSET ?`)
    .all(...params, pageSize, offset);

  res.json({
    data: rows,
    total: countRow.total,
    page,
    pageSize,
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const db = getDatabase();
  const row = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);

  if (!row) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  res.json(row);
});

router.post('/', (req: Request, res: Response) => {
  const db = getDatabase();
  const { firstName, lastName, email, role, status } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: 'First name, last name, and email are required' });
    return;
  }

  const result = db
    .prepare('INSERT INTO items (firstName, lastName, email, role, status) VALUES (?, ?, ?, ?, ?)')
    .run(firstName, lastName, email, role || '', status || 'active');

  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(item);
});

router.put('/:id', (req: Request, res: Response) => {
  const db = getDatabase();
  const { firstName, lastName, email, role, status } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: 'First name, last name, and email are required' });
    return;
  }

  const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  db.prepare(
    `UPDATE items SET firstName = ?, lastName = ?, email = ?, role = ?, status = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(firstName, lastName, email, role || '', status || 'active', req.params.id);

  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  res.json(item);
});

router.delete('/:id', (req: Request, res: Response) => {
  const db = getDatabase();

  const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  db.prepare('DELETE FROM items WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

export default router;
