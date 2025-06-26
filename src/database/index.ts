import { Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { Database as DBTypes } from './db.types'

const dbPath = 'database/database.db'

const db = new Kysely<DBTypes>({
  dialect: new SqliteDialect({
    database: new Database(dbPath),
  }),
});

export default db;