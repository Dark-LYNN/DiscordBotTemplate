import { ExtendedClient } from '@/types/extendedClient';
import { GatewayIntentBits, Partials } from 'discord.js';
import { logger } from '@/utils';
import { loadButtons, loadLoops, loadCommands, loadEvents } from './handler';

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.User,
    Partials.ThreadMember,
    Partials.Reaction,
    Partials.Message,
    Partials.GuildScheduledEvent
  ]
});

(async () => {
  await loadEvents(client);
  await loadCommands(client);
  await loadButtons(client);
  await loadLoops(client);
})();

client.login(client.env('DISCORD_TOKEN')).catch((error: any) => {
  logger.error('Failed to log in:', error);
});