import { ModalSubmitInteraction } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';

export default {
  customId: (id: string): boolean => id.startsWith('example-'),
  async execute(
    client: ExtendedClient,
    interaction: ModalSubmitInteraction,
  ): Promise<void> {
    interaction.reply({content: 'this modelId starts with example-.'});
  },
};