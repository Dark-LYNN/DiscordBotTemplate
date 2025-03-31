import { logger } from '../utils';
import { ExtendedClient } from '../types/extendedClient';
import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    logger.info(`✅ | Logged in as ${client.user?.tag}`);

    /**
     * @description Set Status once the bot is ready
     */
    client.user?.setPresence({
      activities: [{ name: 'Development', type: 3 }],
      status: 'idle',
    });

    logger.info(`🌎 | Connected to ${client.guilds.cache.size} guild(s).`);
  },
};

// This event runs once the bot starts, and sets the status.