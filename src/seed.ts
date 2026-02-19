import { getDatabase } from './database';

const SAMPLE_DATA = [
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@company.com', phone: '+1-555-0101', department: 'Engineering', role: 'Admin', status: 'active' },
  { firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@company.com', phone: '+1-555-0102', department: 'Engineering', role: 'Editor', status: 'active' },
  { firstName: 'Carol', lastName: 'Williams', email: 'carol.williams@company.com', phone: '+1-555-0103', department: 'Marketing', role: 'Viewer', status: 'active' },
  { firstName: 'David', lastName: 'Brown', email: 'david.brown@company.com', phone: '+1-555-0104', department: 'Marketing', role: 'Editor', status: 'inactive' },
  { firstName: 'Eva', lastName: 'Davis', email: 'eva.davis@company.com', phone: '+1-555-0105', department: 'Sales', role: 'Admin', status: 'active' },
  { firstName: 'Frank', lastName: 'Miller', email: 'frank.miller@company.com', phone: '+1-555-0106', department: 'Sales', role: 'Viewer', status: 'active' },
  { firstName: 'Grace', lastName: 'Wilson', email: 'grace.wilson@company.com', phone: '+1-555-0107', department: 'HR', role: 'Editor', status: 'inactive' },
  { firstName: 'Henry', lastName: 'Moore', email: 'henry.moore@company.com', phone: '+1-555-0108', department: 'HR', role: 'Viewer', status: 'active' },
  { firstName: 'Irene', lastName: 'Taylor', email: 'irene.taylor@company.com', phone: '+1-555-0109', department: 'Finance', role: 'Admin', status: 'active' },
  { firstName: 'Jack', lastName: 'Anderson', email: 'jack.anderson@company.com', phone: '+1-555-0110', department: 'Finance', role: 'Editor', status: 'active' },
  { firstName: 'Karen', lastName: 'Thomas', email: 'karen.thomas@company.com', phone: '+1-555-0111', department: 'Engineering', role: 'Viewer', status: 'inactive' },
  { firstName: 'Leo', lastName: 'Jackson', email: 'leo.jackson@company.com', phone: '+1-555-0112', department: 'Engineering', role: 'Editor', status: 'active' },
  { firstName: 'Mia', lastName: 'White', email: 'mia.white@company.com', phone: '+1-555-0113', department: 'Marketing', role: 'Admin', status: 'active' },
  { firstName: 'Nathan', lastName: 'Harris', email: 'nathan.harris@company.com', phone: '+1-555-0114', department: 'Marketing', role: 'Viewer', status: 'active' },
  { firstName: 'Olivia', lastName: 'Martin', email: 'olivia.martin@company.com', phone: '+1-555-0115', department: 'Sales', role: 'Editor', status: 'inactive' },
  { firstName: 'Paul', lastName: 'Garcia', email: 'paul.garcia@company.com', phone: '+1-555-0116', department: 'Sales', role: 'Viewer', status: 'active' },
  { firstName: 'Quinn', lastName: 'Martinez', email: 'quinn.martinez@company.com', phone: '+1-555-0117', department: 'HR', role: 'Admin', status: 'active' },
  { firstName: 'Rachel', lastName: 'Robinson', email: 'rachel.robinson@company.com', phone: '+1-555-0118', department: 'HR', role: 'Editor', status: 'active' },
  { firstName: 'Sam', lastName: 'Clark', email: 'sam.clark@company.com', phone: '+1-555-0119', department: 'Finance', role: 'Viewer', status: 'inactive' },
  { firstName: 'Tina', lastName: 'Rodriguez', email: 'tina.rodriguez@company.com', phone: '+1-555-0120', department: 'Finance', role: 'Admin', status: 'active' },
  { firstName: 'Ulysses', lastName: 'Lewis', email: 'ulysses.lewis@company.com', phone: '+1-555-0121', department: 'Engineering', role: 'Editor', status: 'active' },
  { firstName: 'Vera', lastName: 'Lee', email: 'vera.lee@company.com', phone: '+1-555-0122', department: 'Marketing', role: 'Viewer', status: 'active' },
  { firstName: 'Walter', lastName: 'Walker', email: 'walter.walker@company.com', phone: '+1-555-0123', department: 'Sales', role: 'Admin', status: 'inactive' },
  { firstName: 'Xena', lastName: 'Hall', email: 'xena.hall@company.com', phone: '+1-555-0124', department: 'HR', role: 'Editor', status: 'active' },
  { firstName: 'Yuri', lastName: 'Allen', email: 'yuri.allen@company.com', phone: '+1-555-0125', department: 'Finance', role: 'Viewer', status: 'active' },
];

function seed(): void {
  const db = getDatabase();

  const count = db.prepare('SELECT COUNT(*) as cnt FROM items').get() as { cnt: number };
  if (count.cnt > 0) {
    console.log(`Database already has ${count.cnt} items, skipping seed.`);
    return;
  }

  const insert = db.prepare('INSERT INTO items (firstName, lastName, email, phone, department, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insertMany = db.transaction((items: typeof SAMPLE_DATA) => {
    for (const item of items) {
      insert.run(item.firstName, item.lastName, item.email, item.phone, item.department, item.role, item.status);
    }
  });

  insertMany(SAMPLE_DATA);
  console.log(`Seeded ${SAMPLE_DATA.length} items into the database.`);
}

seed();
