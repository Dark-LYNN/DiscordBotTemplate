/* eslint-disable max-len */
import { REST, Routes, SlashCommandBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';
import { logger } from '@/utils';

export const registerCommands = async (
  client: ExtendedClient,
):Promise<void> => {
  const token = client.env('DISCORD_BOT_TOKEN');
  const clientId = client.env('DISCORD_CLIENT_ID');

  if (!token || !clientId) {
    logger.error('❌ | Missing TOKEN or CLIENT_ID in .env file!');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  const globalCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  const guildCommandsMap = new Map<string, RESTPostAPIChatInputApplicationCommandsJSONBody[]>();

  /**
   * Iterates through the bot's registered commands and organizes slash commands
   * into guild-specific and global categories for API registration.
   */
  for (const [, command] of client.commands) {
    if (!(command.data instanceof SlashCommandBuilder)) continue;
    const json = command.data.toJSON();

    if (Array.isArray(command.guilds) && command.guilds.length > 0) {
      for (const guildId of command.guilds) {
        if (!guildCommandsMap.has(guildId)) guildCommandsMap.set(guildId, []);
        guildCommandsMap.get(guildId)!.push(json);
      }
    } else {
      globalCommands.push(json);
    }
  }

  try {
    /**
     * @description Register global commands
     */
    if (globalCommands.length > 0) {
      logger.info(`🌍 | Registering ${globalCommands.length} global commands...`);
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: globalCommands },
      );
    }

    /**
     * @description Register guild only commands.
     */
    for (const [guildId, commands] of guildCommandsMap.entries()) {
      try {
        logger.info(`🏠 | Registering ${commands.length} commands to guild: ${guildId}`);
        await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands },
        );
      } catch (err) {
        logger.warn(`⚠️ | Failed to register commands to guild ${guildId}: ${err}`);
        continue;
      }
    }

    logger.info('✅ | Slash command registration complete.');
  } catch (error) {
    logger.error('❌ | Failed to register commands: ' + error);
  }
};
