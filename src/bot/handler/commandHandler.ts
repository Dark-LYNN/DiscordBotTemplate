import { ExtendedClient } from '../../types/extendedClient';
import { logger } from '../../utils';
import fs from 'fs';
import path from 'path';
import { registerCommands } from './registerCommands';

const loadCommand = async (client: ExtendedClient, commandPath: string) => {
  const command = (await import(commandPath)).default;

  if (!command || !command.data || !command.execute) {
    logger.warn(`⚠️ | Skipping invalid command file: ${commandPath}`);
    return;
  }

  client.commands.set(command.data.name, command);
  logger.info(`✅ | Loaded command: ${command.data.name}`);

  loadSubcommands(client, command);
};

const loadSubcommands = (client: ExtendedClient, command: any) => {
  if (!command.data.options) return;

  for (const option of command.data.options) {
    if (option.toJSON().type === 1 || option.toJSON().type === 2) { // 1 = Subcommand, 2 = Subcommand Group
      client.subcommands.set(`${command.data.name}/${option.name}`, command);
      logger.info(`✅ |   └─ subcommand: "${command.data.name} ~ ${option.name}"`);
    }
  }
};

const loadCommandFiles = async (client: ExtendedClient, folderPath: string) => {
  const commandFiles = fs.readdirSync(folderPath).filter((file) =>
    file.endsWith('.js') && !file.startsWith('_')
  );

  for (const file of commandFiles) {
    const commandPath = path.join(folderPath, file);
    await loadCommand(client, commandPath);
  }
};

const loadCommandFolders = async (client: ExtendedClient, commandsPath: string) => {
  const commandFolders = fs.readdirSync(commandsPath);

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);

    if (fs.statSync(folderPath).isDirectory()) {
      await loadCommandFiles(client, folderPath);
    } else if (folder !== 'index.ts') {
      logger.warn(`⚠️ | Skipping invalid command file: ${folder}`);
    }
  }
};

export const loadCommands = async (client: ExtendedClient) => {
  const commandsPath = path.join(__dirname, '../../commands');
  await loadCommandFolders(client, commandsPath);

  // ✅ Register slash commands with Discord after loading
  await registerCommands(client);
};