import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from '../../types/extendedClient';
import { logger } from '../../utils';

export const registerCommands = async (client: ExtendedClient) => {
  if (!client.env('DISCORD_TOKEN') || !client.env('DISCORD_CLIENT_ID')) {
    logger.error('❌ | Missing TOKEN or CLIENT_ID in .env file!');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(
    `${client.env('DISCORD_TOKEN')}`,
  );

  try {
    logger.info('🔃 | Registering slash commands...');

    const commands = client.commands
      .map((cmd) =>
        cmd.data instanceof SlashCommandBuilder ? cmd.data.toJSON() : null,
      )
      .filter(Boolean); // Remove any null values

    await rest.put(
      Routes.applicationCommands(`${client.env('DISCORD_TOKEN')}`),
      { body: commands },
    );

    logger.info(`✅ | Successfully registered ${commands.length} commands!`);
  } catch (error) {
    logger.error(`❌ | Failed to register commands:`, error);
  }
};
