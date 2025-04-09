/* eslint-disable max-len */
import { REST, Routes, SlashCommandBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';
import { logger } from '@/utils';

type CommandJson = RESTPostAPIChatInputApplicationCommandsJSONBody;
type GuildCommandMap = Map<string, CommandJson[]>;

export const registerCommands = async (
  client: ExtendedClient,
):Promise<void> => {
  const token = client.env('DISCORD_BOT_TOKEN');
  const clientId = client.env('DISCORD_CLIENT_ID');

  if (!token || !clientId) {
    logger.error('❌ | Missing TOKEN or CLIENT_ID in .env file!');
    return;
  }

  const globalCommands: CommandJson[] = [];
  const guildCommandsMap = new Map<string, RESTPostAPIChatInputApplicationCommandsJSONBody[]>();

  await registeredCommands(client, globalCommands, guildCommandsMap);

  try {
    register(client, globalCommands, guildCommandsMap);
    logger.info('✅ | Slash command registration complete.');
  } catch (error) {
    logger.error('❌ | Failed to register commands: ' + error);
  }
};

const registeredCommands = async (
  client: ExtendedClient,
  globalCommands: CommandJson[],
  guildCommandsMap: GuildCommandMap,
) => {
  for (const [, command] of client.commands) {
    if (!(command.data instanceof SlashCommandBuilder)) continue;
    const json = command.data.toJSON();

    if (Array.isArray(command.guilds) && command.guilds.length > 0) {
      handleGuildCommands(command.guilds, json, guildCommandsMap);
    } else {
      handleGlobalCommand(json, globalCommands);
    }
  }
};

const handleGuildCommands = (
  guilds: string[],
  json: CommandJson,
  guildCommandsMap: GuildCommandMap
) => {
  for (const guildId of guilds) {
    if (!guildCommandsMap.has(guildId)) guildCommandsMap.set(guildId, []);
    guildCommandsMap.get(guildId)!.push(json);
  }
};

const handleGlobalCommand = (
  json: CommandJson,
  globalCommands: CommandJson[]
) => {
  globalCommands.push(json);
};

const register = async (
  client: ExtendedClient,
  globalCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[],
  guildCommandsMap: Map<string, RESTPostAPIChatInputApplicationCommandsJSONBody[]>,
) => {
  const token = client.env('DISCORD_BOT_TOKEN');
  const rest = new REST({ version: '10' }).setToken(token);
  const clientId = client.env('DISCORD_CLIENT_ID');

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
};