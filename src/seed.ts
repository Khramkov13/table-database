import { getDatabase } from './database';

const SAMPLE_DATA = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
  { name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'active' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'inactive' },
  { name: 'Eva Davis', email: 'eva@example.com', role: 'Admin', status: 'active' },
  { name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'active' },
  { name: 'Grace Wilson', email: 'grace@example.com', role: 'Editor', status: 'inactive' },
  { name: 'Henry Moore', email: 'henry@example.com', role: 'Viewer', status: 'active' },
  { name: 'Irene Taylor', email: 'irene@example.com', role: 'Admin', status: 'active' },
  { name: 'Jack Anderson', email: 'jack@example.com', role: 'Editor', status: 'active' },
  { name: 'Karen Thomas', email: 'karen@example.com', role: 'Viewer', status: 'inactive' },
  { name: 'Leo Jackson', email: 'leo@example.com', role: 'Editor', status: 'active' },
  { name: 'Mia White', email: 'mia@example.com', role: 'Admin', status: 'active' },
  { name: 'Nathan Harris', email: 'nathan@example.com', role: 'Viewer', status: 'active' },
  { name: 'Olivia Martin', email: 'olivia@example.com', role: 'Editor', status: 'inactive' },
  { name: 'Paul Garcia', email: 'paul@example.com', role: 'Viewer', status: 'active' },
  { name: 'Quinn Martinez', email: 'quinn@example.com', role: 'Admin', status: 'active' },
  { name: 'Rachel Robinson', email: 'rachel@example.com', role: 'Editor', status: 'active' },
  { name: 'Sam Clark', email: 'sam@example.com', role: 'Viewer', status: 'inactive' },
  { name: 'Tina Rodriguez', email: 'tina@example.com', role: 'Admin', status: 'active' },
  { name: 'Ulysses Lewis', email: 'ulysses@example.com', role: 'Editor', status: 'active' },
  { name: 'Vera Lee', email: 'vera@example.com', role: 'Viewer', status: 'active' },
  { name: 'Walter Walker', email: 'walter@example.com', role: 'Admin', status: 'inactive' },
  { name: 'Xena Hall', email: 'xena@example.com', role: 'Editor', status: 'active' },
  { name: 'Yuri Allen', email: 'yuri@example.com', role: 'Viewer', status: 'active' },
];

function seed(): void {
  const db = getDatabase();

  const count = db.prepare('SELECT COUNT(*) as cnt FROM items').get() as { cnt: number };
  if (count.cnt > 0) {
    console.log(`Database already has ${count.cnt} items, skipping seed.`);
    return;
  }

  const insert = db.prepare('INSERT INTO items (name, email, role, status) VALUES (?, ?, ?, ?)');
  const insertMany = db.transaction((items: typeof SAMPLE_DATA) => {
    for (const item of items) {
      insert.run(item.name, item.email, item.role, item.status);
    }
  });

  insertMany(SAMPLE_DATA);
  console.log(`Seeded ${SAMPLE_DATA.length} items into the database.`);
}

seed();
