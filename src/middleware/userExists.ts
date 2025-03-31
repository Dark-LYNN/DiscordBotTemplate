import { Client } from 'discord.js';
import { userIdRegex } from '@/utils/regex';

export const userExists = async (
  client: Client,
  userID: string,
): Promise<boolean> => {
  if (!userIdRegex.test(userID)) return false;

  try {
    await client.users.fetch(userID, { force: true });
    return true;
  } catch (error) {
    return false;
  }
};
