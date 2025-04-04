import { ExtendedClient } from '../types/extendedClient';
import { GuildMember, Guild } from 'discord.js';

/**
 * Checks if a user has a specific role in a given guild.
 * @param client - The bot client instance.
 * @param userId - The ID of the user to check.
 * @param roleId - The ID of the role to check.
 * @param guildId - The ID of the guild where the check is performed.
 * @returns {Promise<boolean>} - Whether the user has the role.
 */
export const hasRole = async (
  client: ExtendedClient,
  userId: string,
  roleId: string,
  guildId: string,
): Promise<boolean> => {
  try {
    const guild: Guild | undefined = client.guilds.cache.get(guildId);
    if (!guild) return false;

    const member: GuildMember | undefined = await guild.members.fetch(userId)
      .catch(() => undefined);
    if (!member) return false;

    return member.roles.cache.has(roleId);
  } catch (error) {
    console.error(
      `❌ Error checking role for user ${userId} in guild ${guildId}:`,
      error,
    );
    return false;
  }
};
