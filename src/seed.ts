import { getDatabase } from './database';

const SAMPLE_DATA = [
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'David', lastName: 'Brown', email: 'david@example.com', role: 'Editor', status: 'inactive' },
  { firstName: 'Eva', lastName: 'Davis', email: 'eva@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'Grace', lastName: 'Wilson', email: 'grace@example.com', role: 'Editor', status: 'inactive' },
  { firstName: 'Henry', lastName: 'Moore', email: 'henry@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'Irene', lastName: 'Taylor', email: 'irene@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Jack', lastName: 'Anderson', email: 'jack@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Karen', lastName: 'Thomas', email: 'karen@example.com', role: 'Viewer', status: 'inactive' },
  { firstName: 'Leo', lastName: 'Jackson', email: 'leo@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Mia', lastName: 'White', email: 'mia@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Nathan', lastName: 'Harris', email: 'nathan@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'Olivia', lastName: 'Martin', email: 'olivia@example.com', role: 'Editor', status: 'inactive' },
  { firstName: 'Paul', lastName: 'Garcia', email: 'paul@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'Quinn', lastName: 'Martinez', email: 'quinn@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Rachel', lastName: 'Robinson', email: 'rachel@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Sam', lastName: 'Clark', email: 'sam@example.com', role: 'Viewer', status: 'inactive' },
  { firstName: 'Tina', lastName: 'Rodriguez', email: 'tina@example.com', role: 'Admin', status: 'active' },
  { firstName: 'Ulysses', lastName: 'Lewis', email: 'ulysses@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Vera', lastName: 'Lee', email: 'vera@example.com', role: 'Viewer', status: 'active' },
  { firstName: 'Walter', lastName: 'Walker', email: 'walter@example.com', role: 'Admin', status: 'inactive' },
  { firstName: 'Xena', lastName: 'Hall', email: 'xena@example.com', role: 'Editor', status: 'active' },
  { firstName: 'Yuri', lastName: 'Allen', email: 'yuri@example.com', role: 'Viewer', status: 'active' },
];

function seed(): void {
  const db = getDatabase();

  const count = db.prepare('SELECT COUNT(*) as cnt FROM items').get() as { cnt: number };
  if (count.cnt > 0) {
    console.log(`Database already has ${count.cnt} items, skipping seed.`);
    return;
  }

  const insert = db.prepare('INSERT INTO items (firstName, lastName, email, role, status) VALUES (?, ?, ?, ?, ?)');
  const insertMany = db.transaction((items: typeof SAMPLE_DATA) => {
    for (const item of items) {
      insert.run(item.firstName, item.lastName, item.email, item.role, item.status);
    }
  });

  insertMany(SAMPLE_DATA);
  console.log(`Seeded ${SAMPLE_DATA.length} items into the database.`);
}

seed();
