import { ButtonInteraction } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';

export default {
  customId: (id: string): boolean => id.startsWith('decline-'),
  async execute(
    client: ExtendedClient,
    interaction: ButtonInteraction,
  ):Promise<void> {
    await interaction.reply({
      content: 'You clicked the button with an id that starts with dynamic!',
      flags: 'Ephemeral',
    });
  },
};
