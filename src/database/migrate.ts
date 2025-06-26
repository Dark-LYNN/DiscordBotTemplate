import Database from 'better-sqlite3';

const db = new Database('database/database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS test (
    user_id TEXT PRIMARY KEY,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Migration complete.');
