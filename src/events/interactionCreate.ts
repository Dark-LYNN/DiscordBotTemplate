import { Interaction } from 'discord.js';
import { ExtendedClient } from '../types/extendedClient';
import { buttonHandler, handleInteraction } from '../bot/handler';

export default {
  name: 'interactionCreate',
  async execute(client: ExtendedClient, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      await handleInteraction(client, interaction);
    } else if (interaction.isButton()) {
      await buttonHandler(client, interaction);
    }
  },
};
