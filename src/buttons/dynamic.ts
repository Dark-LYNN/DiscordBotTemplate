import { ButtonInteraction } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';

export default {
  customId: (id: string) => id.startsWith('dynamic-'),
  async execute(client: ExtendedClient, interaction: ButtonInteraction) {
    await interaction.reply({
      content: 'You clicked the button with an id that starts with dynamic!',
      flags: 'Ephemeral',
    });
  },
};
