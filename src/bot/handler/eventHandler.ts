import { logger } from '../../utils';
import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(module.filename);

export const loadEvents = async (client: Client) => {
  const eventsPath = path.join(__dirname, '../../events');
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const eventPath = path.join(eventsPath, file);
    const event = (await import(eventPath)).default;
    if (event && event.name && event.execute) {
      if (event.once) {
        client.once(event.name, event.execute.bind(null, client));
      } else {
        client.on(event.name, event.execute.bind(null, client));
      }
      logger.info(`✅ | Loaded event: ${event.name}`);
    } else {
      logger.warn(`⚠️ | Skipping invalid event file: ${file}`);
    }
  }
};
