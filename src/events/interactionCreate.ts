import { Interaction } from 'discord.js';
import { ExtendedClient } from '../types/extendedClient';
import { buttonHandler, handleInteraction } from '../bot/handler';
import { modalHandler } from '@/bot/handler/modalHandler';

export default {
  name: 'interactionCreate',
  async execute(
    client: ExtendedClient,
    interaction: Interaction,
  ):Promise<void> {
    if (interaction.isChatInputCommand()) {
      await handleInteraction(client, interaction);
    } else if (interaction.isButton()) {
      await buttonHandler(client, interaction);
    } else if (interaction.isModalSubmit()) {
      await modalHandler(client, interaction);
    }
  },
};
