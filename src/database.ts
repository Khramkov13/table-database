import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'data.db');

let db: Database.Database;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeSchema();
    migrateNameColumn();
  }
  return db;
}

function initializeSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL DEFAULT '',
      lastName TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      role TEXT DEFAULT '',
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

function migrateNameColumn(): void {
  const columns = db.pragma('table_info(items)') as { name: string }[];
  const hasName = columns.some((c) => c.name === 'name');
  const hasFirstName = columns.some((c) => c.name === 'firstName');

  if (hasName && !hasFirstName) {
    db.exec(`ALTER TABLE items ADD COLUMN firstName TEXT NOT NULL DEFAULT ''`);
    db.exec(`ALTER TABLE items ADD COLUMN lastName TEXT NOT NULL DEFAULT ''`);
    db.exec(`
      UPDATE items SET
        firstName = CASE
          WHEN INSTR(name, ' ') > 0 THEN SUBSTR(name, 1, INSTR(name, ' ') - 1)
          ELSE name
        END,
        lastName = CASE
          WHEN INSTR(name, ' ') > 0 THEN SUBSTR(name, INSTR(name, ' ') + 1)
          ELSE ''
        END
    `);
  }
}
