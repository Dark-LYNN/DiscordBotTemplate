import db from '@/database';
import { sql } from 'kysely';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

describe('Database Operations (Kysely)', () => {
  const testUserId = 'some-unique-id';

  beforeAll(async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS test (
        user_id TEXT PRIMARY KEY,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `.execute(db);

    await db.deleteFrom('test').where('user_id', '=', testUserId).execute();
  });

  it('should create a user in the database', async () => {
    await db.insertInto('test').values({ user_id: testUserId }).execute();

    const result = await db
      .selectFrom('test')
      .selectAll()
      .where('user_id', '=', testUserId)
      .executeTakeFirstOrThrow();

    expect(result.user_id).toBe(testUserId);
    expect(new Date(result.createdAt)).toBeInstanceOf(Date);
  });

  afterAll(async () => {
    await db.deleteFrom('test').where('user_id', '=', testUserId).execute();
  });
});