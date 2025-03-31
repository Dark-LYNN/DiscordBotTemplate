import { Client, TextChannel, Permissions, PermissionResolvable } from 'discord.js';

/**
 * Checks if the user or bot has the specified permissions in a specific channel.
 * @param {Client} client - The discord.js client.
 * @param {string} userID - The ID of the user/bot whose permissions to check.
 * @param {TextChannel} channel - The channel where the permissions need to be checked.
 * @param {PermissionResolvable[]} permissions - List of permissions to check (e.g., ['MANAGE_THREADS', 'SEND_MESSAGES_IN_THREADS']).
 * @returns {Promise<boolean>} - Returns `true` if the user/bot has all the permissions, `false` otherwise.
 */
export async function hasPerms(
  client: Client,
  userID: string,
  channel: TextChannel,
  permissions: PermissionResolvable[]
): Promise<boolean> {
  try {
    const member = await channel.guild.members.fetch(userID);
    const memberPermissions = channel.permissionsFor(member);

    if (!memberPermissions) return false;

    return permissions.every(permission => memberPermissions.has(permission));
  } catch (error) {
    console.error(`❌ Error checking permissions for ${userID}:`, error);
    return false;
  }
}