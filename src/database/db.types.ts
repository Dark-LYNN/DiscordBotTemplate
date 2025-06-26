import { Generated } from 'kysely';

export interface Database {
  User: UserTable
  test: TestTable
};

export interface UserTable {
  user_id: string
  createdAt: Generated<Date> // Default to now()
};

export interface TestTable {
  user_id: string
  createdAt: Generated<Date> // Default to now()
};